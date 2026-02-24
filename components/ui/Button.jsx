'use client';

import React from 'react';
import { motion } from 'framer-motion';
import styles from './Button.module.css';

const Button = React.forwardRef(({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  className = '', 
  isLoading = false,
  icon: Icon,
  ...props 
}, ref) => {
  
  const classNames = [
    styles.btn,
    styles[variant],
    styles[size],
    className
  ].filter(Boolean).join(' ');

  return (
    <motion.button
      ref={ref}
      className={classNames}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      disabled={isLoading || props.disabled}
      {...props}
    >
      {isLoading ? (
        <span className={styles.spinnerWrapper}>
          <span className={styles.spinner} />
        </span>
      ) : Icon && (
         <Icon size={size === 'sm' ? 16 : size === 'lg' ? 24 : 20} />
      )}
      
      {children && <span>{children}</span>}
    </motion.button>
  );
});

Button.displayName = 'Button';

export default Button;
