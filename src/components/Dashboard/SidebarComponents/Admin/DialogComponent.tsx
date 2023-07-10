// DialogComponent.tsx

import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@material-ui/core';
import {DialogComponentStyles} from "./Family/AdminFamily.Styles";

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
                                                             confirmButtonText = 'Confirm',
                                                         }) => {
    const classes = DialogComponentStyles();

    return (
        <Dialog open={open} onClose={handleClose} className={classes.dialog}>
            <DialogTitle className={classes.title}>{title}</DialogTitle>
            <DialogContent className={classes.content}>
                <p>{content}</p>
                {handleInputChange && inputLabel && (
                    <TextField
                        autoFocus
                        margin="dense"
                        label={inputLabel}
                        value={inputValue}
                        onChange={handleInputChange}
                        fullWidth
                        className={classes.textField}
                    />
                )}
            </DialogContent>
            <DialogActions className={classes.actions}>
                <Button onClick={handleClose} color="primary" className={classes.cancelButton}>
                    Cancel
                </Button>
                <Button onClick={handleConfirm} color="secondary" className={classes.confirmButton}>
                    {confirmButtonText}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default DialogComponent;
