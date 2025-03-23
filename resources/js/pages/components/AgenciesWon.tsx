import React from 'react';
import { TextAnimate } from "./../../../js/components/ui/magicui/text-animate";

interface Agency {
    id: number;
    name: string;
    agency_type?: string;
    description: string;
    logo_path?: string;
}

const AgenciesWon: React.FC = () => {
    const agencies: Agency[] = [
        {
            id: 1,
            name: 'Hefeny Pharma',
            agency_type: 'Exclusive Agency',
            description:
                'HPG created its own success story in the 90s. We have been using everything we have and doing everything we can to improve the quality of human life by implementing comprehensive solutions to help the community, whether they are patients or healthcare professionals.',
            logo_path: '/icons/hpg_logo.png', // Replace with actual path
        },
        {
            id: 2,
            name: 'Eva Pharma Company',
            agency_type: 'Agency',
            description:
                'A purpose driven diverse top team that strives to save and improve millions of lives by sustainably offering accessible, high value medicines and health care solutions that address local patients\' needs.',
            logo_path: '/icons/eva_pharma_logo.png', // Replace with actual path
        },
        // Add more agencies here...
    ];

    return (
        <div className="bg-gray-100 py-8 mt-4">
            <div className="container mx-auto px-4">
                <h1 className="text-3xl font-semibold mb-6 text-center"><TextAnimate animation="scaleUp" by="text">Agencies Won</TextAnimate></h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {agencies.map((agency) => (
                        <div key={agency.id} className="bg-white rounded-lg shadow-md p-6">
                            <div className="flex items-center mb-4">
                                {agency.logo_path && (
                                    <img
                                        src={agency.logo_path}
                                        alt={`${agency.name} Logo`}
                                        className="w-12 h-12 rounded-full mr-4 object-cover"
                                    />
                                )}
                                <div>
                                    <h2 className="text-xl font-semibold"><TextAnimate animation="scaleUp" by="text">{agency.name}</TextAnimate></h2>
                                    {agency.agency_type && <p className="text-gray-600">{agency.agency_type}</p>}
                                </div>
                            </div>
                            <p className="text-gray-700 leading-relaxed">{agency.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AgenciesWon;
