import React from 'react';

interface Props {
    message?: string;
    className?: string;
}

const InputError: React.FC<Props> = ({ message, className }) => (
    message ? <div className={`text-red-600 text-sm ${className}`}>{message}</div> : null
);

export default InputError;
