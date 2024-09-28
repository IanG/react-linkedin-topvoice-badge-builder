import React, {ReactNode, useEffect, useState} from "react";
import {Alert} from "react-bootstrap";

interface AutoDismissAlertProps {
    children: ReactNode;
    duration?: number;
    variant: React.ComponentProps<typeof Alert>['variant'];
}

function useAutoDismiss(duration: number, onDismiss: () => void) {
    useEffect(() => {
        const timer = setTimeout(onDismiss, duration);
        return () => clearTimeout(timer);
    }, [duration, onDismiss]);
}

export default function AutoDismissAlert ({children, duration = 3000, variant = "primary"}: AutoDismissAlertProps) {
    const [show, setShow] = useState(true);

    useAutoDismiss(duration, () => setShow(false));

    return (
        <>
            {show && (
                <Alert variant={variant} onClose={() => setShow(false)} transition={true}>
                    {children}
                </Alert>
            )}
        </>
    );
};
