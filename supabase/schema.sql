create extension if not exists "pgcrypto";

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null unique,
  full_name text,
  role text not null default 'client' check (role in ('admin', 'client')),
  created_at timestamptz not null default now()
);

create table if not exists public.cars (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  brand text not null,
  model text not null,
  price numeric(12, 2) not null,
  type text not null check (type in ('vente', 'location')),
  image_url text,
  description text,
  available boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists public.bookings (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  car_id uuid not null references public.cars(id) on delete cascade,
  start_date date not null,
  end_date date not null,
  status text not null default 'pending' check (status in ('pending', 'confirmed', 'cancelled')),
  created_at timestamptz not null default now()
);

create table if not exists public.sales (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  car_id uuid not null references public.cars(id) on delete cascade,
  status text not null default 'pending' check (status in ('pending', 'approved', 'rejected')),
  created_at timestamptz not null default now()
);

insert into storage.buckets (id, name, public)
values ('cars', 'cars', true)
on conflict (id) do nothing;

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, email, full_name, role)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data ->> 'full_name', ''),
    'client'
  )
  on conflict (id) do nothing;

  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
after insert on auth.users
for each row execute procedure public.handle_new_user();

alter table public.profiles enable row level security;
alter table public.cars enable row level security;
alter table public.bookings enable row level security;
alter table public.sales enable row level security;

create policy "profiles select own profile or admins"
on public.profiles
for select
using (auth.uid() = id or exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin'));

create policy "profiles insert own profile"
on public.profiles
for insert
with check (auth.uid() = id);

create policy "profiles update own profile or admins"
on public.profiles
for update
using (auth.uid() = id or exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin'))
with check (auth.uid() = id or exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin'));

create policy "cars are public readable"
on public.cars
for select
using (true);

create policy "admins manage cars"
on public.cars
for all
using (exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin'))
with check (exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin'));

create policy "clients create their bookings"
on public.bookings
for insert
with check (auth.uid() = user_id);

create policy "clients read own bookings and admins read all"
on public.bookings
for select
using (auth.uid() = user_id or exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin'));

create policy "admins update bookings"
on public.bookings
for update
using (exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin'))
with check (exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin'));

create policy "clients create sales"
on public.sales
for insert
with check (auth.uid() = user_id);

create policy "clients read own sales and admins read all"
on public.sales
for select
using (auth.uid() = user_id or exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin'));

create policy "admins update sales"
on public.sales
for update
using (exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin'))
with check (exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin'));

create policy "cars images public read"
on storage.objects
for select
using (bucket_id = 'cars');

create policy "admins upload car images"
on storage.objects
for insert
with check (
  bucket_id = 'cars'
  and exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin')
);

create policy "admins update car images"
on storage.objects
for update
using (
  bucket_id = 'cars'
  and exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin')
)
with check (
  bucket_id = 'cars'
  and exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin')
);

create policy "admins delete car images"
on storage.objects
for delete
using (
  bucket_id = 'cars'
  and exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin')
);
