import { createContext, useState, type ReactNode } from 'react';

interface ToastContextType {
    showToast: (message: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider = ({ children }: { children: ReactNode }) => {
    const [toastMessage, setToastMessage] = useState('');
    const [showToast, setShowToast] = useState(false);

    const showToastMessage = (message: string) => {
        setToastMessage(message);
        setShowToast(true);

        setTimeout(() => {
            setShowToast(false);
        }, 2200);
    };

    return (
        <ToastContext.Provider value={{ showToast: showToastMessage }}>
            {children}

            {showToast && (
                <div className="toast">
                    {toastMessage}
                </div>
            )}
        </ToastContext.Provider>
    );
};

export { ToastContext };