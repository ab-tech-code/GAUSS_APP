// src/components/Button.js
import React from 'react';

export default function Button({
  children,
  onClick,
  type = 'button',
  variant = 'primary',
  className = '',
  ...rest
}) {
  const baseClass = 'btn';

  // Handle variants
  const variants = {
    primary: 'btn-primary',
    danger: 'btn-danger',
    outline: 'btn-outline',
    ghost: 'btn-ghost',
  };

  const variantClass = variants[variant] || variants.primary;

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${baseClass} ${variantClass} ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
}
