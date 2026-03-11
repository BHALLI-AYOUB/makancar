export function isMissingProfilesTableError(error: { message?: string } | null | undefined) {
  const message = error?.message ?? ''

  return (
    message.includes("Could not find the table 'public.profiles'") ||
    message.includes('relation "public.profiles" does not exist')
  )
}

export function isProfilesRlsError(error: { message?: string } | null | undefined) {
  const message = (error?.message ?? '').toLowerCase()

  return (
    message.includes('row-level security policy for table "profiles"') ||
    message.includes("new row violates row-level security policy for table \"profiles\"") ||
    message.includes('violates row-level security policy for table "profiles"')
  )
}

export function isMissingBookingsTableError(error: { message?: string } | null | undefined) {
  const message = error?.message ?? ''

  return (
    message.includes("Could not find the table 'public.bookings'") ||
    message.includes('relation "public.bookings" does not exist')
  )
}

export function isMissingSalesTableError(error: { message?: string } | null | undefined) {
  const message = error?.message ?? ''

  return (
    message.includes("Could not find the table 'public.sales'") ||
    message.includes('relation "public.sales" does not exist')
  )
}
