import React from 'react';
import grip from '../../styles/icons/grip-vertical.svg'
import styles from './elementItem.module.scss';

const ElementItem = ({ name, dragging = false, className = '', isShadowElement = false }) => {
  const getCustomClassNames = () => {
    if (isShadowElement) {
      return styles.ElementItem__shadow;
    }
    if (dragging) {
      return styles.ElementItem__dragging;
    }
    return '';
  };

  return (
    <div className={`${styles.ElementItem} ${getCustomClassNames()} ${className}`}>
        <img className={styles.ElementItem__icon} src={grip} alt="grip-icon" />
      <div className={styles.ElementItem__name}>{name}</div>
    </div>
  );
};

export default ElementItem;
