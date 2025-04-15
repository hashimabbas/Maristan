import React from 'react';
import { TextAnimate } from "./../../../js/components/ui/magicui/text-animate";
import { useTranslation } from 'react-i18next';
import { cn } from "@/lib/utils";

interface ProductService {
    id: number;
    header: string;
    description: string;
    icon: string;
}

interface KeyStrengthsProps {
    className?: string;
}

const KeyStrengths: React.FC<KeyStrengthsProps> = ({ className }) => {
    const { t } = useTranslation();
    const isRtl = false; // Hardcoded for now.

    const KeyStrengthsData: ProductService[] = [
        {
            id: 1,
            header: t('keyStrengths.premiumOffersHeader'),
            description: t('keyStrengths.premiumOffersDescription'),
            icon: '/icons/gift.png',
        },
        {
            id: 2,
            header: t('keyStrengths.flexiblePaymentsHeader'),
            description: t('keyStrengths.flexiblePaymentsDescription'),
            icon: '/icons/custom-solutions.png',
        },
        {
            id: 3,
            header: t('keyStrengths.marketExperienceHeader'),
            description: t('keyStrengths.marketExperienceDescription'),
            icon: '/icons/financial.png',
        },
        {
            id: 4,
            header: t('keyStrengths.diverseProductLinesHeader'),
            description: t('keyStrengths.diverseProductLinesDescription'),
            icon: '/icons/distribution.png',
        },
        {
            id: 5,
            header: t('keyStrengths.qualityAssuranceHeader'),
            description: t('keyStrengths.qualityAssuranceDescription'),
            icon: '/icons/supply-chain.png',
        },
    ];

    return (
        <section
            className={cn("py-24 bg-gradient-to-br from-blue-400 via-blue-300 to-blue-200 relative", className)}
        >

            <div className="container mx-auto px-4 relative z-10">
                <h2 className="text-2xl font-bold text-white text-center mb-16">
                    <TextAnimate animation="scaleUp" by="text">
                        {t('keyStrengths.keyStrengths')}
                    </TextAnimate>
                </h2>

                <div className="relative flex flex-col md:flex-row md:items-start md:justify-center">
                    <div className="hidden md:block absolute top-0 bottom-0 left-1/2 w-1 bg-white/10 rounded-full"></div>

                    {KeyStrengthsData.map((item, index) => (
                        <div
                            key={item.id}
                            className={cn(
                                "relative z-10 flex items-center md:w-1/2 px-4 py-6",
                                index % 2 === 0 ? "md:justify-end md:text-right" : "md:justify-start md:text-left"
                            )}
                        >
                            <div className="flex items-center space-x-4 md:space-x-0 md:space-y-4 md:flex-col md:items-center">
                                <div className="flex-shrink-0">
                                    <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center">
                                        <img
                                            src={item.icon}
                                            alt={`${item.header} Icon`}
                                            className="w-8 h-8 object-contain"
                                        />
                                    </div>
                                </div>
                                <div className="max-w-sm text-center">
                                    <h3 className="text-lg md:text-xl font-semibold text-white mb-2">
                                        <TextAnimate animation="scaleUp" by="text">{item.header}</TextAnimate>
                                    </h3>
                                    <p className="text-gray-100 text-sm md:text-base">
                                        {item.description}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default KeyStrengths;
