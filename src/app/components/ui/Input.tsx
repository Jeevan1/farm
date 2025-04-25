import React from 'react';

const Input = ({
  className,
  type,
  ...props
}: {
  className?: string;
  type?: string;
  [key: string]: any;
}) => {
  return (
    <input
      type={type}
      className={`placeholder:text-muted-foreground focus-visible:ring-ring md:text-sm", flex h-10 w-full rounded-md border-2 border-gray-300 bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-sm focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50
          ${className}`}
      {...props}
    />
  );
};

export default Input;
