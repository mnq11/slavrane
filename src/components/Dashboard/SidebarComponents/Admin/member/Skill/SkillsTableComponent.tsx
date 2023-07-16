import React, { useState } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    TableSortLabel,
    TablePagination, IconButton
} from '@material-ui/core';
import {Skill} from '../../../../../../hooks/useMember';
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";

interface SkillsTableComponentProps {
    skills: Skill[];
    handleDeleteSkill: (skillId: number) => void;
    handleUpdateSkill: (skillId: number, skillData: Skill) => void;
}

interface HeadCell {
    id: keyof Skill;
    label: string;
}

const headCells: HeadCell[] = [
    { id: 'SkillID', label: 'Skill ID' },
    { id: 'SkillName', label: 'Skill Name' },
    { id: 'SkillLevel', label: 'Skill Level' },
    { id: 'DateAcquired', label: 'Date Acquired' },
    { id: 'Certification', label: 'Certification' }
];

const SkillsTableComponent: React.FC<SkillsTableComponentProps> = ({ skills,handleDeleteSkill,handleUpdateSkill }) => {
    const [order, setOrder] = useState<'asc' | 'desc'>('asc');
    const [orderBy, setOrderBy] = useState<keyof Skill>('SkillID');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const handleSortRequest = (cellId: keyof Skill) => {
        const isAsc = orderBy === cellId && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(cellId);
    };

    const sortedSkills = [...skills].sort((a, b) => {
        let aVal = a[orderBy] || '';
        let bVal = b[orderBy] || '';

        if (orderBy === 'DateAcquired') {
            aVal = new Date(aVal as string).getTime();
            bVal = new Date(bVal as string).getTime();
        } else if (typeof aVal === 'number' && typeof bVal === 'number') {
            aVal = parseFloat(aVal.toString());
            bVal = parseFloat(bVal.toString());
        }

        if (aVal < bVal) {
            return order === 'asc' ? -1 : 1;
        }
        if (aVal > bVal) {
            return order === 'asc' ? 1 : -1;
        }

        return 0;
    });

    const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const paginatedSkills = sortedSkills.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        {headCells.map((cell) => (
                            <TableCell key={cell.id}>
                                <TableSortLabel
                                    active={orderBy === cell.id}
                                    direction={orderBy === cell.id ? order : 'asc'}
                                    onClick={() => handleSortRequest(cell.id)}
                                >
                                    {cell.label}
                                </TableSortLabel>
                            </TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {paginatedSkills.map((skill) => (
                        <TableRow key={skill.SkillID}>
                            <TableCell>{skill.SkillID}</TableCell>
                            <TableCell>{skill.SkillName}</TableCell>
                            <TableCell>{skill.SkillLevel}</TableCell>
                            <TableCell>{skill.DateAcquired ? new Date(skill.DateAcquired).toISOString().split('T')[0] : ''}</TableCell>
                            <TableCell>{skill.Certification}</TableCell>
                            <TableCell align="right">
                                <IconButton onClick={() => handleUpdateSkill(skill.SkillID?? 0, skill)}>
                                    <EditIcon />
                                </IconButton>
                                <IconButton onClick={() => handleDeleteSkill(skill.SkillID?? 0)}>
                                    <DeleteIcon />
                                </IconButton>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={sortedSkills.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </TableContainer>
    );
};

export default SkillsTableComponent;
