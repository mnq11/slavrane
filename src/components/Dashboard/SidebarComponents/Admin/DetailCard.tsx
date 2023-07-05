// DetailCard.tsx
import React, {useState} from 'react';
import {DetailedCardStyles} from "./AdminPanel.Styles";
import Button from "@material-ui/core/Button";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    DialogActions,
    DialogContent,
    Dialog, DialogTitle, TextField
} from "@material-ui/core";

interface DetailCardProps {
    label: string;
    data: any[];
    show: boolean;
    toggleShow: () => void;
    onCreate: () => void;
    onUpdate: (item: any) => void;
    onDelete: (item: any) => void;
}

const DetailCard: React.FC<DetailCardProps> = ({ label, data, show, toggleShow, onCreate, onUpdate, onDelete }) => {
    const classes = DetailedCardStyles();
    const [open, setOpen] = useState(false);
    const [currentItem, setCurrentItem] = useState<any>(null);

    const tableHeaders = data.length > 0 ? Object.keys(data[0]).filter(key => !['MemberTask', 'MemberResource', 'MemberIncome', 'MemberExpense', 'MemberRole'].includes(key)) : [];
    const handleClickOpen = (item: any) => {
        setCurrentItem(item);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleUpdate = () => {
        onUpdate(currentItem);
        setOpen(false);
    };
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCurrentItem({
            ...currentItem,
            [event.target.name]: event.target.value,
        });
    };

    return (
        <div className={classes.root}>
            <Button variant="contained" color="primary" onClick={toggleShow} className={classes.button}>
                Toggle {label}
            </Button>
            <Button variant="contained" color="secondary" onClick={onCreate} className={classes.button}>
                Create {label}
            </Button>
            {show && (
                <TableContainer component={Paper}>
                    <Table className={classes.table} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                {tableHeaders.map((header, index) => (
                                    <TableCell key={index}>{header}</TableCell>
                                ))}
                                <TableCell align="right">Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data.map((item, index) => (
                                <TableRow key={index}>
                                    {tableHeaders.map((header, index) => (
                                        <TableCell key={index} component="th" scope="row">
                                            {typeof item[header] === 'object' ? JSON.stringify(item[header]) : item[header]}
                                        </TableCell>
                                    ))}
                                    <TableCell align="right">
                                        <Button variant="contained" color="default" onClick={() => handleClickOpen(item)} className={classes.button}>
                                            Update
                                        </Button>
                                        <Button variant="contained" color="default" onClick={() => onDelete(item)} className={classes.button}>
                                            Delete
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Update {label}</DialogTitle>
                <DialogContent>
                    {currentItem && Object.keys(currentItem).map((key, index) => {
                        if (typeof currentItem[key] !== 'object' && key !== `${label}ID`) {
                            return (
                                <TextField
                                    key={index}
                                    autoFocus
                                    margin="dense"
                                    name={key}
                                    label={key}
                                    type="text"
                                    fullWidth
                                    value={currentItem[key]}
                                    onChange={handleChange}
                                />
                            );
                        }
                        return null;
                    })}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleUpdate} color="primary">
                        Update
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );

};

export default DetailCard;
