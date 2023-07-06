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
    onCreate: (item: any) => void;
    onUpdate: (item: any) => void;
    onDelete: (item: any) => void;
}

const DetailCard: React.FC<DetailCardProps> = ({ label, data, show, toggleShow, onCreate, onUpdate, onDelete }) => {
    const classes = DetailedCardStyles();
    const [openUpdate, setOpenUpdate] = useState(false);
    const [openCreate, setOpenCreate] = useState(false);
    const [currentItem, setCurrentItem] = useState<any>(null);
    const [newItem, setNewItem] = useState<any>({});

    const tableHeaders = data.length > 0 ? Object.keys(data[0]).filter(key => !['MemberTask', 'MemberResource', 'MemberIncome', 'MemberExpense', 'MemberRole'].includes(key)) : [];
    const handleClickOpenUpdate = (item: any) => {
        setCurrentItem(item);
        setOpenUpdate(true);
    };

    const handleClickOpenCreate = () => {
        setNewItem({});
        setOpenCreate(true);
    };

    const handleClose = () => {
        setOpenUpdate(false);
        setOpenCreate(false);
    };

    const handleUpdate = () => {
        onUpdate(currentItem);
        setOpenUpdate(false);
    };

    const handleCreate = () => {
        onCreate(newItem);
        setOpenCreate(false);
    };

    const handleChangeUpdate = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCurrentItem({
            ...currentItem,
            [event.target.name]: event.target.value,
        });
    };

    const handleChangeCreate = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewItem({
            ...newItem,
            [event.target.name]: event.target.value,
        });
    };


    return (
        <div className={classes.root}>
            <Button variant="contained" color="primary" onClick={toggleShow} className={classes.button}>
                Toggle {label}
            </Button>
            <Button variant="contained" color="secondary" onClick={handleClickOpenCreate} className={classes.button}>
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
                                        <Button variant="contained" color="default"
                                                onClick={() => handleClickOpenUpdate(item)} className={classes.button}>
                                            Update
                                        </Button>
                                        <Button variant="contained" color="default" onClick={() => onDelete(item)}
                                                className={classes.button}>
                                            Delete
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}
            <Dialog open={openUpdate} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Update {label}</DialogTitle>
                <DialogContent>
                    {currentItem && Object.keys(currentItem).map((key, index) => {
                        if (key !== 'object' && key !== `IncomeID`
                            && key !== `ExpenseID` && key !== `RoleID` && key !== `id`
                            && key !== `TaskID` && key !== `ResourceID`&& key !== `MemberResource`
                            && key !== `MemberTask`&& key !== `MemberIncome`&& key !== `MemberExpense`
                            && key !== `MemberRole`&& key !== `memberId`&& key !== `familyId`) {
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
                                    onChange={handleChangeUpdate}
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
            <Dialog open={openCreate} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Create {label}</DialogTitle>
                <DialogContent>
                    {tableHeaders.map((key, index) => {
                        if (key !== `IncomeID` && key !== `IncomeID`
                            && key !== `ExpenseID` && key !== `RoleID`
                            && key !== `id` && key !== `TaskID` && key !== `ResourceID`
                            && key !== `memberId` && key !== `familyId`) {
                            return (
                                <TextField
                                    key={index}
                                    autoFocus
                                    margin="dense"
                                    name={key}
                                    label={key}
                                    type="text"
                                    fullWidth
                                    value={newItem[key] || ''}
                                    onChange={handleChangeCreate}
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
                    <Button onClick={handleCreate} color="primary">
                        Create
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );

};

export default DetailCard;