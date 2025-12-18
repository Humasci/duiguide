# Design Brief: DUI Guide "Organic Tech" Aesthetic

## Overview
Transform the DUI Guide website to embody Claude AI's sophisticated design language while maintaining our legal-focused content. The goal is "Precision meets Hand-Drawn" - a clean, trustworthy interface that feels approachable and human.

## Core Philosophy: "Warm Minimalism" → "Cool Precision"
- **Structure**: Rigid and geometric layout (like Claude)
- **Imagery**: Organic, imperfect sketches (not stock photos)
- **Feeling**: Professional yet approachable, like a clean digital magazine
- **Trust**: Achieved through space, typography, and thoughtful design

## Color Palette: "Cool Slate & Ink"

### Primary Colors
```css
/* Background & Canvas */
--bg-primary: #F0F4F8;      /* Alice Blue - main background */
--bg-card: #FFFFFF;         /* Pure white - card backgrounds */
--bg-inverted: #1E293B;     /* Deep slate - dark sections */

/* Typography */
--text-primary: #0F172A;    /* Rich navy-black - never pure black */
--text-secondary: #475569;  /* Slate gray - muted text */
--text-inverted: #F8FAFC;   /* Near-white - on dark backgrounds */

/* Accent & Actions */
--accent-primary: #0047AB;  /* Cobalt blue - buttons, links */
--accent-hover: #003d96;    /* Darker cobalt - hover states */

/* Sketch Colors */
--sketch-primary: #334155;  /* Charcoal - main sketch color */
--sketch-accent: #EA580C;   /* Burnt orange - warm contrast pop */
```

### Usage Guidelines
- **Background**: Always use Alice Blue (#F0F4F8) as the main canvas
- **Cards**: Pure white with subtle shadows, never colored backgrounds
- **Text**: Navy-black for readability, slate-gray for secondary info
- **Sketches**: Charcoal with occasional burnt orange accents

## Typography: "Friendly Geometric"

### Font Stack
```css
/* Headlines */
--font-headline: 'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif;

/* Body Text */
--font-body: 'Noto Sans', -apple-system, BlinkMacSystemFont, sans-serif;
```

### Hierarchy
```css
/* Hero Headlines */
h1 {
  font-family: var(--font-headline);
  font-weight: 700;
  font-size: clamp(2.5rem, 5vw, 4rem);
  letter-spacing: -0.03em;
  line-height: 1.1;
}

/* Section Headers */
h2 {
  font-family: var(--font-headline);
  font-weight: 600;
  font-size: clamp(1.875rem, 3vw, 2.5rem);
  letter-spacing: -0.02em;
  line-height: 1.2;
}

/* Subsections */
h3 {
  font-family: var(--font-headline);
  font-weight: 600;
  font-size: clamp(1.25rem, 2vw, 1.5rem);
  letter-spacing: -0.01em;
}

/* Body Text */
p {
  font-family: var(--font-body);
  font-weight: 400;
  font-size: 1rem;
  line-height: 1.6;
  letter-spacing: 0;
}
```

## Layout System: "The Claude Grid"

### Core Layouts
1. **50/50 Hero Split**: Text left, large sketch right
2. **Three-Column Features**: Equal cards with sketch + text
3. **Text-Heavy Sections**: Single column, max-width for readability
4. **Timeline/Process**: Vertical flow with connecting elements

### Spacing Philosophy
```css
/* Generous Spacing */
--space-xs: 0.5rem;    /* 8px */
--space-sm: 1rem;      /* 16px */
--space-md: 2rem;      /* 32px */
--space-lg: 4rem;      /* 64px */
--space-xl: 6rem;      /* 96px */
--space-2xl: 8rem;     /* 128px */
```

**Rule**: When in doubt, add more space. The Claude aesthetic feels expensive because of generous whitespace.

## Component Design System

### Buttons
```css
/* Primary Button */
.btn-primary {
  background: var(--accent-primary);
  color: white;
  border: none;
  border-radius: 50px;           /* Pill shape */
  padding: 0.75rem 2rem;
  font-family: var(--font-headline);
  font-weight: 600;
  font-size: 1rem;
  transition: all 0.2s ease;
}

/* Ghost Button */
.btn-ghost {
  background: transparent;
  color: var(--text-primary);
  border: 1px solid var(--text-primary);
  border-radius: 50px;
  padding: 0.75rem 2rem;
  font-family: var(--font-headline);
  font-weight: 500;
}
```

### Cards
```css
.card {
  background: var(--bg-card);
  border-radius: 12px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  padding: var(--space-lg);
  margin-bottom: var(--space-md);
}
```

### Urgency Badges
```css
/* Critical (Red) */
.badge-critical {
  background: #DC2626;
  color: white;
  border-radius: 20px;
  padding: 0.25rem 0.75rem;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

/* Warning (Orange) */
.badge-warning {
  background: #EA580C;
  color: white;
  /* same styling as critical */
}
```

## Illustration Style: "Napkin Sketches"

### Visual Requirements
- **Style**: Monoline drawings with consistent stroke width
- **Imperfection**: Slightly wobbly lines, hand-drawn feel
- **Subjects**: Abstract concepts, not literal representations
- **Colors**: Primarily charcoal (#334155) with burnt orange (#EA580C) accents

### Subject Matter Guide
- **Safety/Protection**: Shield, umbrella, hands cupping
- **Speed/Urgency**: Swooshing lines, arrows, clock
- **Process/Steps**: Connected dots, flowing paths
- **Legal/Authority**: Balanced scales, gavel (simplified)
- **Support/Help**: Hands reaching, bridge, ladder

### Technical Specs
- **Format**: SVG for crisp scaling
- **Stroke Width**: 2-3px consistently
- **Size**: Large format (400-600px) for impact
- **Background**: Transparent, floats on page background

## Page Layout Examples

### Hero Section (Homepage)
```
[     Large Headline       ] [                    ]
[     Subtitle             ] [    Large Sketch    ]
[     CTA Button           ] [                    ]
[     Trust Indicators     ] [                    ]
```

### Feature Grid
```
[ Sketch ]    [ Sketch ]    [ Sketch ]
[ Title  ]    [ Title  ]    [ Title  ]
[  Text  ]    [  Text  ]    [  Text  ]
[  CTA   ]    [  CTA   ]    [  CTA   ]
```

### Content Section
```
                [ Centered Headline ]
                [  Centered Subtitle ]

[ Left aligned paragraph text with generous ]
[ line height and comfortable measure.     ]
[ Maximum width for readability.           ]

                [    CTA Button    ]
```

## Implementation Checklist

### Phase 1: Foundation
- [ ] Update CSS custom properties with new color palette
- [ ] Import Google Fonts (DM Sans, Noto Sans)
- [ ] Establish spacing system
- [ ] Create base component styles

### Phase 2: Components
- [ ] Style buttons (primary, ghost)
- [ ] Design card components
- [ ] Create urgency badges
- [ ] Build form inputs

### Phase 3: Layout
- [ ] Implement hero sections
- [ ] Create feature grids
- [ ] Style content sections
- [ ] Add timeline components

### Phase 4: Sketches
- [ ] Source or create sketch illustrations
- [ ] Implement as SVGs
- [ ] Position correctly in layouts
- [ ] Test responsive behavior

## Success Metrics
- **Visual**: Looks sophisticated and trustworthy like Claude AI
- **Feel**: Approachable and human despite legal content
- **Performance**: Fast loading, smooth animations
- **Accessibility**: High contrast ratios, readable fonts
- **Mobile**: Responsive design that maintains hierarchy

## References
- Claude.ai homepage and product pages
- Anthropic's design language
- Linear.app for geometric precision
- Figma.com for clean illustrations
- Stripe.com for trustworthy financial UI

---

*This brief should guide all design decisions. When in doubt, prioritize space, simplicity, and clarity over decoration.*