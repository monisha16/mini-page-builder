import React, { CSSProperties } from 'react';
import styles from './input.module.scss';

export const Input = ({ text, style, className, ...props }) => {
  return (
    <input type="text" value={text} className={`${styles.Input} ${className}`} style={style} readOnly {...props} />
  );
};

