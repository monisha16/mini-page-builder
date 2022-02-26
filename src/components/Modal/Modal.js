import { InlineIcon } from '@iconify/react';
import React, { useEffect, useState } from 'react';
import styles from './modal.module.scss';

export const FormInput = ({value,onChange,type = 'text',placeholder = '',id,
                            label,min,max,step,}) => 
{
    return (
        <div className={styles.FormInput}>
            {label && (
                <label className={styles.FormInput__label} htmlFor={id}>
                    {label}
                </label>
            )}
            <input
                className={styles.FormInput__input}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
                type={type}
                id={id}
                step={step}
                min={min}
                max={max}
                required
            />
        </div>
    );
};

export const FormButton = ({ style, text }) => {
    return (
        <button type="submit" className={styles.FormButton} style={style}>
            {text}
        </button>
    );
};

const Modal = ({open,closeModal,onBlockSave,onNewBlockSave,selectedBlock,initialBlock,}) => {
    console.log("Inside Modal component", selectedBlock);
    const [formState, setFormState] = useState({
        text: '',
        x: '',
        y: '',
        fontSize: '',
        fontWeight: '',
    });

    const setFormData = (name, value) => {
        setFormState({ ...formState, [name]: value });
    };

    useEffect(() => {
        // Set initial form values
        if (initialBlock) {
            setFormState({
                text: initialBlock.details.text,
                x: initialBlock.details.x,
                y: initialBlock.details.y,
                fontSize: initialBlock.details.fontSize,
                fontWeight: initialBlock.details.fontWeight,
            });
        } else if (selectedBlock) {
            setFormState({
                text: selectedBlock.details.text,
                x: selectedBlock.details.x,
                y: selectedBlock.details.y,
                fontSize: selectedBlock.details.fontSize,
                fontWeight: selectedBlock.details.fontWeight,
            });
        } else {
            setFormState({
                text: '',
                x: '',
                y: '',
                fontSize: '',
                fontWeight: '',
            });
        }
    }, [selectedBlock, initialBlock]);

    const handleFormSubmit = (e) => {
        
        e.preventDefault();
        if (selectedBlock) {
            console.log("handleFormSubmit-SB", e)
            onBlockSave(selectedBlock.id, formState);
        } else {
            console.log("handleFormSubmit", e)
            onNewBlockSave(formState);
        }
    };

    const getModalTitle = () => {
        if (initialBlock) {
            return `Add ${initialBlock.type}`;
        }
        if (selectedBlock) {
            return `Edit ${selectedBlock.type}`;
        }
        return '';
    };

    return (
        <div className={`${styles.Modal} ${open ? styles.Modal__open : ''}`}>
            <div className={styles.Modal__overlay}>
                <div className={styles.Modal__content} tabIndex={-1}>
                    <div className={styles.Modal__header}>
                        <div className={styles.Modal__header__Title}>{getModalTitle()}</div>
                        <button type="button" className={styles.Modal__header__CloseButton} onClick={closeModal}>
                            <InlineIcon icon="uil:times" />
                        </button>
                    </div>

                    <div className={styles.Modal__body}>
                        <form onSubmit={handleFormSubmit}>
                            <div className={styles.Modal__inputs}>
                                <FormInput
                                    id="text"
                                    label="Text"
                                    value={formState.text}
                                    onChange={(value) => setFormData('text', value)}
                                />
                                <FormInput
                                    type="number"
                                    id="x"
                                    label="X"
                                    value={formState.x}
                                    onChange={(value) => setFormData('x', value)}
                                />
                                <FormInput
                                    type="number"
                                    id="y"
                                    label="Y"
                                    value={formState.y}
                                    onChange={(value) => setFormData('y', value)}
                                />
                                <FormInput
                                    type="number"
                                    id="fontSize"
                                    label="Font Size"
                                    value={formState.fontSize}
                                    onChange={(value) => setFormData('fontSize', value)}
                                    min={0}
                                />
                                <FormInput
                                    type="number"
                                    id="fontWeight"
                                    label="Font Weight"
                                    value={formState.fontWeight}
                                    onChange={(value) => setFormData('fontWeight', value)}
                                    step={100}
                                    min={100}
                                    max={900}
                                />
                            </div>
                            <div className={styles.Modal__actionButtons}>
                                <FormButton text="Save Changes" />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Modal;
