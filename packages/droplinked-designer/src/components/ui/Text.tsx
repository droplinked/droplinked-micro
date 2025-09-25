import { cn } from 'lib/utils/cn';
import { ElementType, HTMLAttributes } from 'react';

interface TextProps extends HTMLAttributes<HTMLElement> {
  as?: ElementType;
  color?: string;
}

/**
 * A versatile text component that can be rendered as any HTML element
 * 
 * @param as - The HTML element to render the text as (defaults to 'p')
 * @param className - Additional CSS classes to apply
 * @param children - The content to display
 * @param rest - Additional HTML attributes to apply to the element
 * @returns A text element with consistent styling and proper text color
 */
export default function Text({ as: Component = 'p', className = '', children, ...rest }: TextProps) {
  return (
    // FIXME: there is a bug with the tailwind dynamic classnames in the Puck editor
    <Component className={cn('font-shopfont text-shop-textColor', className)} {...rest}>
      {children}
    </Component>
  );
}
