// AppStateContext.tsx
import React, { createContext, useReducer, ReactNode } from 'react';

interface AppState {
    isLoggedIn: boolean;
    user: any;
}

interface Action {
    type: string;
    payload?: any;
}

const initialState: AppState = {
    isLoggedIn: false,
    user: null,
};

function appStateReducer(state: AppState, action: Action): AppState {
    switch (action.type) {
        case 'LOGIN':
            return { ...state, isLoggedIn: true, user: action.payload };
        case 'LOGOUT':
            return { ...state, isLoggedIn: false, user: null };
        default:
            return state;
    }
}

interface AppStateContextProps {
    state: AppState;
    dispatch: React.Dispatch<Action>;
}

export const AppStateContext = createContext<AppStateContextProps | undefined>(undefined);

interface AppStateProviderProps {
    children: ReactNode;
}

export function AppStateProvider({ children }: AppStateProviderProps) {
    const [state, dispatch] = useReducer(appStateReducer, initialState);

    return (
        <AppStateContext.Provider value={{ state, dispatch }}>
            {children}
        </AppStateContext.Provider>
    );
}
