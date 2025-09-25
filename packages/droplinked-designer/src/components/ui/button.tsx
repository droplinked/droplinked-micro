import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import useThemeInfo from 'hooks/useThemeInfo';
import { cn } from 'lib/utils/cn';
import * as React from 'react';

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none font-shopfont ',
  {
    variants: {
      variant: {
        default: '',
        outline: '',
        secondary: ''
      },
      size: {
        sm: 'py-2 px-3 text-xs',
        md: 'py-[10px] px-[14px] text-sm',
        lg: 'py-3 px-4 text-lg'
      }
    },
    defaultVariants: {
      variant: 'default',
      size: 'md'
    }
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
  VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  customStyles?: string;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, iconLeft, iconRight, ...props }, ref) => {
    const { isDarkTheme } = useThemeInfo();

    const themeStyles = {
      default: isDarkTheme
        ? `bg-neutral-white text-neutral-black disabled:bg-button-disable-Dark disabled:text-text-disabled-Dark`
        : `bg-neutral-black text-neutral-white disabled:bg-button-disable-Light disabled:text-text-disabled-Light`,
      outline: isDarkTheme
        ? `border border-neutral-white text-shop-textColor disabled:border-button-disable-Dark disabled:text-text-disabled-Dark`
        : `border border-neutral-black text-black hover:bg-neutral-gray-100 disabled:border-button-disable-Light disabled:text-text-disabled-Light`,
      secondary: isDarkTheme
        ? `bg-neutral-gray-900 text-white hover:bg-neutral-gray-1000 disabled:bg-button-disable-Dark disabled:text-text-disabled-Dark`
        : `bg-neutral-gray-50 text-black hover:bg-neutral-gray-100 disabled:border-button-disable-Light disabled:text-text-disabled-Light`
    };

    const Comp = asChild ? Slot : 'button';

    return (
      <Comp
        className={cn(buttonVariants({ variant, size }), themeStyles[variant || 'default'], className)}
        ref={ref}
        {...props}
        disabled={props.disabled}
      >
        {iconLeft && <span className="flex items-center">{iconLeft}</span>}
        <span>{props.children}</span>
        {iconRight && <span className="flex items-center">{iconRight}</span>}
      </Comp>
    );
  }
);

Button.displayName = 'Button';

export { Button, buttonVariants };
