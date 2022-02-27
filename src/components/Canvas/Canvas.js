import React, { useState, useRef, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { DropTarget } from 'react-drag-drop-container';
import { Label, Input, Button } from '../Blocks';
import ElementWrapper from '../BlockWrapper/BlockWrapper';
import Modal from '../Modal/Modal';
import styles from './canvas.module.scss';

const Canvas = () => {
    const [canvasElements, setCanvasElements] = useState([]);
    const canvasRef = useRef(null);
    const [modal, setModal] = useState(false);
    const [selectedElement, setSelectedElement] = useState(null);
    const [initialElement, setInitialElement] = useState(null);

    useEffect(() => {
        const canvasElementsInLocalStorage = localStorage.getItem('Blocks');
        if (canvasElementsInLocalStorage) {
            setCanvasElements(JSON.parse(canvasElementsInLocalStorage));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('Blocks', JSON.stringify(canvasElements));
    }, [canvasElements]);

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
            setModal(true);
        }
    };

    const handleCanvasOnClick = (e) => {
        if (e.target === canvasRef.current) {
            setSelectedElement(null);
        }
    };

    const addCanvasElement = (newElement) => {
        setCanvasElements([...canvasElements, newElement]);
    };

    const deleteCanvasElement = (elementID) => {
        setCanvasElements(canvasElements.filter((element) => element.id !== elementID));
    };

    const updateCanvasElement = (elementID, elementConfig) => {
        setCanvasElements(
            canvasElements.map((element) => {
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
                setModal(true);
            } else if (e.key === 'Delete') {
                deleteCanvasElement(selectedElement.id);
            }
        }
    };

    const onElementSave = (elementID, elementConfig) => {
        updateCanvasElement(elementID, elementConfig);
        setModal(false);
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
            addCanvasElement(newElement);
            setInitialElement(null);
        }
        setModal(false);
    };

    const onModalClose = () => {
        setModal(false);
        setInitialElement(null);
        setSelectedElement(null);
    };

    return (
        <>
            <DropTarget targetKey="elements" dropData={{ foo: 'bar' }} onHit={handleOnDrop}>
                <div
                    ref={canvasRef}
                    className={styles.Canvas}
                    // onDragOver={handleOnDragOver}
                    onClick={handleCanvasOnClick}
                    onKeyDown={handleOnKeyDown}
                    role="button"
                    tabIndex={-1}
                >
                    {canvasElements.map((element) => {
                        return (
                            <ElementWrapper
                                key={element.id}
                                element={element}
                                updateCanvasElement={updateCanvasElement}
                                setSelectedElement={setSelectedElement}
                                selectedElement={selectedElement}
                            >
                                {getElementJSX(element)}
                            </ElementWrapper>
                        );
                    })}
                </div>
            </DropTarget>
            {modal && <Modal
                open={modal}
                selectedElement={selectedElement}
                initialElement={initialElement}
                closeModal={onModalClose}
                onElementSave={onElementSave}
                onNewElementSave={onNewElementSave}
            />}
        </>
    );
};

export default Canvas;
