import React from 'react';
import { TextAnimate } from "./../../../js/components/ui/magicui/text-animate";
import { useTranslation } from 'react-i18next';
import { cn } from "@/lib/utils";
import { ReactNode } from 'react';

interface RegionsProps {
    className?: string;
}

interface Region {
    id: number;
    name: string;
    icon: string;
}

const Regions: React.FC<RegionsProps> = ({ className }) => {
    const { t } = useTranslation();
    const isRtl = false; // Since the isRtl is not working i will hard code it to false

    const regionsData: Region[] = [
        {
            id: 1,
            name: t('regions.egypt'),
            icon: '/icons/egypt.png',
        },
        {
            id: 2,
            name: t('regions.sudan'),
            icon: '/icons/sudan-flag-icon.png',
        },
        {
            id: 3,
            name: t('regions.uae'),
            icon: '/icons/emirates.png',
        },
    ];

    return (
        <section
            className={cn("w-full bg-cover bg-center", className)}
            style={{ backgroundImage: 'url("/images/world-2.png")' }}
        >
            <div className="bg-white/80 dark:bg-gray-900/80 py-16">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center mb-12 text-primary dark:text-white">
                        <TextAnimate animation="scaleUp" by="text">
                            {t('regions.regionsWeDominate')}
                        </TextAnimate>
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {regionsData.map((region) => (
                            <div
                                key={region.id}
                                className="rounded-lg shadow-lg p-6 bg-white dark:bg-gray-800 dark:border dark:border-gray-700 transition-colors duration-300 hover:shadow-xl flex flex-col items-center"
                            >
                                <div className="flex items-center justify-center mb-4">
                                    <img
                                        src={region.icon}
                                        alt={`${region.name} Icon`}
                                        className="w-12 h-12 mr-2 object-contain"
                                    />
                                </div>

                                <h3 className="text-xl font-semibold text-primary dark:text-gray-50 text-center mt-4">
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
