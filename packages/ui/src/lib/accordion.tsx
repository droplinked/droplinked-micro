import React, { createContext, useContext, useState, ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../utils/cn/cn';

type AppAccordionContextType = {
  expandedItems: string[];
  toggleItem: (id: string) => void;
  multiCollapse: boolean;
  alwaysOpen: boolean;
};

type AppAccordionItemContextType = {
  isOpen: boolean;
  onToggle: () => void;
};

interface AppAccordionProps {
  children: ReactNode;
  multiCollapse?: boolean;
  alwaysOpen?: boolean;
  className?: string;
}

interface AppAccordionItemProps {
  children:
    | ReactNode
    | ((props: { isOpen: boolean; onToggle: () => void }) => ReactNode);
  defaultOpen?: boolean;
  isCollapsable?: boolean;
  itemId: string;
  className?: string;
}

interface AppAccordionTriggerProps {
  children: ReactNode;
  className?: string;
}

interface AppAccordionPanelProps {
  children: ReactNode;
  className?: string;
}

const AppAccordionContext = createContext<AppAccordionContextType | undefined>(
  undefined
);
const AppAccordionItemContext = createContext<
  AppAccordionItemContextType | undefined
>(undefined);

const useAppAccordionContext = () => {
  const context = useContext(AppAccordionContext);
  if (!context) {
    throw new Error(
      'AppAccordion components must be used within an AppAccordion'
    );
  }
  return context;
};

const useAppAccordionItemContext = () => {
  const context = useContext(AppAccordionItemContext);
  if (!context) {
    throw new Error(
      'AppAccordionItem components must be used within an AppAccordionItem'
    );
  }
  return context;
};

// Components
export const AppAccordion: React.FC<AppAccordionProps> = ({
  children,
  multiCollapse = false,
  alwaysOpen = false,
  className,
}) => {
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  const toggleItem = (id: string) => {
    setExpandedItems((prev) => {
      const isOpen = prev.includes(id);
      if (multiCollapse) {
        if (isOpen)
          return alwaysOpen && prev.length === 1
            ? prev
            : prev.filter((item) => item !== id);
        return [...prev, id];
      } else {
        return isOpen ? (alwaysOpen ? prev : []) : [id];
      }
    });
  };

  return (
    <AppAccordionContext.Provider
      value={{ expandedItems, toggleItem, multiCollapse, alwaysOpen }}
    >
      <div className={cn('w-full', className)}>{children}</div>
    </AppAccordionContext.Provider>
  );
};

export const AppAccordionItem: React.FC<AppAccordionItemProps> = ({
  children,
  defaultOpen = false,
  isCollapsable = true,
  itemId,
  className,
}) => {
  const { expandedItems, toggleItem } = useAppAccordionContext();
  const isOpen = expandedItems.includes(itemId) || defaultOpen;
  const onToggle = () => {
    if (isCollapsable) toggleItem(itemId);
  };

  return (
    <AppAccordionItemContext.Provider value={{ isOpen, onToggle }}>
      <div className={cn('w-full', className)}>
        {typeof children === 'function'
          ? children({ isOpen, onToggle })
          : children}
      </div>
    </AppAccordionItemContext.Provider>
  );
};

export const AppAccordionTrigger: React.FC<AppAccordionTriggerProps> = ({
  children,
  className,
}) => {
  const { onToggle } = useAppAccordionItemContext();
  return (
    <div
      className={cn(
        'flex w-full items-center justify-between cursor-pointer',
        className
      )}
      onClick={onToggle}
    >
      {children}
    </div>
  );
};

export const AppAccordionPanel: React.FC<AppAccordionPanelProps> = ({
  children,
  className,
}) => {
  const { isOpen } = useAppAccordionItemContext();

  return (
    <AnimatePresence initial={false}>
      {isOpen && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          className="overflow-hidden"
        >
          <div className={cn('py-2', className)}>{children}</div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export const AppAccordionChevron: React.FC<{ className?: string }> = ({
  className,
}) => {
  const { isOpen } = useAppAccordionItemContext();
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn(
        'transition-transform duration-300',
        {
          'rotate-180': isOpen,
        },
        className
      )}
    >
      <polyline points="6 9 12 15 18 9"></polyline>
    </svg>
  );
};
