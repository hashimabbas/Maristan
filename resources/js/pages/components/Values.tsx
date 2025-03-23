import React from 'react';
import { TextAnimate } from "./../../../js/components/ui/magicui/text-animate";

interface ValuesProps { }

const Values: React.FC<ValuesProps> = () => {
    const values = [
        {
            title: 'Quality',
            description: 'Uncompromising commitment to excellence.',
            icon: '/icons/Quality.png', // Replace with your actual icon path
        },
        {
            title: 'Innovation',
            description: 'Pioneering solutions for better healthcare.',
            icon: '/icons/Innovation.png', // Replace with your actual icon path
        },
        {
            title: 'Integrity',
            description: 'Ethical business practices and transparency.',
            icon: '/icons/Integrity.png', // Replace with your actual icon path
        },
        {
            title: 'Compassion',
            description: 'Empathy and care in everything we do.',
            icon: '/icons/Compassion.png', // Replace with your actual icon path
        },
        {
            title: 'Sustainability',
            description: 'Environmentally responsible operations.',
            icon: '/icons/Sustainability.png', // Replace with your actual icon path
        },
    ];

    return (
        <section className="py-16 mt-6 bg-gray-50 dark:bg-gray-900">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-center mb-12 text-gray-800 dark:text-white">
                    <TextAnimate animation="scaleUp" by="text">
                        Our Values
                    </TextAnimate>
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {values.map((value, index) => (
                        <div
                            key={index}
                            className="rounded-lg shadow-lg p-6 bg-white dark:bg-gray-800 dark:border dark:border-gray-700 transition-colors duration-300 hover:shadow-xl flex flex-col items-center"
                        >
                            <div className="flex flex-col items-center mb-6">
                                <img
                                    src={value.icon}
                                    alt={`${value.title} Icon`}
                                    className="w-16 h-16 object-contain mb-2"
                                />
                                <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 text-center">
                                    <TextAnimate animation="scaleUp" by="text">
                                        {value.title}
                                    </TextAnimate>
                                </h3>
                            </div>
                            <p className="text-gray-700 dark:text-gray-400 leading-relaxed text-center">
                                <TextAnimate animation="scaleUp" by="text">
                                    {value.description}
                                </TextAnimate>
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Values;
