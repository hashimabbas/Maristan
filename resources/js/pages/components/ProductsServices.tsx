import React from 'react';
import { TextAnimate } from "./../../../js/components/ui/magicui/text-animate";

interface ProductService {
    id: number;
    header: string;
    description: string;
    icon: string;
}

interface ProductsServicesProps { }

const ProductsServices: React.FC<ProductsServicesProps> = () => {
    const productsServicesData: ProductService[] = [
        {
            id: 1,
            header: 'High-quality',
            description: 'Pharmaceutical products',
            icon: '/icons/quality-products.png',
        },
        {
            id: 2,
            header: 'Customized Solutions',
            description: 'Tailored pharmaceutical services',
            icon: '/icons/custom-solutions.png',
        },
        {
            id: 3,
            header: 'Research & Development',
            description: 'Innovative product pipeline',
            icon: '/icons/research-development.png',
        },
        {
            id: 4,
            header: 'Distribution',
            description: 'Our extensive network covers Egypt, Sudan, and the UAE, ensuring efficient delivery',
            icon: '/icons/distribution.png',
        },
        {
            id: 5,
            header: 'Supply Chain Management',
            description: 'Reliable sourcing, storage, and logistics solutions',
            icon: '/icons/supply-chain.png',
        },
    ];

    return (
        <section
            className="py-24 bg-cover bg-center relative mt-4"
            style={{ backgroundImage: 'url("/images/region-hexagon.png")' }}
        >
            <div className="absolute inset-0 bg-blue-900/50"></div>
            {/* Dark blue overlay */}
            <div className="container mx-auto px-4 relative z-10">
                <h2 className="text-5xl font-bold text-white text-left mb-16">
                    <TextAnimate animation="scaleUp" by="text">
                        Products/Services
                    </TextAnimate>
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {productsServicesData.map((item) => (
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

export default ProductsServices;
