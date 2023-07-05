// Loading.tsx
import React from 'react';
import {CircularProgress, Backdrop, Snackbar} from '@material-ui/core';
import {useLoadingStyles} from "./Loading.styles";

interface LoadingProps {
    loading: boolean;
    error: string | null;
}

const Loading: React.FC<LoadingProps> = ({loading, error}) => {
    const classes = useLoadingStyles();

    return (
        <>
            {loading && (
                <Backdrop className={classes.backdrop} open={loading}>
                    <CircularProgress color="inherit" />
                </Backdrop>
            )}
            {error && (
                <Snackbar
                    open={!!error}
                    autoHideDuration={6000}
                    message={error}
                />
            )}
        </>
    );
};

export default Loading;
