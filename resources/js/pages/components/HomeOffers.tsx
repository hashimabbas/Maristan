// resources/js/components/HomeOffers.tsx

import React, { useState, useEffect } from 'react';
import { Offer } from '@/types';

interface HomeOffersProps {
    //  You may need to pass auth and locale as props if those values are used in this component.
    //  auth: any;  // Replace 'any' with a more specific type if you have one
    //  locale: string;
}

const HomeOffers: React.FC<HomeOffersProps> = () => {
    const [offers, setOffers] = useState<Offer[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchOffers = async () => {
            try {
                const response = await fetch('/api/offers');
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const data = await response.json();
                console.log("Offers fetched:", data);  // Check the fetched data
                setOffers(data);
            } catch (e: any) {
                setError(e.message);
                console.error("Failed to fetch offers:", e);
            } finally {
                setLoading(false);
            }
        };

        fetchOffers();
    }, []);

    if (loading) {
        return <p>Loading offers...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    console.log("Offers array:", offers);  // Check the offers array before rendering

    return (
        <div className="bg-gray-100 py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-3xl font-extrabold text-gray-900 mb-8">Special Offers</h2>
                {offers && offers.length > 0 ? ( // Check if offers is defined AND has a length
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {offers.map((offer) => (
                            <div key={offer.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                                {offer.image && (
                                    <img src={offer.imageUrl} alt={offer.title} className="w-full h-48 object-cover" />
                                )}
                                <div className="p-4">
                                    <h3 className="text-xl font-semibold text-gray-800">{offer.title}</h3>
                                    {offer.discount_percentage && (
                                        <p className="text-green-600 font-bold">{offer.discount_percentage}% Off</p>
                                    )}
                                    <p className="text-gray-600">{offer.description.substring(0, 100)}...</p>
                                    <a href={`/offers/${offer.slug}`} className="text-blue-500 hover:underline">Learn More</a>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p>No active offers available.</p>
                )}
            </div>
        </div>
    );
};

export default HomeOffers;
