import React from 'react';
import styles from './label.module.scss';

const Label = ({ text, style, className, ...props }) => {
  return (
    <label className={`${styles.Label} ${className}`} style={style} {...props}>
      {text}
    </label>
  );
};

export default Label;