import {toast} from 'react-toastify';
import {createFamily, deleteFamily, getAllFamilies, updateFamily} from '../../../../../API/api';
import {Family} from "../../../../../hooks/useMember";

export const fetchAllFamilies = async () => {
    try {
        return await getAllFamilies();
    } catch (error) {
        console.error(error);

    }
};

export const createNewFamily = async (Family: Family) => {
    try {
        const newFamily = await createFamily(Family);
        toast.success('Family created successfully');
    } catch (error) {
        console.error(error);
        toast.error('Failed to create family');
    }
};

export const modifyFamily = async (updatedFamily: Family) => {
    try {
        const response = await updateFamily(updatedFamily);

        if (response.status === 200) {

            toast.success('Family updated successfully');
        } else {
            toast.error('Failed to update family');
        }
    } catch (error) {
        console.error(error);
        toast.error('Failed to update family');
    }
};

export const removeFamily = async (familyId: number | undefined) => {
    if (familyId === undefined) {
        toast.error('Family ID is undefined');
        return;
    }

    try {
        const response = await deleteFamily(familyId);
        if (response.status !== 200) {

            toast.success('Family deleted successfully');
        } else {
            toast.error('Failed to delete family');
        }
    } catch (error) {
        console.error(error);
    }
};
