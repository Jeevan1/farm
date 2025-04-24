import React from 'react';

const Button = ({
  children,
  variant = 'primary',
  position = 'center',
  onClick,
  className = '',
  ...props
}: {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline';
  className?: string;
  position?: string;
  onClick?: () => void;
  [key: string]: any;
}) => {
  const baseStyles =
    'rounded-md text-md font-medium transition-colors duration-200 px-3 py-1';

  const variantStyles =
    variant === 'primary'
      ? 'bg-primary text-white hover:bg-primary/90'
      : variant === 'outline'
        ? 'border border-primary text-primary hover:bg-primary hover:text-white'
        : 'bg-muted text-foreground hover:bg-secondary/90 hover:text-white';

  return (
    <div className={`flex justify-${position}`}>
      <button
        className={`${baseStyles} ${variantStyles} ${className}`}
        onClick={onClick}
        {...props}
      >
        {children}
      </button>
    </div>
  );
};

export default Button;
