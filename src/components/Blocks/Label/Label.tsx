import React, { CSSProperties } from 'react';
import styles from './label.module.scss';

export const Label = ({ text, style, className, ...props }) => {
  return (
    <label className={`${styles.Label} ${className}`} style={style} {...props}>
      {text}
    </label>
  );
};
