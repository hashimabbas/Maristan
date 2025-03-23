import React from 'react';

interface Props extends React.InputHTMLAttributes<HTMLInputElement> { }

const TextInput: React.FC<Props> = ({ ...props }) => (
    <input
        {...props}
        className="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
    />
);

export default TextInput;
