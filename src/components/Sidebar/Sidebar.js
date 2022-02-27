import React from 'react';
import { DragDropContainer } from 'react-drag-drop-container';
import BlockItem from '../BlockItem/BlockItem';
import styles from './sidebar.module.scss';

const config = {
  text: '',
  x: '',
  y: '',
  fontSize: '',
  fontWeight: '',
};

const items= [
  {
    id: '',
    type: 'Label',
    config: { ...config },
  },
  {
    id: '',
    type: 'Input',
    config: { ...config },
  },
  {
    id: '',
    type: 'Button',
    config: { ...config },
  },
];

const Sidebar = () => {
    return (
        <div className={styles.Sidebar}>
          <div className={styles.Sidebar__header}>BLOCKS</div>
          <div className={styles.BlockItem}>
          {items.map((element) => (
            <DragDropContainer
              targetKey="items"
              key={element.type}
              dragElemOpacity={1}
              dragData={element}
              customDragElement={
                <div className={styles.BlockItem__shadowElement}>
                  <BlockItem
                    name={element.type}
                    className={styles.BlockItem__shadowElementInner}
                    isShadowElement
                  />
                </div>
              }
            >
              <Block name={element.type} /> 
            </DragDropContainer>
          ))}
          </div>
        </div>
    );
};

export default Sidebar;