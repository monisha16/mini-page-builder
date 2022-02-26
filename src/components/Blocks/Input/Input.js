import React from 'react';
import styles from './input.module.scss';

const Input = ({ text, style, className, ...props }) => {
  return (
    <input type="text" value={text} className={`${styles.Input} ${className}`} style={style} onChange={()=>{}} {...props} />
  );
};

export default Input;