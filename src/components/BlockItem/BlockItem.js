import React from 'react';
import grip from '../../styles/icons/grip-vertical.svg'
import styles from './blockitem.module.scss';

const BlockItem = ({ name, dragging = false, className = '', isShadowElement = false }) => {
    const getCustomClassNames = () => {
        if (isShadowElement) {
            return styles.BlockItem__shadow;
        }
        if (dragging) {
            return styles.BlockItem__dragging;
        }
        return '';
    };

    return (
        <div className={`${styles.BlockItem} ${getCustomClassNames()} ${className}`}>
            <img className={styles.BlockItem__icon} src={grip} alt="grip-icon" />
            <div className={styles.BlockItem__name}>{name}</div>
        </div>
    );
};

export default BlockItem;
