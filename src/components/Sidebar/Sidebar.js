import React, { useState, useEffect } from 'react';
import BlockItems from '../BlockItems/BlockItems';
import styles from './sidebar.module.scss';
import { DragDropContainer } from 'react-drag-drop-container';

function Sidebar() {
  const [dragging, setDragging] = useState(false);
  const [draggingItem, setDraggingItem] = useState(null);
  let config = {
    text: '',
    x: '',
    y: '',
    fontSize: '',
    fontWeight: '',
  };

  const items = [
    {
      id:'',
      type: 'Label',
      details: {...config}
    },
    {
      id: '',
      type: 'Input',
      details: { ...config }
    },
    {
      id: '',
      type: 'Button',
      details: { ...config }
    }
  ]
  
  const handleDragEnd = () => {
    setDraggingItem(null);
    setDragging(false);
  };

  const handleDragStart = (item) => {
    setDraggingItem(item);
    setDragging(true);
  };

  const isItemDragging = (item) => {
    if (dragging && draggingItem?.type === item.type) {
      return true;
    }
    return false;
  };
  return (
      <div className={styles.sidebar}>
        <h1 className={styles['sidebar__heading']}>BLOCKS</h1>
        {
          items.map((item) => {
            return(
              <DragDropContainer
              targetKey="items"
              key={item.type}
              dragElemOpacity={1}
              dragData={item}
              onDragStart={() => handleDragStart(item)}
              onDragEnd={() => handleDragEnd()}
              customDragElement={
                <div className={styles.sidebar__shadowElement}>
                  <BlockItems 
                    dragging={isItemDragging(item)}
                    item={item}
                    // className={styles.sidebar__shadowElementInner}
                     />
                </div>
              }
            >
              <BlockItems dragging={isItemDragging(item)} item={item} key={item.type} />
            </DragDropContainer>)
          })
        }
    </div>
  )
}

export default Sidebar