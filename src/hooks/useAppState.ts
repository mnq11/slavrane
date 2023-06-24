// useAppState.ts
import { useContext } from 'react';
import { AppStateContext } from "../AppStateContext";

export const useAppState = () => {
    const context = useContext(AppStateContext);

    if (!context) {
        throw new Error('useAppState must be used within AppStateProvider');
    }

    return context;
};
