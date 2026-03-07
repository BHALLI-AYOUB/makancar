# Architecture Overview - Makan Luxury Motors

## 📊 System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                      MAKAN LUXURY MOTORS                         │
│                   Production-Ready Website                       │
└─────────────────────────────────────────────────────────────────┘

┌─── CLIENT LAYER ──────────────────────────────────────────────────┐
│                                                                    │
│  ┌─ PAGES ─────────────────────────────────────────────────┐    │
│  │                                                           │    │
│  │  app/page.tsx (Main Page)                               │    │
│  │  ├─ Renders all components in sequence                  │    │
│  │  ├─ Handles Sonner notifications                        │    │
│  │  └─ Provides Toaster component                          │    │
│  │                                                           │    │
│  └─────────────────────────────────────────────────────────┘    │
│                             │                                     │
│                             ▼                                     │
│  ┌─ COMPONENTS (10 Total) ──────────────────────────────────┐   │
│  │                                                           │   │
│  │  1. NAVBAR                                               │   │
│  │     ├─ Sticky header with blur effect                   │   │
│  │     ├─ Mobile hamburger menu                            │   │
│  │     └─ Scroll-triggered height change                   │   │
│  │                                                           │   │
│  │  2. HERO                                                 │   │
│  │     ├─ Featured car display                             │   │
│  │     ├─ Quick contact links                              │   │
│  │     └─ CTA buttons (Contact, Stock, Order)              │   │
│  │                                                           │   │
│  │  3. STOCK SECTION                                        │   │
│  │     ├─ Search bar (by model)                            │   │
│  │     ├─ Filter buttons                                   │   │
│  │     ├─ Car grid (responsive)                            │   │
│  │     └─ Results counter                                  │   │
│  │                                                           │   │
│  │  4. CAR CARD (Rendered in StockSection)                │   │
│  │     ├─ Image with hover overlay                         │   │
│  │     ├─ Status badge                                     │   │
│  │     ├─ Price display                                    │   │
│  │     └─ Action buttons                                   │   │
│  │                                                           │   │
│  │  5. CAR MODAL (Triggered by CarCard)                    │   │
│  │     ├─ Detailed car information                         │   │
│  │     ├─ Specifications grid                              │   │
│  │     └─ Contact options (WhatsApp, Email, Phone)         │   │
│  │                                                           │   │
│  │  6. ORDER SECTION                                        │   │
│  │     ├─ 3-step process visualization                     │   │
│  │     ├─ Animated connector lines                         │   │
│  │     └─ Quote request CTA                                │   │
│  │                                                           │   │
│  │  7. IMPORT/EXPORT SECTION                               │   │
│  │     ├─ 6 service cards                                  │   │
│  │     └─ Quote & WhatsApp CTAs                            │   │
│  │                                                           │   │
│  │  8. CONTACT SECTION                                      │   │
│  │     ├─ Contact form (name, email, phone, message)       │   │
│  │     ├─ Quick contact cards                              │   │
│  │     └─ Social media links                               │   │
│  │                                                           │   │
│  │  9. FOOTER                                               │   │
│  │     ├─ 4-column layout                                  │   │
│  │     ├─ Navigation links                                 │   │
│  │     └─ Social icons                                     │   │
│  │                                                           │   │
│  │  10. MOBILE QUICK BAR                                    │   │
│  │      ├─ 4 action buttons (WhatsApp, Stock, Order, Email)│   │
│  │      └─ Fixed bottom position (mobile only)             │   │
│  │                                                           │   │
│  └───────────────────────────────────────────────────────────┘  │
│                             │                                     │
│                             ▼                                     │
│  ┌─ STATE & HOOKS ──────────────────────────────────────────┐   │
│  │                                                           │   │
│  │  useMediaQuery (use-media-query.ts)                     │   │
│  │  └─ Responsive design detection                         │   │
│  │                                                           │   │
│  │  useState (React)                                        │   │
│  │  ├─ Form data                                           │   │
│  │  ├─ Filter states                                       │   │
│  │  ├─ Modal visibility                                    │   │
│  │  └─ Menu states                                         │   │
│  │                                                           │   │
│  │  useEffect (React)                                       │   │
│  │  ├─ Scroll listening                                    │   │
│  │  └─ Window resize                                       │   │
│  │                                                           │   │
│  └───────────────────────────────────────────────────────────┘  │
│                                                                    │
└────────────────────────────────────────────────────────────────────┘

┌─── DATA LAYER ────────────────────────────────────────────────────┐
│                                                                    │
│  /lib/business.ts (Business Constants)                           │
│  ├─ name: "Makan Luxury Motors"                                  │
│  ├─ phone: "+212 641-389898"                                     │
│  ├─ email: "Maka.benioukil@gmail.com"                            │
│  ├─ location: "Oujda, Morocco"                                   │
│  ├─ whatsappLink: (pre-filled message)                           │
│  ├─ emailLink: (mailto with subject)                             │
│  ├─ googleMapsLink: (location search)                            │
│  ├─ instagram: (social link)                                     │
│  └─ facebook: (social link)                                      │
│                                                                    │
│  /data/cars.ts (Car Inventory)                                   │
│  ├─ Car 1: Mercedes GLC 300de                                    │
│  ├─ Car 2: Mercedes GLC Coupé                                    │
│  ├─ Car 3: BMW M440i xDrive                                      │
│  ├─ Car 4: Porsche 911 Carrera                                   │
│  ├─ Car 5: Range Rover Velar                                     │
│  └─ Car 6: Audi Q8 e-tron                                        │
│                                                                    │
│  Car Interface:                                                   │
│  ├─ id: string                                                    │
│  ├─ model: string                                                 │
│  ├─ year: number                                                  │
│  ├─ package: string                                               │
│  ├─ status: 'disponible' | 'sur-demande'                         │
│  ├─ images: string[]                                              │
│  └─ price?: string                                                │
│                                                                    │
└────────────────────────────────────────────────────────────────────┘

┌─── STYLING LAYER ─────────────────────────────────────────────────┐
│                                                                    │
│  /app/globals.css                                                │
│  ├─ Tailwind imports                                             │
│  ├─ Custom scrollbar styling                                     │
│  ├─ Selection styling                                            │
│  ├─ Smooth scroll behavior                                       │
│  └─ Focus visible styles                                         │
│                                                                    │
│  /tailwind.config.ts                                             │
│  ├─ Font variables                                               │
│  └─ Theme configuration                                          │
│                                                                    │
│  /app/layout.tsx                                                 │
│  ├─ Font imports (Inter, Playfair Display)                       │
│  ├─ Font variables setup                                         │
│  └─ HTML element styling                                         │
│                                                                    │
└────────────────────────────────────────────────────────────────────┘

┌─── ANIMATION LAYER ───────────────────────────────────────────────┐
│                                                                    │
│  Framer Motion (10.16.16)                                        │
│                                                                    │
│  Animation Types:                                                │
│  ├─ Fade-in on scroll          (opacity)                        │
│  ├─ Slide up on scroll         (y-axis)                         │
│  ├─ Scale on scroll            (scale)                          │
│  ├─ Hover scale                (1.05x)                          │
│  ├─ Tap scale                  (0.95x)                          │
│  ├─ Icon rotation              (rotate)                         │
│  ├─ Floating animation         (y-axis loop)                    │
│  ├─ Staggered list             (delay)                          │
│  ├─ Connector lines            (scaleX)                         │
│  └─ Scroll indicator           (y-axis loop)                    │
│                                                                    │
│  Animation Timing:                                               │
│  ├─ Duration: 300ms - 800ms                                     │
│  ├─ Easing: ease-out (default)                                  │
│  ├─ Delays: staggered (0-0.7s)                                  │
│  └─ Viewport: once: true (one-time animation)                   │
│                                                                    │
└────────────────────────────────────────────────────────────────────┘

┌─── INTEGRATION LAYER ─────────────────────────────────────────────┐
│                                                                    │
│  External Services:                                               │
│                                                                    │
│  WhatsApp                                                         │
│  └─ wa.me/{phone}?text={encoded_message}                        │
│                                                                    │
│  Email                                                            │
│  └─ mailto:{email}?subject={subject}&body={body}                │
│                                                                    │
│  Phone                                                            │
│  └─ tel:{phone}                                                  │
│                                                                    │
│  Google Maps                                                      │
│  └─ google.com/maps/search/?api=1&query={location}              │
│                                                                    │
│  Social Media                                                     │
│  ├─ instagram.com/{handle}                                       │
│  └─ facebook.com                                                 │
│                                                                    │
└────────────────────────────────────────────────────────────────────┘

┌─── DEPLOYMENT LAYER ──────────────────────────────────────────────┐
│                                                                    │
│  Build Output                                                     │
│  ├─ Next.js (16.1.6) builds to .next folder                     │
│  ├─ Turbopack enabled (default bundler)                         │
│  ├─ Image optimization                                           │
│  └─ Code splitting per component                                 │
│                                                                    │
│  Hosting Options                                                  │
│  ├─ Vercel (recommended) - 1-click deploy                       │
│  ├─ AWS - EC2/ECS/Lambda                                        │
│  ├─ Google Cloud - App Engine                                   │
│  ├─ Azure - App Service                                         │
│  └─ Any Node.js host - npm run build && npm start               │
│                                                                    │
└────────────────────────────────────────────────────────────────────┘
```

## 🔄 Data Flow

```
USER INTERACTION
     │
     ├─ Click Navigation Link
     │  └─ scrollToSection() → scrollIntoView()
     │
     ├─ Search/Filter Cars
     │  ├─ setSearchTerm() / setSelectedStatus()
     │  ├─ useMemo filters cars array
     │  └─ Re-renders CarCard components
     │
     ├─ Click Car Info
     │  ├─ onInfoClick() sets selectedCar
     │  ├─ setIsModalOpen(true)
     │  └─ CarModal renders with AnimatePresence
     │
     ├─ Submit Contact Form
     │  ├─ handleChange() updates formData
     │  ├─ handleSubmit() validates
     │  ├─ Shows success toast
     │  ├─ Offers WhatsApp/Email options
     │  └─ Resets form
     │
     └─ Click WhatsApp/Email
        └─ Opens external service with pre-filled data
```

## 📦 Component Dependency Tree

```
page.tsx (Main)
├── Navbar
│   └─ (scrollTo navigation)
├── Hero
│   └─ (business data, scrollTo CTAs)
├── StockSection
│   ├─ CarCard (multiple)
│   │  └─ (onInfoClick callback)
│   └─ CarModal
│       └─ (car data, business links)
├── OrderSection
│   └─ (scrollTo contact)
├── ImportExportSection
│   └─ (scrollTo contact, business links)
├── ContactSection
│   └─ (business data, form handling)
├── Footer
│   └─ (business data, navigation links)
├── MobileQuickBar
│   ├─ (useMediaQuery hook)
│   └─ (business links, scrollTo)
└── Toaster (Sonner)
    └─ (notifications)
```

## 🎯 Feature Implementation Details

### Search & Filter System
```
StockSection
├─ State: searchTerm, selectedStatus
├─ useMemo: filters cars array based on:
│  ├─ model.toLowerCase().includes(searchTerm)
│  └─ status === selectedStatus (or 'all')
└─ Renders: filtered car grid with count
```

### Modal System
```
CarModal (AnimatePresence)
├─ Initial: opacity: 0, scale: 0.9
├─ Animate: opacity: 1, scale: 1
├─ Exit: opacity: 0, scale: 0.9
└─ Backdrop: onClick closes modal
```

### Form Submission
```
ContactSection.handleSubmit()
├─ Validation: all fields required
├─ Toast: success message
├─ Delay 500ms
├─ Custom toast with options:
│  ├─ WhatsApp (pre-filled message)
│  └─ Email (pre-filled body)
└─ Reset form data
```

### Responsive Design
```
useMediaQuery('(max-width: 768px)')
├─ Mobile: single column, bottom bar visible
├─ Tablet: 2-column layouts
└─ Desktop: 3-column layouts, bottom bar hidden
```

## ⚡ Performance Optimization

### Load Time Optimization
- Next.js Image component for automatic optimization
- Google Fonts with variable loading
- CSS minification via Tailwind
- Code splitting per component

### Runtime Optimization
- Lazy rendering with whileInView
- Memoization with useMemo for filters
- Event delegation for scroll listeners
- Conditional rendering for mobile elements

### Animation Optimization
- GPU-accelerated transforms (scale, opacity)
- requestAnimationFrame via Framer Motion
- Viewport: once: true (one-time animations)
- No layout-triggering animations

## 🔐 Security Measures

- No sensitive data in client code
- External links: target="_blank" rel="noopener noreferrer"
- Form validation before submission
- No API calls (client-side only)
- Safe data handling with TypeScript

## 📱 Responsive Breakpoints

```
Mobile   Tablet   Desktop   Extra Large
<640px   640-1024  1024-1536  1536px+

Navbar:     ✓        ✓         ✓          ✓
Hero:       ✓        ✓         ✓          ✓
Stock:      1col     2col      3col       3col
Cards:      1col     2col      3col       3col
Contact:    flex     flex      grid       grid
Footer:     1col     2col      4col       4col
QuickBar:   ✓        ✓         hidden     hidden
```

---

**Architecture Version**: 1.0.0  
**Last Updated**: March 2026  
**Framework**: Next.js 16 + React 19  
**Status**: Production Ready ✅
