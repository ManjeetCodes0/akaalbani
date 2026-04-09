# ਆਕਾਲ ਬਾਣੀ - Punjabi News Website

## Project Overview
A modern, responsive Punjabi language news website built with Next.js 16, featuring:
- Punjabi-specific typography (Noto Sans/Serif Gurmukhi fonts)
- News homepage with featured stories, trending articles, and latest updates
- Individual article pages
- Dark-themed header and footer with warm accent colors
- Responsive mobile-first design
- Framer Motion animations

## Tech Stack
- **Framework**: Next.js 16
- **Language**: TypeScript
- **Styling**: CSS with responsive design
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Fonts**: Google Fonts (Noto Sans/Serif Gurmukhi)

## Project Structure
```
akaalbani/
├── app/
│   ├── layout.tsx          # Root layout with metadata and fonts
│   ├── page.tsx            # Homepage
│   ├── news/
│   │   └── [id]/
│   │       └── page.tsx    # Individual article page
│   └── globals.css         # Global styles and CSS variables
├── components/
│   ├── Header.tsx          # Navigation header with trending bar
│   ├── Footer.tsx          # Footer with links and recent posts
│   ├── Hero.tsx            # Main hero section with featured articles
│   ├── TopStories.tsx      # Top stories section
│   ├── WhatsNew.tsx        # What's new section
│   ├── FeaturedCircles.tsx # Featured circles grid
│   ├── BannerAd.tsx        # Advertisement banner
│   ├── AnimatedSection.tsx # Scroll animation wrapper
│   └── Sidebar.tsx         # Sidebar component
└── data/
    └── news.ts            # All news data, posts, and constants
```

## Design System
### Color Palette
- **Primary**: #b64022 (Warm rust/terracotta)
- **Secondary**: #036666 (Teal/cyan)
- **Accent**: #e2b93b (Gold)
- **Background**: #f7f4ec (Light warm beige)
- **Surface**: #fffdf7 (Off-white)
- **Text**: #1f1c1a (Dark brown/charcoal)
- **Muted**: #6b645d (Medium gray-brown)

### Typography
- **Body**: Noto Sans Gurmukhi (weights: 400, 500, 600, 700)
- **Headings**: Noto Serif Gurmukhi (weights: 500, 600, 700)

## Key Features
1. **Responsive Design**: Mobile-first approach with breakpoints at 650px and 768px+
2. **Animations**: Framer Motion animations on scroll and interactions
3. **News Data**: Centralized data management in `data/news.ts`
4. **SEO**: Metadata configuration for site-wide and article-specific pages

## Development Commands
```bash
npm run dev      # Start development server
npm run build    # Build for production
npm start        # Start production server
npm run lint     # Run linting
```

## Guidelines for Contributors
- Maintain the warm, earthy color palette
- Preserve Punjabi typography hierarchy
- Ensure mobile responsiveness (test on 375px, 768px, 1024px breakpoints)
- Use Framer Motion for subtle animations
- Keep animations delays consistent (0.04s increments)
- Test RTL/LTR text rendering for mixed content
- Update `data/news.ts` for new articles

## Responsive Breakpoints
- **Mobile**: 375px - 650px
- **Tablet**: 650px - 1000px  
- **Desktop**: 1000px+
- **Max Width**: 1240px container

## Notes
- Site shell max-width is 1240px with auto margins
- Background uses radial gradients for decorative shapes
- All shapes are fixed position with z-index: -1
- Images use next/image for optimization (when imported)
