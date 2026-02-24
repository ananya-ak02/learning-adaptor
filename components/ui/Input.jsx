import React from 'react';
import styles from './Input.module.css';

const Input = React.forwardRef(({
    label,
    icon: Icon,
    className = '',
    wrapperClassName = '',
    ...props
}, ref) => {
    return (
        <div className={`${styles.inputWrapper} ${wrapperClassName}`}>
            {label && <label className={styles.label}>{label}</label>}
            <div className={styles.inputContainer}>
                {Icon && (
                    <div className={styles.iconWrapper}>
                        <Icon size={18} />
                    </div>
                )}
                <input
                    ref={ref}
                    className={`${styles.input} ${Icon ? styles.hasIcon : ''} ${className}`}
                    {...props}
                />
            </div>
        </div>
    );
});

Input.displayName = 'Input';

export default Input;
