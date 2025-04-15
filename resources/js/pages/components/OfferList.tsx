import React, { useState, useEffect } from 'react';
import { Offer } from './../../types/Offer';
import axios from 'axios';

const OfferList: React.FC = () => {
    const [offers, setOffers] = useState<Offer[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchOffers = async () => {
            try {
                const response = await axios.get('/api/offers');
                setOffers(response.data);
                setLoading(false);
            } catch (err) {
                setError('Failed to fetch offers.');
                setLoading(false);
                console.error(err);
            }
        };

        fetchOffers();
    }, []);

    if (loading) {
        return <div>Loading offers...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {offers.map((offer) => (
                <div key={offer.id} className="bg-white shadow-md rounded-lg overflow-hidden">
                    {offer.image_url && (
                        <img src={offer.image_url} alt={offer.title} className="w-full h-48 object-cover" />
                    )}
                    <div className="p-4">
                        <h2 className="text-xl font-semibold">{offer.title}</h2>
                        <p className="text-gray-700">{offer.description.substring(0, 100)}...</p>
                        <p className="text-green-500 font-bold">{offer.discount_percentage}% off</p>
                        <p className="text-sm text-gray-500">Valid until: {offer.end_date}</p>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default OfferList;
