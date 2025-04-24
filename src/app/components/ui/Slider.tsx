import React from 'react';

const Slider = ({
  className,
  ...props
}: {
  className?: string;
  [key: string]: any;
}) => {
  return (
    <input
      type="range"
      className={`relative flex w-full touch-none items-center select-none ${className}`}
      {...props}
    />
  );
};

export default Slider;
