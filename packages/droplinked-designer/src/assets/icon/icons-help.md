# 🎨 Icon System Documentation

## Overview
Our icon system uses React components generated from SVGs, providing consistent and scalable icons throughout the application.

## 📏 Size Variations
Icons are available in three standard sizes:
- Small (Sm): 16x16px
- Medium (Md): 20x20px
- Large (Lg): 24x24px - viewBox="0 0 24 24"

## 🗂️ Icon Categories
Icons are organized in the following categories:
- System
  - Blog
  - Affiliate
  - ...
- StyleDesigner
- SocialMedia
 - Colorless
 - Colored
- Sign
- Navigation 
- Items 
- Finance 
- Coding 
- Action

## 💻 Usage

### Basic Implementation
```tsx
import { BlogLg } from '@/assets/icons/System/Blog';

// Large icon (24x24)
<BlogLg />

// With custom props
<BlogLg className="custom-class" />
```

### 🎨 SVG Structure
Our icons follow a consistent structure:
```tsx
<svg 
  width="24" 
  height="24" 
  viewBox="0 0 24 24" 
  fill="none" 
  xmlns="http://www.w3.org/2000/svg"
>
  <path ... stroke={color} />
</svg>
```

### Customization with Chakra UI
Icons can be customized using Chakra UI's Box component:

```tsx
import { Box } from '@chakra-ui/react';
import { BlogLg } from '@/assets/icons/System/Blog';

<BlogLg color="white" />
```

## 🛠️ Technical Details

- Icons use `currentColor` for stroke color, allowing for easy theme integration
- Default stroke widths are 1.5-2px
- All icons support standard SVG props through React's SVGProps
- Icons maintain consistent styling with `strokeLinecap="round"` and `strokeLinejoin="round"`