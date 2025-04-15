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

interface OurExclusiveOffersProps {
    className?: string;
}

const OurExclusiveOffers: React.FC<OurExclusiveOffersProps> = ({ className }) => {
    const { t } = useTranslation();
    const isRtl = false; // Hardcoded as per your note

    const OurExclusiveOffersData: ProductService[] = [
        {
            id: 1,
            header: t('ourExclusiveOffers.bonusSystemHeader'),
            description: t('ourExclusiveOffers.bonusSystemDescription'),
            icon: '/icons/gift.png',
        },
        {
            id: 2,
            header: t('ourExclusiveOffers.marketingSalesSupportHeader'),
            description: t('ourExclusiveOffers.marketingSalesSupportDescription'),
            icon: '/icons/custom-solutions.png',
        },
        {
            id: 3,
            header: t('ourExclusiveOffers.exclusiveTerritoriesHeader'),
            description: t('ourExclusiveOffers.exclusiveTerritoriesDescription'),
            icon: '/icons/exclusive.png',
        },
        {
            id: 4,
            header: t('ourExclusiveOffers.productDiscountsHeader'),
            description: t('ourExclusiveOffers.productDiscountsDescription'),
            icon: '/icons/price-tag.png',
        },
        {
            id: 5,
            header: t('ourExclusiveOffers.exclusiveEventsTrainingHeader'),
            description: t('ourExclusiveOffers.exclusiveEventsTrainingDescription'),
            icon: '/icons/presentation.png',
        },
        {
            id: 6,
            header: t('ourExclusiveOffers.earlyAccessNewProductsHeader'),
            description: t('ourExclusiveOffers.earlyAccessNewProductsDescription'),
            icon: '/icons/new-product.png',
        },
    ];

    return (
        <section className={cn("py-16 bg-gray-100 dark:bg-gray-900", className)}>
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-center text-primary dark:text-white mb-12">
                    <TextAnimate animation="scaleUp" by="text">
                        {t('ourExclusiveOffers.ourExclusiveOffers')}
                    </TextAnimate>
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {OurExclusiveOffersData.map((item) => (
                        <div
                            key={item.id}
                            className="p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-md hover:shadow-xl transition-shadow flex flex-col items-center text-center"
                        >
                            <img
                                src={item.icon}
                                alt={`${item.header} Icon`}
                                className="w-20 h-20 mb-4 object-contain"
                            />
                            <h3 className="text-xl font-semibold text-primary dark:text-white mb-2">
                                {item.header}
                            </h3>
                            <p className="text-gray-600 dark:text-gray-300">{item.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default OurExclusiveOffers;
