import React, { useState, useEffect } from 'react';
import { Offer } from './../../types/Offer';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const OfferDetail: React.FC = () => {
    const [offer, setOffer] = useState<Offer | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const { slug } = useParams<Record<string, string | undefined>>();

    useEffect(() => {
        const fetchOffer = async () => {
            try {
                const response = await axios.get(`/api/offers/${slug}`);
                setOffer(response.data);
                setLoading(false);
            } catch (err) {
                setError('Failed to fetch offer.');
                setLoading(false);
                console.error(err);
            }
        };

        fetchOffer();
    }, [slug]);

    if (loading) {
        return <div>Loading offer details...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!offer) {
        return <div>Offer not found.</div>;
    }

    return (
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
            {offer.image && (
                <img src={offer.image_url} alt={offer.title} className="w-full h-64 object-cover" />
            )}
            <div className="p-4">
                <h1 className="text-2xl font-semibold">{offer.title}</h1>
                <p className="text-gray-700">{offer.description}</p>
                <p className="text-green-500 font-bold">{offer.discount_percentage}% off</p>
                <p className="text-sm text-gray-500">Valid from {offer.start_date} to {offer.end_date}</p>
            </div>
        </div>
    );
};

export default OfferDetail;
