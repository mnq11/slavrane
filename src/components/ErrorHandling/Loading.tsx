// Loading.tsx
import React from 'react';
import {CircularProgress, Backdrop, Snackbar} from '@material-ui/core';
import {useDashboardStyles} from "../Dashboard/DashboardStyleing/Dashboard.styles";

interface LoadingProps {
    loading: boolean;
    error: boolean;
}

const Loading: React.FC<LoadingProps> = ({loading, error}) => {
    const classes = useDashboardStyles();

    return (
        <>
            {loading && (
                <Backdrop className={classes.backdrop} open={loading}>
                    <CircularProgress color="inherit" />
                </Backdrop>
            )}
            {error && (
                <Snackbar
                    open={error}
                    autoHideDuration={6000}
                    message="An error occurred while loading your data."
                />
            )}
        </>
    );
};

export default Loading;
