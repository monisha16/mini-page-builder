import React, { useState, useRef, useEffect} from 'react';
import { v4 as uuidv4 } from 'uuid';
import { DropTarget } from 'react-drag-drop-container';
import { Label, Input, Button } from '../Elements';
import ElementWrapper from '../ElementWrapper/ElementWrapper';
import Modal from '../Modal/Modal';
import styles from './board.module.scss';

const Board = () => {
  const [boardElements, setBoardElements] = useState([]);
  const boardRef = useRef(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedElement, setSelectedElement] = useState(null);
  const [initialElement, setInitialElement] = useState(null);

  useEffect(() => {
    const boardElementsInLocalStorage = localStorage.getItem('Blocks');
    if (boardElementsInLocalStorage) {
      setBoardElements(JSON.parse(boardElementsInLocalStorage));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('Blocks', JSON.stringify(boardElements));
  }, [boardElements]);

  const handleOnDrop = (e) => {
    e.preventDefault();
    setSelectedElement(null);
    if (e.dragData) {
      setInitialElement({
        id: uuidv4(),
        elementType: e.dragData.elementType,
        config: {
          text: e.dragData.elementType,
          x: e.x.toString(),
          y: e.y.toString(),
          fontSize: '',
          fontWeight: '',
        },
      });
      setModalOpen(true);
    }
  };

  const handleBoardOnClick = (e) => {
    if (e.target === boardRef.current) {
      setSelectedElement(null);
    }
  };

  const addBoardElement = (newElement) => {
    setBoardElements([...boardElements, newElement]);
  };

  const deleteBoardElement = (elementID) => {
    setBoardElements(boardElements.filter((element) => element.id !== elementID));
  };

  const updateBoardElement = (elementID, elementConfig) => {
    setBoardElements(
      boardElements.map((element) => {
        if (element.id === elementID) {
          return { ...element, config: elementConfig };
        }
        return element;
      }),
    );
  };

  const getElementJSX = (element) => {
    const style = {
      fontSize: `${element.config.fontSize}px`,
      fontWeight: parseInt(`${element.config.fontWeight}`, 10) || 400,
    };

    switch (element.elementType) {
      case 'Label':
        return <Label text={element.config.text} style={style} />;
      case 'Input':
        return <Input text={element.config.text} style={style} />;
      case 'Button':
        return <Button text={element.config.text} style={style} />;
      default:
        return null;
    }
  };

  const handleOnKeyDown = (e) => {
    if (selectedElement) {
      if (e.key === 'Enter') {
        setModalOpen(true);
      } else if (e.key === 'Delete') {
        deleteBoardElement(selectedElement.id);
      }
    }
  };

  const onElementSave = (elementID, elementConfig) => {
    updateBoardElement(elementID, elementConfig);
    setModalOpen(false);
    setSelectedElement(null);
  };

  const onNewElementSave = (elementConfig) => {
    if (initialElement) {
      const newElement = {
        id: initialElement?.id,
        elementType: initialElement?.elementType,
        config: {
          text: elementConfig.text,
          x: elementConfig.x,
          y: elementConfig.y,
          fontSize: elementConfig.fontSize || '',
          fontWeight: elementConfig.fontWeight || '',
        },
      };
      addBoardElement(newElement);
      setInitialElement(null);
    }
    setModalOpen(false);
  };

  const onModalClose = () => {
    setModalOpen(false);
    setInitialElement(null);
    setSelectedElement(null);
  };

  return (
    <>
      <DropTarget targetKey="elements" dropData={{ foo: 'bar' }} onHit={handleOnDrop}>
        <div
          ref={boardRef}
          className={styles.Board}
          // onDragOver={handleOnDragOver}
          onClick={handleBoardOnClick}
          onKeyDown={handleOnKeyDown}
          role="button"
          tabIndex={-1}
        >
          {boardElements.map((element) => {
            return (
              <ElementWrapper
                key={element.id}
                element={element}
                updateBoardElement={updateBoardElement}
                setSelectedElement={setSelectedElement}
                selectedElement={selectedElement}
              >
                {getElementJSX(element)}
              </ElementWrapper>
            );
          })}
        </div>
      </DropTarget>
      {modalOpen && <Modal
        open={modalOpen}
        selectedElement={selectedElement}
        initialElement={initialElement}
        closeModal={onModalClose}
        onElementSave={onElementSave}
        onNewElementSave={onNewElementSave}
      />}
    </>
  );
};

export default Board;
