// components/ErrorBoundary.tsx
import React, { Component, PropsWithChildren } from 'react';
import Button from '@material-ui/core/Button';

interface ErrorBoundaryState {
    hasError: boolean;
    errorInfo: any;
}

class ErrorBoundary extends Component<PropsWithChildren<{}>, ErrorBoundaryState> {
    constructor(props: PropsWithChildren<{}>) {
        super(props);
        this.state = { hasError: false, errorInfo: null };
    }

    static getDerivedStateFromError(error: any) {
        return { hasError: true };
    }

    componentDidCatch(error: any, errorInfo: any) {
        this.setState({ errorInfo });
        console.error(error, errorInfo);
        // TODO: Send error information to an error reporting service here
    }

    handleRetry = () => {
        this.setState({ hasError: false, errorInfo: null });
        // TODO: You might want to trigger a retry of the operation that failed here
    };

    render() {
        if (this.state.hasError) {
            return (
                <div>
                    <h1>Oops, something went wrong.</h1>
                    <p>We're sorry for the inconvenience. Our team has been notified and will look into the issue.</p>
                    <Button variant="contained" color="primary" onClick={this.handleRetry}>Try Again</Button>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
