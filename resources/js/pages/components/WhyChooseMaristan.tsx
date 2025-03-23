// src/components/WhyChooseMaristan.tsx

import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons'; // Example icon - replace if needed

interface Reason {
    id: number;
    text: string;
}

interface WhyChooseMaristanProps {
    reasons?: Reason[]; // Optional: If data is fetched from an API
}

const WhyChooseMaristan: React.FC<WhyChooseMaristanProps> = ({ reasons }) => {
    // Static data if you're not fetching from an API
    const staticReasons: Reason[] = [
        { id: 1, text: 'Unparalleled pharmaceutical solutions expertise.' },
        { id: 2, text: 'High-quality products' },
        { id: 3, text: 'Timely delivery' },
        { id: 4, text: 'Competitive pricing' },
        { id: 5, text: 'Exceptional customer service' },
    ];

    const reasonsToDisplay = reasons || staticReasons;

    return (
        <div className="bg-indigo-900 text-white p-8 rounded-lg m-5">
            <h2 className="text-3xl font-bold mb-4 text-left">Why Choose Maristan?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {reasonsToDisplay.map((reason) => (
                    <div key={reason.id} className="flex items-center bg-white/5 p-4 rounded-lg">
                        <div className="w-8 h-8 rounded-full bg-lime-400 text-indigo-900 font-bold flex items-center justify-center mr-4">
                            {reason.id}
                        </div>
                        <div className="text-lg">{reason.text}</div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default WhyChooseMaristan;
