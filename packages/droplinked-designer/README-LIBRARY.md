# Droplinked Designer

A React component library for building customizable e-commerce page editors.

## Installation

```bash
npm install droplinked-designer
```

## Usage

```jsx
import { Editor, EditorMainConfig } from 'droplinked-designer';
import 'droplinked-designer/style.css';

function MyApp() {
  return (
    <Editor 
      config={EditorMainConfig}
      data={{ content: [], root: { title: "My Shop" } }}
    />
  );
}
```

## Components

This library exports:
- `Editor`: Main editor component
- `EditorMainConfig`: Pre-configured component configuration
- All Puck editor utilities and types

## Styling

Make sure to import the CSS file:

```jsx
import 'droplinked-designer/style.css';
```

## Configuration

You can customize the editor by modifying the `EditorMainConfig` or creating your own configuration following the Puck Config interface.

## Build

To build the library:

```bash
npm run build
```

This will generate:
- `dist/droplinked-designer.es.js` - ES module
- `dist/droplinked-designer.umd.js` - UMD module
- `dist/droplinked-designer.css` - Styles

## Development

For development mode:

```bash
npm run dev
```
