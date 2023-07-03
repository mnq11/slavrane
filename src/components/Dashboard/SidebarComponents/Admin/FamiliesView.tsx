// FamiliesView.tsx
import React from 'react';
import { Family, Member } from "../../../../hooks/useMember";
import { Accordion, AccordionSummary, AccordionDetails, Typography, Grow } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MembersView from './MembersView';

interface FamiliesViewProps {
    families: Family[];
    selectedFamilyId: number | null;
    onSelectFamily: (family: Family) => void;
    onSelectMember: (member: Member) => void;
    members: Member[];
    selectedMemberId: number | null;
}

const FamiliesView: React.FC<FamiliesViewProps> = ({ families, selectedFamilyId, onSelectFamily, onSelectMember, members, selectedMemberId }) => {
    return (
        <div>
            {families.map((family) => (
                <Accordion key={family.FamilyID} expanded={selectedFamilyId === family.FamilyID} onChange={() => onSelectFamily(family)} TransitionProps={{ unmountOnExit: true }}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                    >
                        <Typography>{family.FamilyName}</Typography>

                    </AccordionSummary>
                    <AccordionDetails>
                        <MembersView family={family} onSelectMember={onSelectMember} members={members} selectedMemberId={selectedMemberId} />
                    </AccordionDetails>
                </Accordion>
            ))}
        </div>
    );
};

export default FamiliesView;
