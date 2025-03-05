import React, { createContext, useCallback, useContext, useState } from 'react';
import { Alert } from '../components/Alert';

export const AlertContext = createContext({
    showAlert: (message, type = 'success') => { }
});

export const AlertProvider = ({ children }) => {
    const [alerts, setAlert] = useState([]);

    const showAlert = useCallback ((message, type = 'success') => {
        const id = Math.floor(Math.random() * 100);
        setAlert(state => ([...state, { id, type, message }]));
        setTimeout(() => setAlert(state => state.filter(alert => alert.id != id)), 5000);
    }, []);

    return (
        <AlertContext.Provider value={{ alert, showAlert }}>
            <div className="fixed top-5 rigth-1">
                {alerts.map(alert =>
                    <div key={alert.id} className='mb-2'>
                        <Alert alert={alert} />
                    </div>
                )}
            </div>
            {children}
        </AlertContext.Provider>
    );
};
export const useAlert = () => useContext(AlertContext)