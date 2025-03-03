import React, { useContext } from 'react';
import { AlertContext } from '../context/AlertContext';

export const Alert = ({ alert }) => {

  if (!alert.message) return null;

  const alertClasses = {
    success: 'bg-teal-50 border-t-2 border-teal-500',
    error: 'bg-red-50 border-s-4 border-red-500',
  };

  const iconClasses = {
    success: 'border-teal-100 bg-teal-200 text-teal-800',
    error: 'border-red-100 bg-red-200 text-red-800',
  };

  const icons = {
    success: (
      <svg className="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"></path>
        <path d="m9 12 2 2 4-4"></path>
      </svg>
    ),
    error: (
      <svg className="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 6 6 18"></path>
        <path d="m6 6 12 12"></path>
      </svg>
    ),
  };

  return (
    <div className={`rounded-lg p-4 ${alertClasses[alert.type]}`} role="alert" tabIndex="-1">
      <div className="flex">
        <div className="shrink-0">
          <span className={`inline-flex justify-center items-center size-8 rounded-full border-4 ${iconClasses[alert.type]}`}>
            {icons[alert.type]}
          </span>
        </div>
        <div className="ms-3">
          <h3 className="text-gray-800 font-semibold">
            {alert.type === 'success' ? 'Sucesso!' : 'Erro!'}
          </h3>
          <p className="text-sm text-gray-700">{alert.message}</p>
        </div>
      </div>
    </div>
  );
};