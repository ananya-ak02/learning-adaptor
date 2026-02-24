'use client';

import React from 'react';
import { motion } from 'framer-motion';
import styles from './Card.module.css';

const Card = ({
    children,
    className = '',
    isGlass = false,
    isInteractive = false,
    hasGlowOnHover = false,
    onClick
}) => {
    const classNames = [
        styles.card,
        isGlass ? styles.glass : '',
        isInteractive ? styles.interactive : '',
        hasGlowOnHover ? styles.glow : '',
        className
    ].filter(Boolean).join(' ');

    const CardWrapper = isInteractive || onClick ? motion.div : 'div';
    const animationProps = isInteractive || onClick ? {
        whileHover: { y: -4 },
        whileTap: { scale: 0.98 }
    } : {};

    return (
        <CardWrapper
            className={classNames}
            onClick={onClick}
            {...animationProps}
        >
            {children}
        </CardWrapper>
    );
};

export default Card;
