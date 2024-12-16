import React from 'react';

interface ErrorBoundaryProps {
    children: React.ReactNode;
}

interface ErrorBoundaryState {
    hasError: boolean;
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
    constructor(props: ErrorBoundaryProps) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(): ErrorBoundaryState {
        // Update state to display the fallback UI
        return { hasError: true };
    }

    componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
        // Log the error details (e.g., send to an error tracking service)
        console.error('Error Boundary Caught:', error, errorInfo);
    }

    render(): React.ReactNode {
        if (this.state.hasError) {
            // Render fallback UI when an error occurs
            return <h1>Something went wrong with this component. Please try again later.</h1>;
        }

        // Render children if no error occurred
        return this.props.children;
    }
}

export default ErrorBoundary;
