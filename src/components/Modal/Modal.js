import React, { useEffect, useState } from 'react';
import styles from './modal.module.scss';

export const FormInput = ({value,onChange,type = 'text',placeholder = '',id,
                            label,min,max,step,minLength, maxLength}) => 
{
    return (
        <div className={styles.FormInput}>
            {label && 
            (   
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
                minLength={minLength}
                maxLength={maxLength}
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

const Modal = ({
    open,
    closeModal,
    onElementSave,
    onNewElementSave,
    selectedElement,
    initialElement,
}) => {
    const [formState, _setFormState] = useState({
        text: '',
        x: '',
        y: '',
        fontSize: '',
        fontWeight: '',
    });

    const setFormState = (name, value) => {
        _setFormState({ ...formState, [name]: value });
    };

    useEffect(() => {
        // Set initial form values
        if (initialElement) {
            _setFormState({
                text: initialElement.config.text,
                x: initialElement.config.x,
                y: initialElement.config.y,
                fontSize: initialElement.config.fontSize,
                fontWeight: initialElement.config.fontWeight,
            });
        } else if (selectedElement) {
            _setFormState({
                text: selectedElement.config.text,
                x: selectedElement.config.x,
                y: selectedElement.config.y,
                fontSize: selectedElement.config.fontSize,
                fontWeight: selectedElement.config.fontWeight,
            });
        } else {
            _setFormState({
                text: '',
                x: '',
                y: '',
                fontSize: '',
                fontWeight: '',
            });
        }
    }, [selectedElement, initialElement]);

    const handleFormSubmit = (e) => {
        e.preventDefault();
        if (selectedElement) {
            onElementSave(selectedElement.id, formState);
        } else {
            onNewElementSave(formState);
        }
    };

    const getModalTitle = () => {
        if (initialElement) {
            return `Add ${initialElement.elementType}`;
        }
        if (selectedElement) {
            return `Edit ${selectedElement.elementType}`;
        }
        return '';
    };

    return (
        <div className={`${styles.Modal} ${open ? styles.Modal__open : ''}`}>
            <div className={styles.Modal__overlay}>
                <div className={styles.Modal__content} tabIndex={-1}>
                    <div className={styles.Modal__header}>
                        <div className={styles.Modal__headerTitle}>{getModalTitle()}</div>
                        <button type="button" className={styles.Modal__headerCloseButton} onClick={closeModal}>
                            {/* <InlineIcon icon="uil:times" /> */}
                            X
                        </button>
                    </div>

                    <div className={styles.Modal__body}>
                        <form onSubmit={handleFormSubmit}>
                            <div className={styles.Modal__inputs}>
                                <FormInput
                                    id="text"
                                    label="Text"
                                    value={formState.text}
                                    onChange={(value) => setFormState('text', value)}
                                    minLength="2"
                                    maxLength="25"
                                />
                                <FormInput
                                    type="number"
                                    id="x"
                                    label="X"
                                    value={formState.x}
                                    onChange={(value) => setFormState('x', value)}
                                />
                                <FormInput
                                    type="number"
                                    id="y"
                                    label="Y"
                                    value={formState.y}
                                    onChange={(value) => setFormState('y', value)}
                                />
                                <FormInput
                                    type="number"
                                    id="fontSize"
                                    label="Font Size"
                                    value={formState.fontSize}
                                    onChange={(value) => setFormState('fontSize', value)}
                                    min={0}
                                    max={24}
                                />
                                <FormInput
                                    type="number"
                                    id="fontWeight"
                                    label="Font Weight"
                                    value={formState.fontWeight}
                                    onChange={(value) => setFormState('fontWeight', value)}
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
