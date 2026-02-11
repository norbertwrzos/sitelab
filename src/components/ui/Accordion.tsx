'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { ChevronDown } from 'lucide-react';

// Accordion Context
type AccordionContextValue = {
  value: string | string[] | undefined;
  onValueChange: (value: string) => void;
  type: 'single' | 'multiple';
  collapsible?: boolean;
};

const AccordionContext = React.createContext<AccordionContextValue | undefined>(
  undefined
);

function useAccordion() {
  const context = React.useContext(AccordionContext);
  if (!context) {
    throw new Error('Accordion components must be used within an Accordion');
  }
  return context;
}

// Accordion Item Context
type AccordionItemContextValue = {
  value: string;
  isOpen: boolean;
};

const AccordionItemContext = React.createContext<
  AccordionItemContextValue | undefined
>(undefined);

function useAccordionItem() {
  const context = React.useContext(AccordionItemContext);
  if (!context) {
    throw new Error(
      'AccordionItem components must be used within an AccordionItem'
    );
  }
  return context;
}

// Accordion Root
interface AccordionSingleProps {
  type: 'single';
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  collapsible?: boolean;
  children: React.ReactNode;
  className?: string;
}

interface AccordionMultipleProps {
  type: 'multiple';
  value?: string[];
  defaultValue?: string[];
  onValueChange?: (value: string[]) => void;
  children: React.ReactNode;
  className?: string;
}

type AccordionProps = AccordionSingleProps | AccordionMultipleProps;

const Accordion = React.forwardRef<HTMLDivElement, AccordionProps>(
  (props, ref) => {
    const { type, children, className, ...rest } = props;

    const [internalValue, setInternalValue] = React.useState<string | string[]>(
      () => {
        if (type === 'single') {
          return (rest as AccordionSingleProps).defaultValue || '';
        }
        return (rest as AccordionMultipleProps).defaultValue || [];
      }
    );

    const value =
      type === 'single'
        ? (rest as AccordionSingleProps).value ?? internalValue
        : (rest as AccordionMultipleProps).value ?? internalValue;

    const handleValueChange = (itemValue: string) => {
      if (type === 'single') {
        const singleProps = rest as AccordionSingleProps;
        const newValue =
          value === itemValue && singleProps.collapsible ? '' : itemValue;
        setInternalValue(newValue);
        singleProps.onValueChange?.(newValue as string);
      } else {
        const multipleProps = rest as AccordionMultipleProps;
        const currentValue = value as string[];
        const newValue = currentValue.includes(itemValue)
          ? currentValue.filter((v) => v !== itemValue)
          : [...currentValue, itemValue];
        setInternalValue(newValue);
        multipleProps.onValueChange?.(newValue);
      }
    };

    return (
      <AccordionContext.Provider
        value={{
          value,
          onValueChange: handleValueChange,
          type,
          collapsible: type === 'single' ? (rest as AccordionSingleProps).collapsible : undefined,
        }}
      >
        <div ref={ref} className={className} {...rest}>
          {children}
        </div>
      </AccordionContext.Provider>
    );
  }
);

Accordion.displayName = 'Accordion';

// Accordion Item
interface AccordionItemProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string;
}

const AccordionItem = React.forwardRef<HTMLDivElement, AccordionItemProps>(
  ({ className, value, children, ...props }, ref) => {
    const { value: accordionValue, type } = useAccordion();

    const isOpen =
      type === 'single'
        ? accordionValue === value
        : (accordionValue as string[]).includes(value);

    return (
      <AccordionItemContext.Provider value={{ value, isOpen }}>
        <div
          ref={ref}
          data-state={isOpen ? 'open' : 'closed'}
          className={cn('border-b', className)}
          {...props}
        >
          {children}
        </div>
      </AccordionItemContext.Provider>
    );
  }
);

AccordionItem.displayName = 'AccordionItem';

// Accordion Trigger
interface AccordionTriggerProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

const AccordionTrigger = React.forwardRef<
  HTMLButtonElement,
  AccordionTriggerProps
>(({ className, children, ...props }, ref) => {
  const { onValueChange } = useAccordion();
  const { value, isOpen } = useAccordionItem();

  return (
    <button
      ref={ref}
      type="button"
      onClick={() => onValueChange(value)}
      aria-expanded={isOpen}
      className={cn(
        'flex w-full items-center justify-between py-4 font-medium transition-all hover:underline [&[data-state=open]>svg]:rotate-180',
        className
      )}
      data-state={isOpen ? 'open' : 'closed'}
      {...props}
    >
      {children}
      <ChevronDown className="h-5 w-5 shrink-0 text-slate-500 transition-transform duration-200" />
    </button>
  );
});

AccordionTrigger.displayName = 'AccordionTrigger';

// Accordion Content
interface AccordionContentProps extends React.HTMLAttributes<HTMLDivElement> {}

const AccordionContent = React.forwardRef<HTMLDivElement, AccordionContentProps>(
  ({ className, children, ...props }, ref) => {
    const { isOpen } = useAccordionItem();

    return (
      <div
        ref={ref}
        data-state={isOpen ? 'open' : 'closed'}
        className={cn(
          'overflow-hidden text-sm transition-all',
          isOpen ? 'animate-accordion-down' : 'animate-accordion-up hidden',
          className
        )}
        {...props}
      >
        <div className="pb-4 pt-0">{children}</div>
      </div>
    );
  }
);

AccordionContent.displayName = 'AccordionContent';

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
