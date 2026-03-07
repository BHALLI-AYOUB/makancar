# Developer Guide - Makan Luxury Motors

## Code Organization

### Component Hierarchy
```
page.tsx (main)
├── Navbar
├── Hero
├── StockSection
│   ├── CarCard (multiple)
│   └── CarModal
├── OrderSection
├── ImportExportSection
├── ContactSection
├── Footer
└── MobileQuickBar
```

## Component Details

### Navbar Component
- **File**: `components/Navbar.tsx`
- **Props**: None (uses internal state)
- **Features**: 
  - Sticky positioning with backdrop blur
  - Mobile hamburger menu
  - Language switcher UI
  - Scroll-triggered height change

### Hero Component
- **File**: `components/Hero.tsx`
- **Features**:
  - Fade-in animations on load
  - Floating car image
  - Quick contact links (WhatsApp, Phone, Email)
  - Scroll-to-section buttons

### StockSection Component
- **File**: `components/StockSection.tsx`
- **State**:
  - `searchTerm`: String for model search
  - `selectedStatus`: 'all' | 'disponible' | 'sur-demande'
  - `selectedCar`: Currently selected car for modal
  - `isModalOpen`: Boolean for modal visibility

### CarCard Component
- **File**: `components/CarCard.tsx`
- **Props**:
  ```typescript
  interface CarCardProps {
    car: Car
    onInfoClick: (car: Car) => void
  }
  ```
- **Features**:
  - Image with hover overlay
  - Status badge
  - Action buttons with WhatsApp integration

### CarModal Component
- **File**: `components/CarModal.tsx`
- **Props**:
  ```typescript
  interface CarModalProps {
    car: Car | null
    isOpen: boolean
    onClose: () => void
  }
  ```
- **Features**:
  - Image gallery
  - Car specifications grid
  - Contact action buttons

### StockSection Component
- **File**: `components/StockSection.tsx`
- **Features**:
  - Search bar for model filtering
  - Status toggle buttons
  - Dynamic car grid
  - Results counter
  - Modal integration

### OrderSection Component
- **File**: `components/OrderSection.tsx`
- **Features**:
  - 3-step process visualization
  - Connector lines animation
  - Call-to-action button
  - Icon animations on hover

### ImportExportSection Component
- **File**: `components/ImportExportSection.tsx`
- **Features**:
  - 6 service cards
  - Icon animations
  - "En savoir plus" links
  - CTA buttons (Quote, WhatsApp)

### ContactSection Component
- **File**: `components/ContactSection.tsx`
- **State**:
  ```typescript
  {
    name: string
    email: string
    phone: string
    message: string
  }
  ```
- **Features**:
  - Form validation
  - Success toast notification
  - WhatsApp/Email integration
  - Quick contact cards

### Footer Component
- **File**: `components/Footer.tsx`
- **Features**:
  - 4-column layout (desktop)
  - Navigation links
  - Contact information
  - Social media icons
  - Copyright notice

### MobileQuickBar Component
- **File**: `components/MobileQuickBar.tsx`
- **Features**:
  - Mobile-only (hidden on desktop)
  - 4 quick action buttons
  - Fixed bottom position
  - No overlap with content

## Data Structures

### Car Interface
```typescript
interface Car {
  id: string
  model: string
  year: number
  package: string
  status: 'disponible' | 'sur-demande'
  images: string[]
  price?: string
}
```

### Business Constants
```typescript
{
  name: string
  phone: string
  email: string
  location: string
  instagram: string
  facebook: string
  whatsappLink: string
  emailLink: string
  googleMapsLink: string
}
```

## Styling Approach

### Color Scheme
- **Primary**: Gold (Amber-400: #fbbf24, Amber-600: #d97706)
- **Background**: Black (#000)
- **Text**: White/Gray shades
- **Accents**: Green (WhatsApp), Blue (Email), Purple (Call)

### Responsive Breakpoints
- **Mobile**: < 640px (sm)
- **Tablet**: 640px - 1024px (md)
- **Desktop**: > 1024px (lg)

### Key Tailwind Classes
- `.font-serif` - Headings (Playfair Display)
- `.font-sans` - Body text (Inter)
- `.bg-black/40` - Glass effect backgrounds
- `.border-amber-400/20` - Subtle gold borders
- `.shadow-amber-400/50` - Glowing shadows

## Animation Patterns

### Fade-in on Scroll
```typescript
<motion.div
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6 }}
  viewport={{ once: true }}
>
  Content
</motion.div>
```

### Hover Scale
```typescript
<motion.button
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
>
  Click me
</motion.button>
```

### Staggered List
```typescript
{items.map((item, index) => (
  <motion.div
    key={item.id}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.1 }}
  >
    {item}
  </motion.div>
))}
```

## Common Patterns

### Scroll Navigation
```typescript
const scrollToSection = (id: string) => {
  const element = document.getElementById(id)
  element?.scrollIntoView({ behavior: 'smooth' })
}
```

### WhatsApp Integration
```typescript
const message = `Bonjour, je suis intéressé par ${carModel}`
window.open(
  `https://wa.me/212641389898?text=${encodeURIComponent(message)}`,
  '_blank'
)
```

### Form Handling
```typescript
const [formData, setFormData] = useState({
  name: '', email: '', phone: '', message: ''
})

const handleSubmit = async (e) => {
  e.preventDefault()
  // Validation
  // Show toast
  // Reset form
}
```

### Media Query Hook
```typescript
const isMobile = useMediaQuery('(max-width: 768px)')
return isMobile ? <MobileComponent /> : <DesktopComponent />
```

## SEO Configuration

### Meta Tags (layout.tsx)
```typescript
export const metadata: Metadata = {
  title: 'Makan Luxury Motors - Véhicules de Luxe',
  description: 'Découvrez notre sélection...',
  openGraph: {
    title: 'Makan Luxury Motors',
    description: '...',
  }
}
```

## Performance Tips

1. **Image Optimization**: Use `next/image` component
2. **Lazy Loading**: Utilize `whileInView` in animations
3. **Code Splitting**: Each component is automatically split
4. **CSS-in-JS**: Tailwind provides optimal CSS
5. **Font Loading**: Google Fonts with `next/font`

## Debugging

### Enable Debug Logs
```typescript
console.log('[v0] Debug message:', variable)
```

### React DevTools
- Install React DevTools browser extension
- Inspect component state and props

### Network Tab
- Check image loading and API calls
- Verify all external links work

## Future Enhancements

- [ ] Add inventory management API
- [ ] Implement user accounts
- [ ] Add vehicle booking system
- [ ] Create admin dashboard
- [ ] Add payment integration
- [ ] Implement analytics
- [ ] Add multi-language support (backend)
- [ ] Create blog section
- [ ] Add testimonials/reviews

## Common Issues & Solutions

### Components not re-rendering
- Ensure proper state management
- Check dependency arrays in useEffect
- Verify 'use client' directive

### Images not loading
- Check CORS headers
- Use absolute URLs for external images
- Verify image dimensions

### Animations stuttering
- Reduce motion on mobile
- Check for heavy computations in render
- Use transform/opacity for animations

### Responsive layout broken
- Check Tailwind breakpoint classes
- Test on actual devices
- Use browser DevTools device emulation

---

**Last Updated**: March 2026
**Maintained by**: v0.app
