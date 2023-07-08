// DialogComponent.tsx
import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@material-ui/core';

interface DialogComponentProps {
    open: boolean;
    title: string;
    content: string;
    handleClose: () => void;
    handleConfirm: () => void;
    handleInputChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    inputLabel?: string;
    inputValue?: string;
    confirmButtonText?: string;
}

const DialogComponent: React.FC<DialogComponentProps> = ({
                                                             open,
                                                             title,
                                                             content,
                                                             handleClose,
                                                             handleConfirm,
                                                             handleInputChange,
                                                             inputLabel,
                                                             inputValue,
                                                             confirmButtonText = 'Confirm'
                                                         }) => {
    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>{title}</DialogTitle>
            <DialogContent>
                {content}
                {handleInputChange && inputLabel && (
                    <TextField
                        autoFocus
                        margin="dense"
                        label={inputLabel}
                        value={inputValue}
                        onChange={handleInputChange}
                        fullWidth
                    />
                )}
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Cancel
                </Button>
                <Button onClick={handleConfirm} color="secondary">
                    {confirmButtonText}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default DialogComponent;
