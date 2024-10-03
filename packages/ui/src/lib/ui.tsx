import React, { createContext, useContext, useState, ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from "./../utils/cn/cn"

// Types
type AccordionContextType = {
  expandedItems: string[];
  toggleItem: (id: string) => void;
  multiCollapse: boolean;
  alwaysOpen: boolean;
};

type AccordionItemContextType = {
  isOpen: boolean;
  onToggle: () => void;
};

interface AccordionProps {
  children: ReactNode;
  multiCollapse?: boolean;
  alwaysOpen?: boolean;
  className?: string;
}

interface AccordionItemProps {
  children:
    | ReactNode
    | ((props: { isOpen: boolean; onToggle: () => void }) => ReactNode);
  defaultOpen?: boolean;
  isCollapsable?: boolean;
  itemId: string;
  className?: string;
}

interface AccordionTriggerProps {
  children: ReactNode;
  className?: string;
}

interface AccordionPanelProps {
  children: ReactNode;
  className?: string;
}

// Contexts
const AccordionContext = createContext<AccordionContextType | undefined>(
  undefined
);
const AccordionItemContext = createContext<
  AccordionItemContextType | undefined
>(undefined);

// Hooks
const useAccordionContext = () => {
  const context = useContext(AccordionContext);
  if (!context) {
    throw new Error('Accordion components must be used within an Accordion');
  }
  return context;
};

const useAccordionItemContext = () => {
  const context = useContext(AccordionItemContext);
  if (!context) {
    throw new Error(
      'AccordionItem components must be used within an AccordionItem'
    );
  }
  return context;
};

// Components
export const Accordion: React.FC<AccordionProps> = ({
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
    <AccordionContext.Provider
      value={{ expandedItems, toggleItem, multiCollapse, alwaysOpen }}
    >
      <div className={cn('w-full', className)}>{children}</div>
    </AccordionContext.Provider>
  );
};

export const AccordionItem: React.FC<AccordionItemProps> = ({
  children,
  defaultOpen = false,
  isCollapsable = true,
  itemId,
  className,
}) => {
  const { expandedItems, toggleItem } = useAccordionContext();
  const isOpen = expandedItems.includes(itemId) || defaultOpen;
  const onToggle = () => {
    if (isCollapsable) toggleItem(itemId);
  };

  return (
    <AccordionItemContext.Provider value={{ isOpen, onToggle }}>
      <div className={cn('w-full', className)}>
        {typeof children === 'function'
          ? children({ isOpen, onToggle })
          : children}
      </div>
    </AccordionItemContext.Provider>
  );
};

export const AccordionTrigger: React.FC<AccordionTriggerProps> = ({
  children,
  className,
}) => {
  const { onToggle } = useAccordionItemContext();
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

export const AccordionPanel: React.FC<AccordionPanelProps> = ({
  children,
  className,
}) => {
  const { isOpen } = useAccordionItemContext();

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

export const AccordionChevron: React.FC<{ className?: string }> = ({
  className,
}) => {
  const { isOpen } = useAccordionItemContext();
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

// Example usage
export const ExampleAccordion: React.FC = () => {
  return (
    <Accordion multiCollapse alwaysOpen={false} className="space-y-2">
      <AccordionItem itemId="1" className="border rounded-md">
        <AccordionTrigger className="p-4">
          <span>Item 1</span>
          <AccordionChevron />
        </AccordionTrigger>
        <AccordionPanel className="px-4 pb-4">
          <p>Content for Item 1</p>
        </AccordionPanel>
      </AccordionItem>
      <AccordionItem itemId="2" className="border rounded-md">
        <AccordionTrigger className="p-4">
          <span>Item 2</span>
          <AccordionChevron />
        </AccordionTrigger>
        <AccordionPanel className="px-4 pb-4">
          <p>Content for Item 2</p>
        </AccordionPanel>
      </AccordionItem>
      <AccordionItem itemId="3" className="border rounded-md">
        <AccordionTrigger className="p-4">
          <span>Item 3</span>
          <AccordionChevron />
        </AccordionTrigger>
        <AccordionPanel className="px-4 pb-4">
          <p>Content for Item 3</p>
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
};
