import React, { ReactNode } from 'react';

interface ButtonProps {
  children: ReactNode; // This allows any kind of children
}

const Button: React.FC<ButtonProps> = ({ children }) => {
  return (
    <button>
      {children}
    </button>
  );
};

export default Button;
