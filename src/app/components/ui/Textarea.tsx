import React from 'react';

const Textarea = ({
  className,
  type,
  ...props
}: {
  className?: string;
  type?: string;
  [key: string]: any;
}) => {
  return (
    <textarea
      className={`placeholder:text-muted-foreground focus-visible:ring-ring w-full rounded-md border border-gray-300 bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm
          ${className}`}
      rows={3}
      {...props}
    />
  );
};

export default Textarea;
