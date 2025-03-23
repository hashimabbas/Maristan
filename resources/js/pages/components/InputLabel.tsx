import React from 'react';

interface Props {
    value: string;
    htmlFor: string;
}

const InputLabel: React.FC<Props> = ({ value, htmlFor }) => (
    <label htmlFor={htmlFor} className="block font-medium text-sm text-gray-700">
        {value}
    </label>
);

export default InputLabel;
