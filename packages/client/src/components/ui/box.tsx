import React from 'react';
import { cn } from '@/lib/utils';

type TAs = React.ElementType;

export interface BoxProps extends React.HTMLAttributes<HTMLDivElement> {
  as?: TAs;
}

export const Box = React.forwardRef<HTMLDivElement, BoxProps>(
  ({ as: ComposedComponent = 'div', className, ...props }, ref) => {
    return <ComposedComponent ref={ref} className={cn(className)} {...props} />;
  }
);

Box.displayName = 'Box';
