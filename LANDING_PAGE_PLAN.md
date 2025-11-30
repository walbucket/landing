# Walbucket Landing Page Development Plan

## 🎯 Project Overview

Create a modern, interactive landing page for Walbucket that showcases the SDK capabilities with Three.js illustrations and integrated documentation.

## 🎨 Design Vision

### Theme
- **Aquatic/Blockchain Theme**: Align with Sui ecosystem (Walrus, Seal)
- **Modern & Clean**: Minimalist design with focus on content
- **Interactive**: Engaging Three.js animations that demonstrate concepts
- **Developer-Focused**: Clear code examples and documentation

### Color Palette
- Primary: Ocean blues/teals (blockchain theme)
- Accent: Bright cyan/blue for CTAs
- Background: Dark mode default with light mode option
- Text: High contrast for readability

## 📐 Page Structure

### 1. Hero Section
**Purpose**: First impression, value proposition

**Components**:
- Animated logo/wordmark
- Hero headline: "Decentralized Media Storage for Developers"
- Subheadline: "Cloudinary-like API on Sui blockchain"
- Primary CTA: "Get Started" / "View Docs"
- Secondary CTA: "Try Demo"
- **Three.js Animation**: 
  - Floating 3D "bucket" or storage container
  - Particles representing data/files flowing into bucket
  - Subtle rotation and glow effects

**Layout**: Full viewport height, centered content

---

### 2. Features Section
**Purpose**: Highlight key capabilities

**Components**:
- Feature cards (3-4 main features):
  1. **Decentralized Storage** - Walrus integration
  2. **Built-in Encryption** - Seal integration
  3. **Cloudinary-like API** - Easy migration
  4. **Gas Strategies** - Flexible payment options
- **Three.js Animation**: 
  - Interactive feature cards that reveal 3D models on hover
  - Each feature has a unique 3D icon/visualization
  - Smooth transitions between features

**Layout**: Grid layout (2x2 or 1x4), responsive

---

### 3. Interactive Demo Section
**Purpose**: Show SDK in action

**Components**:
- Live code editor (Monaco Editor or CodeMirror)
- Interactive examples:
  - Upload example
  - Retrieve example
  - Encryption example
- **Three.js Animation**:
  - Visual representation of file upload flow
  - 3D network diagram showing Sui → Walrus → Seal
  - Real-time visualization of data flow

**Layout**: Split screen (code left, visualization right)

---

### 4. Quick Start / Installation
**Purpose**: Get developers started quickly

**Components**:
- Installation commands (npm/pnpm/yarn)
- Quick start code example
- Copy-to-clipboard buttons
- **Three.js Animation**:
  - Animated terminal/console
  - Code blocks that "type" themselves
  - Success animations on copy

**Layout**: Centered, code-focused

---

### 5. SDK Documentation Section
**Purpose**: Comprehensive API reference

**Components**:
- **Navigation Sidebar**: 
  - Installation
  - Configuration
  - API Reference (Upload, Retrieve, Delete, Transform)
  - Gas Strategies
  - Encryption Policies
  - Examples
  - Error Handling
- **Content Area**:
  - Markdown-based documentation
  - Code examples with syntax highlighting
  - Interactive code playgrounds
  - Search functionality
- **Three.js Animation**:
  - Background particles/network visualization
  - Subtle animations that don't distract from content

**Layout**: Sidebar navigation + main content (docs-style)

---

### 6. Code Examples Gallery
**Purpose**: Showcase real-world usage

**Components**:
- Example cards:
  - React integration
  - Node.js server
  - Wallet integration
  - Encryption examples
- Each card: Code preview + description + "Try it" button
- **Three.js Animation**:
  - Code snippets that animate in
  - Visual connections between examples

**Layout**: Masonry or grid layout

---

### 7. Comparison Section
**Purpose**: Show advantages over Cloudinary

**Components**:
- Comparison table: Walbucket vs Cloudinary
- Key differentiators highlighted
- **Three.js Animation**:
  - Animated comparison cards
  - Visual representation of decentralization benefits

**Layout**: Table or card-based comparison

---

### 8. Stats / Social Proof
**Purpose**: Build credibility

**Components**:
- Key metrics (if available):
  - Downloads
  - GitHub stars
  - Active users
- Testimonials (if available)
- **Three.js Animation**:
  - Animated counters
  - Particle effects on hover

**Layout**: Horizontal cards or grid

---

### 9. CTA Section
**Purpose**: Final conversion push

**Components**:
- Strong headline
- Primary CTA buttons
- Links to GitHub, npm, Discord, etc.
- **Three.js Animation**:
  - Dynamic background with particles
  - Interactive elements

**Layout**: Centered, prominent

---

### 10. Footer
**Purpose**: Navigation and links

**Components**:
- Links: Docs, GitHub, Blog, Support
- Social links
- Copyright
- **Three.js Animation**: Minimal (if any)

**Layout**: Standard footer layout

---

## 🛠️ Technical Stack

### Core Framework
- **Next.js 16** (App Router) - Already set up ✅
- **React 19** - Already set up ✅
- **TypeScript** - Already set up ✅

### Styling
- **Tailwind CSS 4** - Already set up ✅
- **shadcn/ui** - Add for components (buttons, cards, etc.)
- **Framer Motion** - For smooth animations and transitions
- **Tailwind Animate** - Already available ✅

### 3D Graphics
- **Three.js** - Core 3D library
- **@react-three/fiber** - React renderer for Three.js
- **@react-three/drei** - Useful helpers and abstractions
- **@react-three/postprocessing** - Post-processing effects

### Documentation
- **MDX** - Markdown with React components
- **next-mdx-remote** - MDX rendering in Next.js
- **react-syntax-highlighter** or **shiki** - Code highlighting
- **Monaco Editor** or **CodeMirror** - Interactive code editor

### Additional Libraries
- **lucide-react** - Icons (already installed ✅)
- **clsx** - Class utilities (already installed ✅)
- **react-copy-to-clipboard** - Copy functionality
- **react-intersection-observer** - Scroll animations

---

## 📦 Installation Plan

### Step 1: Install Dependencies

```bash
cd landing
pnpm add three @react-three/fiber @react-three/drei
pnpm add framer-motion
pnpm add @radix-ui/react-* # For shadcn components
pnpm add mdx @next/mdx next-mdx-remote
pnpm add react-syntax-highlighter @types/react-syntax-highlighter
pnpm add react-copy-to-clipboard
pnpm add react-intersection-observer
```

### Step 2: Setup shadcn/ui

```bash
npx shadcn@latest init
npx shadcn@latest add button card badge code-block
```

### Step 3: Project Structure

```
landing/
├── app/
│   ├── layout.tsx
│   ├── page.tsx (main landing page)
│   ├── docs/
│   │   └── [[...slug]]/
│   │       └── page.tsx (dynamic docs routes)
│   └── globals.css
├── components/
│   ├── three/
│   │   ├── HeroScene.tsx
│   │   ├── FeatureVisualization.tsx
│   │   ├── NetworkDiagram.tsx
│   │   └── Particles.tsx
│   ├── sections/
│   │   ├── Hero.tsx
│   │   ├── Features.tsx
│   │   ├── Demo.tsx
│   │   ├── QuickStart.tsx
│   │   ├── Documentation.tsx
│   │   ├── Examples.tsx
│   │   ├── Comparison.tsx
│   │   ├── Stats.tsx
│   │   ├── CTA.tsx
│   │   └── Footer.tsx
│   ├── ui/ (shadcn components)
│   ├── CodeBlock.tsx
│   ├── CodeEditor.tsx
│   └── CopyButton.tsx
├── lib/
│   ├── utils.ts
│   ├── mdx.ts
│   └── three-helpers.ts
├── content/
│   └── docs/
│       ├── installation.mdx
│       ├── configuration.mdx
│       ├── upload.mdx
│       ├── retrieve.mdx
│       └── ...
└── public/
    └── models/ (3D models if needed)
```

---

## 🎬 Three.js Animation Ideas

### 1. Hero Scene - "Floating Bucket"
- **Concept**: 3D bucket/container floating in space
- **Elements**:
  - Main bucket mesh (rounded container)
  - Particles flowing into bucket (representing files)
  - Glow effect around bucket
  - Subtle rotation and floating animation
  - Ocean/water theme colors
- **Interactivity**: 
  - Mouse movement affects camera angle
  - Hover effects on bucket

### 2. Feature Cards - 3D Icons
- **Storage Icon**: 3D stack of boxes
- **Encryption Icon**: Lock/shield with particles
- **API Icon**: Network nodes connected
- **Gas Icon**: Coins/tokens animation
- **Interactivity**: 
  - 3D model appears on card hover
  - Smooth transitions

### 3. Network Diagram
- **Concept**: Visual representation of Sui → Walrus → Seal flow
- **Elements**:
  - Nodes representing services
  - Animated connections (data flow)
  - File icons moving along connections
  - Real-time updates
- **Interactivity**: 
  - Click nodes for more info
  - Hover to highlight paths

### 4. Code Visualization
- **Concept**: Code blocks with 3D effects
- **Elements**:
  - Code that "types" itself
  - Syntax highlighting with 3D depth
  - Success animations on execution
- **Interactivity**: 
  - Run code examples
  - Visual feedback

### 5. Background Particles
- **Concept**: Subtle particle system throughout page
- **Elements**:
  - Floating particles (representing data)
  - Connection lines between particles
  - Ocean-themed colors
- **Interactivity**: 
  - Particles react to scroll
  - Mouse interaction

---

## 📝 Documentation Integration

### Approach
1. **Extract from SDK README**: Parse existing SDK README.md
2. **Convert to MDX**: Transform markdown to MDX format
3. **Dynamic Routing**: Use Next.js catch-all routes for docs
4. **Search**: Implement search functionality
5. **Navigation**: Auto-generate sidebar from docs structure

### Documentation Sections
1. **Getting Started**
   - Installation
   - Quick Start
   - Configuration

2. **API Reference**
   - Upload
   - Retrieve
   - Delete
   - Transform
   - Get Asset

3. **Advanced**
   - Gas Strategies
   - Encryption Policies
   - Error Handling
   - Wallet Integration

4. **Examples**
   - React Integration
   - Node.js Server
   - Encryption Examples
   - Wallet Examples

5. **Guides**
   - Migration from Cloudinary
   - Best Practices
   - Troubleshooting

---

## 🚀 Development Phases

### Phase 1: Foundation (Week 1)
- [ ] Setup Three.js and React Three Fiber
- [ ] Create base layout and navigation
- [ ] Implement Hero section with basic 3D scene
- [ ] Setup Tailwind and shadcn/ui components
- [ ] Create reusable component structure

### Phase 2: Core Sections (Week 2)
- [ ] Build Features section with 3D cards
- [ ] Implement Quick Start section
- [ ] Create CodeBlock and CodeEditor components
- [ ] Add copy-to-clipboard functionality
- [ ] Implement smooth scroll animations

### Phase 3: Documentation (Week 3)
- [ ] Setup MDX for documentation
- [ ] Extract and convert SDK README to MDX
- [ ] Build documentation layout with sidebar
- [ ] Implement search functionality
- [ ] Add code syntax highlighting

### Phase 4: Advanced Features (Week 4)
- [ ] Build interactive demo section
- [ ] Create network diagram visualization
- [ ] Implement examples gallery
- [ ] Add comparison section
- [ ] Polish animations and interactions

### Phase 5: Polish & Optimization (Week 5)
- [ ] Performance optimization (Three.js)
- [ ] Mobile responsiveness
- [ ] Accessibility improvements
- [ ] SEO optimization
- [ ] Testing and bug fixes

---

## 🎯 Key Features to Implement

### 1. Responsive Design
- Mobile-first approach
- Breakpoints: sm, md, lg, xl
- Touch-friendly interactions
- Optimized Three.js for mobile (lower quality)

### 2. Performance
- Lazy load Three.js scenes
- Code splitting for heavy components
- Optimize 3D models and textures
- Use React.memo for expensive components
- Intersection Observer for scroll animations

### 3. Accessibility
- ARIA labels for interactive elements
- Keyboard navigation
- Screen reader support
- High contrast mode
- Focus indicators

### 4. SEO
- Meta tags and Open Graph
- Structured data
- Sitemap generation
- Fast loading times

### 5. User Experience
- Smooth page transitions
- Loading states
- Error boundaries
- Toast notifications
- Dark/light mode toggle

---

## 📊 Success Metrics

### Technical
- Lighthouse score > 90
- First Contentful Paint < 1.5s
- Time to Interactive < 3s
- Mobile-friendly score: 100

### User Experience
- Clear navigation
- Easy to find documentation
- Interactive elements work smoothly
- Code examples are copyable and runnable

### Business
- Increased SDK adoption
- Lower support requests (better docs)
- Higher engagement time
- More GitHub stars/downloads

---

## 🔧 Configuration Files Needed

### next.config.ts
- MDX plugin configuration
- Image optimization
- Bundle analyzer (optional)

### tailwind.config.ts
- Custom colors (ocean theme)
- Animation utilities
- Typography settings

### tsconfig.json
- Path aliases for cleaner imports
- MDX type support

---

## 📚 Resources & Inspiration

### Three.js Examples
- Three.js official examples
- React Three Fiber showcase
- Drei helpers documentation

### Design Inspiration
- Vercel landing page
- Stripe documentation
- Cloudinary website
- Sui ecosystem websites

### Documentation Sites
- Next.js docs
- React docs
- Tailwind docs
- MDX examples

---

## 🎨 Design Mockups (To Create)

1. **Hero Section** - Full viewport with 3D bucket
2. **Features Grid** - 4 feature cards with 3D icons
3. **Documentation Layout** - Sidebar + content
4. **Code Example** - Interactive editor
5. **Mobile Layout** - Responsive breakpoints

---

## 🚦 Next Steps

1. **Review this plan** with team
2. **Set up dependencies** (Phase 1)
3. **Create design mockups** (optional but recommended)
4. **Start with Hero section** (most visible)
5. **Iterate based on feedback**

---

## 📝 Notes

- Keep Three.js animations subtle - they should enhance, not distract
- Documentation should be easily searchable
- Code examples should be copy-paste ready
- Mobile experience is crucial
- Performance is key - optimize Three.js scenes
- Accessibility should not be an afterthought

---

**Status**: 📋 Planning Complete - Ready for Implementation

**Estimated Timeline**: 4-5 weeks for full implementation

**Priority**: High - Landing page is critical for developer adoption
