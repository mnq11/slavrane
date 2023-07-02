// FamiliesView.tsx
import React from 'react';
import { Family } from "../../../../hooks/useMember";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@material-ui/core';

interface FamiliesViewProps {
    families: Family[];
    onSelectFamily: (family: Family) => void;
}

const FamiliesView: React.FC<FamiliesViewProps> = ({ families, onSelectFamily }) => {
    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell>Name</TableCell>
                        <TableCell>Address</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {families.map((family) => (
                        <TableRow key={family.FamilyID} onClick={() => onSelectFamily(family)}>
                            <TableCell>{family.FamilyID}</TableCell>
                            <TableCell>{family.FamilyName}</TableCell>
                            <TableCell>{family.Address}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default FamiliesView;