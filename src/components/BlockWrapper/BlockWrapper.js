import React, { useRef, useEffect } from 'react';
import {Draggable} from 'react-draggable';
import styles from './blockwrapper.module.scss';

function BlockWrapper({children,block,updateCanvasBlock,setSelectedBlock,selectedBlock}) {
    const blockRef = useRef(null);

    useEffect(() => {
        return () => {
            setSelectedBlock(null);
        };
    },[]);

    const onDragStop = (e, data) => {
        updateCanvasBlock(block.id, {
            ...block.details,
            x: data.x.toString(),
            y: data.y.toString(),
        });
        setSelectedBlock({ ...block });
    };

    const onDrag = (e, data) => {
        updateCanvasBlock(block.id, {
            ...block.details,
            x: data.x.toString(),
            y: data.y.toString(),
        });
    };

    const handleOnMouseDown = (e) => {
        setSelectedBlock(block);
    };

    const isSelected = () => selectedBlock?.id === block.id;

    return (
        <Draggable
            nodeRef={blockRef}
            bounds="parent"
            position={{ x: parseInt(block.details.x, 10), y: parseInt(block.details.y, 10) }}
            onDrag={onDrag}
            onStop={onDragStop}
            onMouseDown={handleOnMouseDown}
        >
            <div
                ref={blockRef}
                className={`${styles.BlockWrapper} ${isSelected() ? styles.BlockWrapper__active : ''}`}
                role="button"
                tabIndex={0}
            >
                {children}
            </div>
        </Draggable>
    )
}

export default BlockWrapper