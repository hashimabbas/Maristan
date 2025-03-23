import React from 'react';
import { TextAnimate } from "./../../../js/components/ui/magicui/text-animate";

interface RegionsProps { }

const Regions: React.FC<RegionsProps> = () => {
    const regionsData = [
        {
            id: 1,
            name: 'Egypt',
            icon: '/icons/egypt.png',
        },
        {
            id: 2,
            name: 'Sudan',
            icon: '/icons/sudan-flag-icon.png',
        },
        {
            id: 3,
            name: 'UAE',
            icon: '/icons/emirates.png',
        },
    ];

    return (
        <section
            className="w-full bg-cover bg-center"
            style={{ backgroundImage: 'url("/images/world-2.png")' }} // Replace with path
        >
            <div className="bg-white/80 dark:bg-gray-900/80 py-16">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center mb-12 text-gray-800 dark:text-white">
                        <TextAnimate animation="scaleUp" by="text">
                            Regions We Dominate
                        </TextAnimate>
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {regionsData.map((region) => (
                            <div
                                key={region.id}
                                className="rounded-lg shadow-lg p-6 bg-white dark:bg-gray-800 dark:border dark:border-gray-700 transition-colors duration-300 hover:shadow-xl flex flex-col items-center"
                            >
                                {/* Container for Icon + Hexagon */}
                                <div className="flex items-center justify-center mb-4">
                                    <img
                                        src={region.icon}
                                        alt={`${region.name} Icon`}
                                        className="w-12 h-12 mr-2 object-contain"
                                    />
                                </div>

                                <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 text-center mt-4">
                                    <TextAnimate animation="scaleUp" by="text">
                                        {region.name}
                                    </TextAnimate>
                                </h3>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Regions;
