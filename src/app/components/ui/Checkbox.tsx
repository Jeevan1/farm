import React from 'react';

const Checkbox = ({
  className,
  ...props
}: {
  className?: string;
  [key: string]: any;
}) => {
  return (
    <input
      type="checkbox"
      className={`h-4 w-4 rounded border-gray-300 bg-gray-50 ${className}`}
      {...props}
    />
  );
};

export default Checkbox;
