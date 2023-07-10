import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@material-ui/core';
import { Skill } from '../../../../../../hooks/useMember';

interface SkillsTableComponentProps {
    skills: Skill[];
}

const SkillsTableComponent: React.FC<SkillsTableComponentProps> = ({ skills }) => {
    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Skill ID</TableCell>
                        <TableCell>Skill Name</TableCell>
                        <TableCell>Skill Level</TableCell>
                        <TableCell>Date Acquired</TableCell>
                        <TableCell>Certification</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {skills.map((skill) => (
                        <TableRow key={skill.SkillID}>
                            <TableCell>{skill.SkillID}</TableCell>
                            <TableCell>{skill.SkillName}</TableCell>
                            <TableCell>{skill.SkillLevel}</TableCell>
                            <TableCell>{skill.DateAcquired}</TableCell>
                            <TableCell>{skill.Certification}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default SkillsTableComponent;
