import React, { CSSProperties } from 'react';
import styles from './button.module.scss';

const Button = ({ text, style, className, ...props }) => {
  return (
    <button type="button" className={`${styles.Button} ${className}`} style={style} {...props}>
      {text}
    </button>
  );
};

export default Button;
