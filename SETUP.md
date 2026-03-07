# Makan Luxury Motors - Installation & Setup Guide

## Overview
This is a premium luxury car dealership website built with Next.js 16, React 19, Tailwind CSS, and Framer Motion. The site features a dark luxury aesthetic with gold accents, smooth animations, and fully responsive design.

## Project Structure
```
makan-luxury-motors/
├── app/
│   ├── layout.tsx              # Root layout with fonts and metadata
│   ├── page.tsx                # Main page component
│   └── globals.css             # Global styles and custom CSS
├── components/
│   ├── Navbar.tsx              # Sticky navigation with mobile menu
│   ├── Hero.tsx                # Hero section with featured car
│   ├── StockSection.tsx        # Car inventory with search & filters
│   ├── CarCard.tsx             # Individual car card component
│   ├── CarModal.tsx            # Modal for car details
│   ├── OrderSection.tsx        # 3-step ordering process
│   ├── ImportExportSection.tsx # Services section
│   ├── ContactSection.tsx      # Contact form & quick info
│   ├── Footer.tsx              # Footer with links & info
│   └── MobileQuickBar.tsx      # Mobile bottom quick access bar
├── data/
│   └── cars.ts                 # Car inventory data
├── hooks/
│   └── use-media-query.ts      # Custom hook for responsive design
├── lib/
│   └── business.ts             # Business constants & links
├── public/                     # Static assets
└── package.json                # Dependencies

## Installation

### 1. Install Dependencies
```bash
npm install
# or
pnpm install
# or
yarn install
```

### 2. Run Development Server
```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to see your site.

## Features

### ✨ Core Features
- **Premium Design**: Dark luxury theme with gold accents
- **Responsive Design**: Fully optimized for mobile, tablet, and desktop
- **Smooth Animations**: Framer Motion for elegant page transitions
- **Car Inventory**: Dynamic car listing with search and filtering
- **Contact System**: Functional contact form with toast notifications
- **Quick Actions**: WhatsApp, Email, and Phone integration
- **Mobile-Optimized**: Fixed bottom quick-action bar on mobile

### 🎯 Sections
1. **Navigation Bar**: Sticky header with smooth scroll effects
2. **Hero Section**: Eye-catching introduction with featured car
3. **Stock Section**: Searchable car inventory with modals
4. **Ordering Process**: 3-step visual guide for custom orders
5. **Import/Export**: Service showcase with icons
6. **Contact Form**: Email validation and social integration
7. **Footer**: Complete business information and links

## Key Technologies

- **Framework**: Next.js 16 (App Router)
- **UI**: React 19.2.4
- **Styling**: Tailwind CSS 4.2.0
- **Animations**: Framer Motion 10.16.16
- **Fonts**: Inter (body), Playfair Display (headings)
- **Notifications**: Sonner
- **Icons**: Lucide React

## Customization

### Update Business Information
Edit `/lib/business.ts`:
```typescript
export const business = {
  name: 'Makan Luxury Motors',
  phone: '+212 641-389898',
  email: 'Maka.benioukil@gmail.com',
  // ... other details
}
```

### Add/Edit Cars
Edit `/data/cars.ts`:
```typescript
{
  id: '7',
  model: 'Your Car Model',
  year: 2026,
  package: 'Package Name',
  status: 'disponible',
  images: ['image-url'],
  price: '$XX,XXX',
}
```

### Customize Colors
The theme uses gold (#fbbf24, #d97706) as primary. To change:
1. Edit class names: Replace `amber-400`, `amber-500`, etc. with your color
2. Edit CSS variables in `globals.css` if needed

### Modify Sections
Each section is in its own component for easy editing:
- Hero styling: `/components/Hero.tsx`
- Stock display: `/components/StockSection.tsx`
- Contact form: `/components/ContactSection.tsx`

## Deployment

### Deploy to Vercel (Recommended)
1. Push to GitHub: `git push origin main`
2. Connect repository on [vercel.com](https://vercel.com)
3. Deploy with one click

### Manual Deployment
```bash
npm run build
npm start
```

## Performance Features

- **Image Optimization**: Using Next.js Image component
- **Lazy Loading**: Sections load on scroll with Framer Motion
- **Smooth Scroll**: Native CSS smooth scrolling
- **Mobile-First**: Responsive design with mobile considerations

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Troubleshooting

### Fonts not loading
- Ensure `Inter` and `Playfair_Display` are imported in `layout.tsx`
- Check that Tailwind config includes `fontFamily` configuration

### Animations not working
- Verify Framer Motion is installed: `npm list framer-motion`
- Check that components use `'use client'` directive

### Images not displaying
- Ensure image URLs are publicly accessible
- Check image dimensions match `aspect-ratio` constraints
- Use absolute URLs for external images

## Contact Information

**Business Details:**
- Name: Makan Luxury Motors
- Location: Oujda, Morocco
- Phone/WhatsApp: +212 641-389898
- Email: Maka.benioukil@gmail.com
- Instagram: @makan_luxury_motors

## License

This template is created with v0.app for commercial use.

## Support

For issues or questions:
1. Check Vercel documentation: [vercel.com/docs](https://vercel.com/docs)
2. Review Next.js guide: [nextjs.org](https://nextjs.org)
3. Framer Motion docs: [framer.com/motion](https://www.framer.com/motion)

---

**Last Updated**: March 2026
**Version**: 1.0.0
