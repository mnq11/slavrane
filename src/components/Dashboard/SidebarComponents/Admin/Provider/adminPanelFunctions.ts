import { toast } from 'react-toastify';
import {createFamily, deleteFamily, getAllFamilies, updateFamily}  from '../../../../../API/api';
import {Family} from "../../../../../hooks/useMember";

export const fetchAllFamilies = async (setFamilies: React.Dispatch<React.SetStateAction<Family[]>>, setLoading: React.Dispatch<React.SetStateAction<boolean>>, setError: React.Dispatch<React.SetStateAction<{ message: string } | null>>) => {
    setLoading(true);
    try {
        const fetchedData = await getAllFamilies();
        setFamilies(fetchedData);
        setLoading(false);
    } catch (error) {
        console.error(error);
        // @ts-ignore
        setError(error);
        setLoading(false);
    }
};

export const createNewFamily = async (family: Family, setFamilies: React.Dispatch<React.SetStateAction<Family[]>>) => {
    try {
        const newFamily = await createFamily(family);
        setFamilies((prevFamilies) => [...prevFamilies, newFamily]);
        toast.success('Family created successfully');
    } catch (error) {
        console.error(error);
        toast.error('Failed to create family');
    }
};

export const modifyFamily = async (updatedFamily: Family, setFamilies: React.Dispatch<React.SetStateAction<Family[]>>, setSelectedFamily: React.Dispatch<React.SetStateAction<Family | null>>) => {
    try {
        const response = await updateFamily(updatedFamily);

        if (response.status === 200) {
            setFamilies((prevFamilies) =>
                prevFamilies.map((family) =>
                    family.FamilyID === updatedFamily.FamilyID ? updatedFamily : family
                )
            );
            toast.success('Family updated successfully');
            setSelectedFamily(null);
        } else {
            toast.error('Failed to update family');
        }
    } catch (error) {
        console.error(error);
        toast.error('Failed to update family');
    }
};

export const removeFamily = async (familyId: number | undefined, setFamilies: React.Dispatch<React.SetStateAction<Family[]>>, setSelectedFamily: React.Dispatch<React.SetStateAction<Family | null>>) => {
    if (familyId === undefined) {
        toast.error('Family ID is undefined');
        return;
    }

    try {
        const response = await deleteFamily(familyId);
        if (response.status !== 200) {
            setFamilies((prevFamilies) =>
                prevFamilies.filter((family) => family.FamilyID !== familyId)
            );
            setSelectedFamily(null);
            toast.success('Family deleted successfully');
        } else {
            toast.error('Failed to delete family');
        }
    } catch (error) {
        console.error(error);
    }
};
