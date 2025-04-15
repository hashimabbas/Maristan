import React from 'react';
import { TextAnimate } from "./../../../js/components/ui/magicui/text-animate";
import { useTranslation } from 'react-i18next';
import { cn } from "@/lib/utils";
import { ReactNode } from 'react';

interface ValuesProps {
    className?: string;
}

interface Value {
    title: string;
    description: string;
    icon: string;
}

const Values: React.FC<ValuesProps> = ({ className }) => {
    const { t } = useTranslation();
    const isRtl = false; // Since the isRtl is not working i will hard code it to false

    const values: Value[] = [
        {
            title: t('values.qualityTitle'),
            description: t('values.qualityDescription'),
            icon: '/icons/Quality.png',
        },
        {
            title: t('values.innovationTitle'),
            description: t('values.innovationDescription'),
            icon: '/icons/Innovation.png',
        },
        {
            title: t('values.integrityTitle'),
            description: t('values.integrityDescription'),
            icon: '/icons/Integrity.png',
        },
        {
            title: t('values.compassionTitle'),
            description: t('values.compassionDescription'),
            icon: '/icons/Compassion.png',
        },
        {
            title: t('values.sustainabilityTitle'),
            description: t('values.sustainabilityDescription'),
            icon: '/icons/Sustainability.png',
        },
    ];

    return (
        <section className={cn("py-16 mt-6 bg-gray-50 dark:bg-gray-900", className)}>
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-center mb-12 text-primary dark:text-white">
                    <TextAnimate animation="scaleUp" by="text">
                        {t('values.ourValues')}
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
                                <h3 className="text-xl font-semibold text-primary dark:text-gray-50 text-center">
                                    <TextAnimate animation="scaleUp" by="text">
                                        {value.title}
                                    </TextAnimate>
                                </h3>
                            </div>
                            <p className="text-gray-700 dark:text-gray-400 leading-relaxed text-center">
                                {value.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Values;
