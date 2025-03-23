import React from 'react';
import { TextAnimate } from "./../../../js/components/ui/magicui/text-animate";

interface ProductService {
    id: number;
    header: string;
    description: string;
    icon: string;
}

interface OurExclusiveOffersProps { }

const OurExclusiveOffers: React.FC<OurExclusiveOffersProps> = () => {
    const OurExclusiveOffersData: ProductService[] = [
        {
            id: 1,
            header: 'Bonus system',
            description: 'rewards subagents with competitive bonuses based on sales, market growth, customer satisfaction, & professional conduct',
            icon: '/icons/gift.png',
        },
        {
            id: 2,
            header: 'Marketing and sales support',
            description: '',
            icon: '/icons/custom-solutions.png',
        },
        {
            id: 3,
            header: 'Exclusive territories',
            description: 'Subagents may be granted exclusive rights to sell products in a specific geographic area',
            icon: '/icons/exclusive.png',
        },
        {
            id: 4,
            header: 'Product discounts',
            description: 'Subagents may receive discounts on products for personal use or for resale',
            icon: '/icons/price-tag.png',
        },
        {
            id: 5,
            header: 'Exclusive events & training',
            description: 'Subagents may be invited to attend industry events',
            icon: '/icons/presentation.png',
        },
        {
            id: 6,
            header: 'Early access to new products',
            description: '',
            icon: '/icons/new-product.png',
        },
    ];

    return (
        <section
            className="py-24 bg-cover bg-center relative mt-4"
            style={{ backgroundImage: 'url("/images/offers.jpg")' }}
        >
            <div className="absolute inset-0 bg-blue-900/50"></div>
            {/* Dark blue overlay */}
            <div className="container mx-auto px-4 relative z-10">
                <h2 className="text-5xl font-bold text-white text-left mb-16">
                    Our Exclusive Offers
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {OurExclusiveOffersData.map((item) => (
                        <div
                            key={item.id}
                            className="relative p-6 rounded-xl bg-white/10 backdrop-blur-md text-white flex items-start"
                        >
                            <img
                                src={item.icon}
                                alt={`${item.header} Icon`}
                                className="w-16 h-16 mr-4 object-contain" // Size, margin, object fit
                            />
                            <div>
                                {/* No longer absolutely positioned */}
                                <h3 className="text-xl font-semibold mb-2"><TextAnimate animation="scaleUp" by="text">{item.header}</TextAnimate></h3>
                                <p className="text-gray-300">{item.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default OurExclusiveOffers;
