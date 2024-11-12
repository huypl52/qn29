import React, { HTMLProps } from 'react';

const Card = React.forwardRef<HTMLDivElement, HTMLProps<HTMLDivElement>>(
  ({ ...props }, ref) => (
    <div
      ref={ref}
      // className="rounded-lg border border-gray-200 bg-white text-gray-950 shadow-sm dark:border-gray-800 dark:bg-gray-950 dark:text-gray-50"
      className="rounded-lg border border-gray-200 bg-white text-gray-950 shadow-sm dark:border-gray-800 dark:bg-gray-950 dark:text-gray-50"
      {...props}
    />
  )
);
Card.displayName = 'Card';

const CardHeader = React.forwardRef<HTMLDivElement, HTMLProps<HTMLDivElement>>(
  ({ ...props }, ref) => (
    <div ref={ref} className={'flex flex-col space-y-1.5 p-6'} {...props} />
  )
);
CardHeader.displayName = 'CardHeader';

const CardTitle = React.forwardRef<HTMLDivElement, HTMLProps<HTMLDivElement>>(
  ({ ...props }, ref) => (
    <h3
      ref={ref}
      className={'text-2xl font-semibold leading-none tracking-tight'}
      {...props}
    />
  )
);
CardTitle.displayName = 'CardTitle';

const CardDescription = React.forwardRef<
  HTMLDivElement,
  HTMLProps<HTMLDivElement>
>(({ ...props }, ref) => (
  <p
    ref={ref}
    className={'text-sm text-gray-500 dark:text-gray-400'}
    {...props}
  />
));
CardDescription.displayName = 'CardDescription';

const CardContent = React.forwardRef<HTMLDivElement, HTMLProps<HTMLDivElement>>(
  ({ ...props }, ref) => <div ref={ref} className={'p-6 pt-0'} {...props} />
);
CardContent.displayName = 'CardContent';

const CardFooter = React.forwardRef<HTMLDivElement, HTMLProps<HTMLDivElement>>(
  ({ ...props }, ref) => (
    <div ref={ref} className={'flex items-center p-6 pt-0'} {...props} />
  )
);
CardFooter.displayName = 'CardFooter';

export {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
};
