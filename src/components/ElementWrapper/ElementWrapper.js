import React, { useRef} from 'react';
import Draggable from 'react-draggable';
import styles from './elementWrapper.module.scss';

const ElementWrapper= ({
    children,
    element,
    updateBoardElement,
    setSelectedElement,
    selectedElement,
}) => {
    const elementRef = useRef(null);

    const onDragStop = (e, data) => {
        updateBoardElement(element.id, {
            ...element.config,
            x: data.x.toString(),
            y: data.y.toString(),
        });
        setSelectedElement({ ...element });
    };

    const onDrag = (e, data) => {
        updateBoardElement(element.id, {
            ...element.config,
            x: data.x.toString(),
            y: data.y.toString(),
        });
    };

    const handleOnMouseDown = (e) => {
        setSelectedElement(element);
    };

    const isSelected = () => selectedElement?.id === element.id;

    return (
        <Draggable
            nodeRef={elementRef}
            bounds="parent"
            position={{ x: parseInt(element.config.x, 10), y: parseInt(element.config.y, 10) }}
            onDrag={onDrag}
            onStop={onDragStop}
            onMouseDown={handleOnMouseDown}
        >
            <div
                ref={elementRef}
                className={`${styles.ElementWrapper} ${isSelected() ? styles.ElementWrapper__active : ''}`}
                role="button"
                tabIndex={0}
            >
                {children}
            </div>
        </Draggable>
    );
};

export default ElementWrapper;
