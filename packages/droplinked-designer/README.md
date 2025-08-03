# Droplinked Designer

A visual page builder based on React and Puck Editor for creating and managing configurable components.

---

## Project Structure

```
src/
├── configured-components/    # Define categories and components here
│   └── [category]/           # Each folder is a category (e.g., design-layout)
│       └── [component]/      # Each folder is a component
│           ├── configs/      # Configs and interfaces
│           └── ...           # Component files
├── puck-editor/              # Puck editor core and wrapper
├── App.tsx                   # Main entry and configuration
└── ...
```

---

## How to Add a New Component

### 1. Define the Props Interface

In the appropriate path (e.g., `src/configured-components/design-layout/[component]/configs/interface.ts`):

```typescript
export interface MyComponentProps {
  foo: string;
  bar: number;
}
```

### 2. Implement the React Component

In the appropriate path (e.g., `src/configured-components/design-layout/[component]/MyComponent.tsx`):

```tsx
import { DropZone } from "../../../puck-editor";
import { MyComponentProps } from "./configs/interface";

const MyComponent: React.FC<MyComponentProps> = ({ foo, bar }) => (
  <div>{foo} - {bar}</div>
);

export default MyComponent;
```

### 3. Define the Component Config for Puck

In `src/configured-components/design-layout/[component]/configs/[component]Config.tsx`:

```tsx
import MyComponent from "../MyComponent";
import MyComponentVisualExample from "../MyComponentVisualExample";
import { Config } from "../../../puck-editor";

export const myComponentConfig: Config["components"][string] = {
  label: "My Component",
  labelIcon: <span>🌟</span>,
  visualExample: <MyComponentVisualExample />,
  fields: {
    foo: { type: "text", label: "Foo" },
    bar: { type: "number", label: "Bar" },
  },
  defaultProps: {
    foo: "Hello",
    bar: 1,
  },
  render: (props) => <MyComponent {...props} />,
};
```

### 4. Add to Exports

In `src/configured-components/design-layout/index.tsx`:

```tsx
import { myComponentConfig } from "./[component]/configs/[component]Config";

export const designLayoutComponents = {
  // ...existing code...
  myComponent: myComponentConfig,
};
```

### 5. Add to Category (Optional)

In `src/configured-components/design-layout/categoryConfig.ts`:

```typescript
export const designLayoutCategory: Config["categories"] = {
  designLayout: {
    // ...existing code...
    components: [
      // ...existing code...
      "myComponent"
    ],
  },
};
```

---

## Using Components in the Page Builder

- After defining and adding your component, it will be available in the Puck Editor for selection and use.
- You can drag & drop it onto the page and edit its properties.

---

## Important Notes

- Each component must define its props in a type-safe manner.
- Create a `visualExample` for each component so it can be displayed in the UI.
- Use `DropZone` to create droppable areas.
- The component name and its export key must be unique.

---

## Development & Running

1. Install dependencies:
```bash
npm install
```

2. Run the project:
```bash
npm run dev
```

3. View the project in your browser:

Default address: [http://localhost:5173](http://localhost:5173)

---

## Resources & Documentation

- [Puck Editor Documentation](https://puck-editor.com/docs)
- [React Documentation](https://react.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

---

For further guidance, refer to the project documentation or code comments.