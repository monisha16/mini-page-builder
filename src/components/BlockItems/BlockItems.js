import React from 'react';
import styles from './blockitems.module.scss';
import { InlineIcon } from '@iconify/react';

function BlockItems(props) {
    console.log("props",props)
  return (
      
      <div className={styles.blockitems__item}>
          <div className={styles.blockitems__item__icon}>
              <InlineIcon icon="fa-solid:grip-vertical" />
          </div>
          <div className={styles.blockitems__item__name}>{props.item.type}</div>
      </div>
  )
}

export default BlockItems;