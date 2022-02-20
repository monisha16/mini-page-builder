import React, { useState, useRef, useEffect } from 'react';
import { DropTarget } from 'react-drag-drop-container';
import BlockWrapper from '../BlockWrapper/BlockWrapper';
import Label from '../Blocks/Label/Label';
import Button from '../Blocks/Button/Button';
import Input from '../Blocks/Input/Input';
import Modal from '../Modal/Modal';
import { v4 as uuidv4 } from 'uuid';
import styles from './canvas.module.scss';

function Canvas() {
  const [canvasBlocks, setCanvasBlocks] = useState([]);
  const canvasRef = useRef(null);
  const [modal, setModal] = useState(false);
  const [selectedBlock, setSelectedBlock] = useState(null);
  const [initialBlock, setInitialBlock] = useState(null);
// console.log("Canvas");
  /** get canvasBlocks details from LS */
  useEffect(() => {
    const LocalStorage = localStorage.getItem('canvasBlocks');
    if (LocalStorage) {
      setCanvasBlocks(JSON.parse(LocalStorage));
    }
  }, []);

  /** set canvasBlocks details to LS */
  useEffect(() => {
    localStorage.setItem('canvasBlocks', JSON.stringify(canvasBlocks));
  }, [canvasBlocks]);

  /** when block is dragged over canvas */
  const handleOnDragOver = (e) => {
    e.preventDefault();
  };

  /** on drop of block onto the canvas */
  const handleDrop = (e) => {
    // console.log("onDrop")
    e.preventDefault();
    setSelectedBlock(null);
    if (e.dragData) {
      setInitialBlock({
        id: uuidv4(),
        type: e.dragData.type,
        details: {
          text: e.dragData.type,
          x: e.x.toString(),
          y: e.y.toString(),
          fontSize: '',
          fontWeight: '',
        },
      });
      console.log("InitialBlock", initialBlock)
      setModal(true);
    }
  };
  
  /** deseleting the block on canvas */
  const handleCanvasOnClick = (e) => {
    if (e.target === canvasRef.current) {
      setSelectedBlock(null);
    }
  };

  /** adding new blocks to the list */
  const addCanvasBlocks = (newBlockItems) => {
    setCanvasBlocks([...canvasBlocks, newBlockItems]);
  };

  /** deleting blocks from canvas */
  const deleteCanvasBlocks = (id) => {
    setCanvasBlocks(canvasBlocks.filter((block) => block.id !== id));
  };

  /** updating the canvasBlocks data */
  const updateCanvasBlocks = (id, blockDetails) => {
    setCanvasBlocks(
      canvasBlocks.map((block) => {
        if (block.id === id) {
          return { ...block, details: blockDetails };
        }
        return block;
      }),
    );
  };

/** returns the block component */
  const getBlock = (block) => {
    console.log("BLOCK in C", block)
    const style = {
      fontSize: `${block.details.fontSize}px`,
      fontWeight: parseInt(`${block.details.fontWeight}`, 10) || 400,
    };

    switch (block.type) {
      case 'Label':
        return <Label text={block.details.text} style={style} />;
      case 'Input':
        return <Input text={block.details.text} style={style} />;
      case 'Button':
        return <Button text={block.details.text} style={style} />;
      default:
        return null;
    }
  };

  /** keyboard action of Enter and Delete */
  const handleOnKeyDown = (e) => {
    if (selectedBlock) {
      if (e.key === 'Enter') {
        setModal(true);
      } else if (e.key === 'Delete') {
        deleteCanvasBlocks(selectedBlock.id);
      }
    }
  };

  /** save modal data of already existing block */
  const onBlockSave = (id, blockDetails) => {
    updateCanvasBlocks(id, blockDetails);
    setModal(false);
    setSelectedBlock(null);
  };

  /** save data of new dropped block */
  const onNewBlockSave = (blockDetails) => {
    if (initialBlock) {
      const newBlock = {
        id: initialBlock?.id,
        type: initialBlock?.type,
        details: {
          text: blockDetails.text,
          x: blockDetails.x,
          y: blockDetails.y,
          fontSize: blockDetails.fontSize || '',
          fontWeight: blockDetails.fontWeight || '',
        },
      };
      addCanvasBlocks(newBlock);
      setInitialBlock(null);
    }
    setModal(false);
  };

  const onModalClose = () => {
    setModal(false);
    setInitialBlock(null);
    setSelectedBlock(null);
  };

  return (
    <>
    <DropTarget targetKey="items" dropData={{ foo: 'bar' }} onHit={handleDrop}>
      <div
        ref={canvasRef}
        className={styles.canvas}
        onDragOver={handleOnDragOver}
        onClick={handleCanvasOnClick}
        onKeyDown={handleOnKeyDown}
        role="button"
        tabIndex={-1}
      >
        {canvasBlocks.map((block) => {
          console.log("BLOCK in wrapper", block)
          return (
            /** Making each Block draggable through BlockWrapper */
            <BlockWrapper
              key={block.id}
              block={block}
              updateCanvasBlock={updateCanvasBlocks}
              setSelectedBlock={setSelectedBlock}
              selectedBlock={selectedBlock}
            >
              {getBlock(block)}
            </BlockWrapper>
          );
        })}
      </div>
    </DropTarget>
    { modal && <Modal
      open={modal}
      selectedBlock={selectedBlock}
      initialBlock={initialBlock}
      closeModal={onModalClose}
      onBlockSave={onBlockSave}
      onNewBlockSave={onNewBlockSave}
    />}
    </>
  )
}

export default Canvas