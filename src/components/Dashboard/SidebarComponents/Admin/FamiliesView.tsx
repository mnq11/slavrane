import React from 'react';
import { Family } from "../../../../hooks/useMember";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TableSortLabel, Box } from '@material-ui/core';
import { FamiliesViewStyles } from './AdminPanel.Styles';
interface FamiliesViewProps {
    families: Family[];
    selectedFamilyId: number | null;
    onSelectFamily: (family: Family) => void;
}

const FamiliesView: React.FC<FamiliesViewProps> = ({ families, selectedFamilyId, onSelectFamily }) => {
    const classes = FamiliesViewStyles();

    return (
        <Box mt={2}>
            <TableContainer component={Paper} className={classes.table}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>
                                <TableSortLabel>ID</TableSortLabel>
                            </TableCell>
                            <TableCell>
                                <TableSortLabel>Name</TableSortLabel>
                            </TableCell>
                            <TableCell>
                                <TableSortLabel>Address</TableSortLabel>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {families.map((family) => (
                            (!selectedFamilyId || selectedFamilyId === family.FamilyID) && (
                                <TableRow key={family.FamilyID} onClick={() => onSelectFamily(family)} className={classes.row}>
                                    <TableCell>{family.FamilyID}</TableCell>
                                    <TableCell>{family.FamilyName}</TableCell>
                                    <TableCell>{family.Address}</TableCell>
                                </TableRow>
                            )
                        ))}


                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
};
export default FamiliesView;
