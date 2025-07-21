import React from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: React.ReactNode;
  fullWidth?: boolean;
  icon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  children,
  fullWidth = false,
  icon,
  className = '',
  ...props
}) => {
  const baseClasses = 'relative font-medium rounded-md inline-flex items-center justify-center transition-all duration-300 overflow-hidden group';
  
  const variantClasses = {
    primary: 'bg-gradient-to-r from-violet-600 to-blue-600 text-white shadow-lg shadow-violet-600/25 hover:shadow-violet-600/40',
    secondary: 'bg-slate-800 text-white hover:bg-slate-700',
    outline: 'bg-transparent border border-slate-700 text-slate-300 hover:border-violet-500 hover:text-white',
    ghost: 'bg-transparent text-slate-300 hover:bg-slate-800 hover:text-white'
  };
  
  const sizeClasses = {
    sm: 'text-sm py-1.5 px-3',
    md: 'text-base py-2 px-4',
    lg: 'text-lg py-2.5 px-5'
  };

  const widthClass = fullWidth ? 'w-full' : '';

  const buttonClasses = `
    ${baseClasses}
    ${variantClasses[variant]}
    ${sizeClasses[size]}
    ${widthClass}
    ${className}
  `;

  return (
    <button className={buttonClasses} {...props}>
      {variant === 'primary' && (
        <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-violet-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity" />
      )}
      <span className="relative flex items-center justify-center gap-2">
        {icon && <span>{icon}</span>}
        {children}
      </span>
    </button>
  );
};