import React from 'react';

interface Props extends React.TextareaHTMLAttributes<HTMLTextAreaElement> { }

const Textarea: React.FC<Props> = ({ ...props }) => (
    <textarea
        {...props}
        className="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
    />
);

export default Textarea;
