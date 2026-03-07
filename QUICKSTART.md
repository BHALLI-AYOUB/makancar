# Quick Start Guide - Makan Luxury Motors

## 🚀 Get Running in 2 Minutes

### Step 1: Install Dependencies
```bash
npm install
```

### Step 2: Run the Development Server
```bash
npm run dev
```

### Step 3: Open in Browser
Visit [http://localhost:3000](http://localhost:3000)

---

## 📝 Essential Customizations

### 1. Update Business Information
**File**: `/lib/business.ts`

```typescript
export const business = {
  name: 'YOUR_BUSINESS_NAME',
  phone: 'YOUR_PHONE',
  email: 'YOUR_EMAIL',
  location: 'YOUR_LOCATION',
  instagram: 'YOUR_INSTAGRAM_URL',
  facebook: 'YOUR_FACEBOOK_URL',
  whatsappLink: 'YOUR_WHATSAPP_LINK',
  emailLink: 'YOUR_EMAIL_LINK',
  googleMapsLink: 'YOUR_MAPS_LINK',
}
```

### 2. Add Your Cars
**File**: `/data/cars.ts`

```typescript
{
  id: '7',
  model: 'Ferrari F8 Tributo',
  year: 2026,
  package: 'Complete Package',
  status: 'disponible', // or 'sur-demande'
  images: ['https://image-url.com/car.jpg'],
  price: '$280,000',
}
```

### 3. Change Colors (Optional)
The site uses gold (Amber). To use different colors:

Search and replace:
- `amber-400` → your color-500
- `amber-600` → your color-700
- `amber-400/20` → your color-500/20

Example: Replace `amber` with `blue` for blue theme

### 4. Update Page Title & Description
**File**: `/app/layout.tsx`

```typescript
export const metadata: Metadata = {
  title: 'YOUR SITE TITLE',
  description: 'YOUR SITE DESCRIPTION',
  // ... rest of config
}
```

---

## 🎨 Component Overview

| Component | Purpose | File |
|-----------|---------|------|
| Navbar | Header navigation | `components/Navbar.tsx` |
| Hero | Main banner section | `components/Hero.tsx` |
| StockSection | Car listings | `components/StockSection.tsx` |
| CarCard | Individual car card | `components/CarCard.tsx` |
| CarModal | Car details popup | `components/CarModal.tsx` |
| OrderSection | 3-step process | `components/OrderSection.tsx` |
| ImportExportSection | Services | `components/ImportExportSection.tsx` |
| ContactSection | Contact form | `components/ContactSection.tsx` |
| Footer | Footer | `components/Footer.tsx` |
| MobileQuickBar | Mobile bottom bar | `components/MobileQuickBar.tsx` |

---

## 🔧 Common Customizations

### Change Hero Title
**File**: `components/Hero.tsx`
```typescript
<h1 className="text-5xl md:text-6xl lg:text-7xl font-serif font-bold text-white leading-tight">
  Your New Title Here
</h1>
```

### Add/Remove Navigation Items
**File**: `components/Navbar.tsx`
```typescript
const navItems = [
  { label: 'Your Item', href: '#section-id' },
  // ... more items
]
```

### Edit Step Process
**File**: `components/OrderSection.tsx`
```typescript
const steps = [
  {
    number: '01',
    title: 'Your Step Title',
    description: 'Your description',
    icon: YourIcon,
  },
]
```

### Customize Contact Form Fields
**File**: `components/ContactSection.tsx`
```typescript
// Add new fields to formData state
const [formData, setFormData] = useState({
  name: '',
  email: '',
  phone: '',
  message: '',
  // Add your field here
})
```

---

## 📱 Responsive Design

The site automatically adapts to:
- **Mobile**: Single column, bottom quick bar
- **Tablet**: 2-column layouts
- **Desktop**: Full multi-column layouts

No changes needed - it works automatically!

---

## 🌍 Deployment

### Deploy to Vercel (Easiest)
1. Push to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import your repository
4. Click "Deploy"

### Environment Variables
Currently, the site doesn't require environment variables. All data is in:
- `/lib/business.ts` - Contact info
- `/data/cars.ts` - Car inventory

---

## ⚡ Performance Tips

✅ Already optimized:
- Images use Next.js Image component
- Animations only on visible sections
- Code automatically split by component
- Google Fonts optimized

---

## 🐛 Troubleshooting

### Issue: Fonts look different
**Solution**: Clear browser cache and hard refresh (Ctrl+Shift+R)

### Issue: Images not showing
**Solution**: Check that image URLs are public and accessible

### Issue: Buttons not working
**Solution**: Check browser console for errors (F12)

### Issue: Mobile menu not opening
**Solution**: Ensure JavaScript is enabled in browser

---

## 📚 Learn More

- [Next.js Docs](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com)
- [Framer Motion](https://www.framer.com/motion)

---

## ✅ Pre-Deployment Checklist

Before deploying, ensure:
- [ ] Business information updated
- [ ] Car inventory added
- [ ] Contact links working
- [ ] Images loading properly
- [ ] Mobile responsive on test device
- [ ] All buttons clickable
- [ ] No console errors (F12)
- [ ] Page title changed from "v0 App"

---

## 🎉 You're Ready!

Your luxury car dealership website is ready to go. Customize the content and deploy!

**Questions?** Check `SETUP.md` for detailed guide or `DEVELOPER.md` for code structure.

---

**Version**: 1.0.0  
**Last Updated**: March 2026  
**Time to Setup**: ~5 minutes  
**Time to Deploy**: ~2 minutes
