import React from 'react';
import { DragDropContainer } from 'react-drag-drop-container';
import ElementItem from '../ElementItem/ElementItem';
import styles from './sidebar.module.scss';

const config = {
  text: '',
  x: '',
  y: '',
  fontSize: '',
  fontWeight: '',
};

const elements= [
  {
    id: '',
    elementType: 'Label',
    config: { ...config },
  },
  {
    id: '',
    elementType: 'Input',
    config: { ...config },
  },
  {
    id: '',
    elementType: 'Button',
    config: { ...config },
  },
];

const Sidebar = () => {
    return (
        <div className={styles.Sidebar}>
          <div className={styles.Sidebar__header}>BLOCKS</div>
          <div className={styles.ElementList}>
          {elements.map((element) => (
            <DragDropContainer
              targetKey="elements"
              key={element.elementType}
              dragElemOpacity={1}
              dragData={element}
              customDragElement={
                <div className={styles.ElementList__shadowElement}>
                  <ElementItem
                    name={element.elementType}
                    className={styles.ElementList__shadowElementInner}
                    isShadowElement
                  />
                </div>
              }
            >
              <ElementItem name={element.elementType} /> 
            </DragDropContainer>
          ))}
          </div>
        </div>
    );
};

export default Sidebar;