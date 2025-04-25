import React from 'react';

type ButtonProps = {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline';
  position?: 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly';
  className?: string;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  [key: string]: any;
};

const Button = ({
  children,
  variant = 'primary',
  position = 'center',
  onClick,
  className = '',
  type = 'button',
  ...props
}: ButtonProps) => {
  const baseStyles =
    'rounded-md text-md font-medium transition-colors duration-100 px-3 py-1';

  const variantStyles =
    variant === 'primary'
      ? 'bg-primary text-white hover:bg-secondary/90'
      : variant === 'outline'
        ? 'border border-primary text-primary hover:bg-primary hover:text-white'
        : 'bg-muted text-foreground hover:bg-secondary/90 hover:text-white';

  return (
    <div className={`flex justify-${position}`}>
      <button
        type={type}
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
