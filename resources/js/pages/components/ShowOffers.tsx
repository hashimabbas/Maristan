// resources/js/Pages/ShowPublic/Index.tsx

import React from 'react';
import { Head } from '@inertiajs/react';
import { Offer } from '@/types'; // Adjust the import path if needed

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button"; // You might use this for navigation
import { Badge } from "@/components/ui/badge"; // For displaying status
import { format } from 'date-fns';  // For date formatting (install: `npm install date-fns`)

interface Props {
    offers: Offer[];
}

const defaultImageUrl = '/images/default-offer.png'; // Replace with your actual default image path

const PublicOffersComponent: React.FC<Props> = ({ offers }) => {
    return (
        <div className="py-12 bg-gray-100 min-h-screen">
            <Head title="Available Offers" />
            <div className="max-w-6xl mx-auto sm:px-6 lg:px-8 space-y-6">
                <h1 className="text-3xl font-semibold text-gray-800">
                    Check Out Our Latest Offers!
                </h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {offers.map((offer) => (
                        <Card key={offer.id} className="bg-white shadow-md rounded-lg overflow-hidden">
                            <div className="relative">
                                <img
                                    src={offer.image ? `/storage/${offer.image}` : defaultImageUrl}
                                    alt={offer.title}
                                    className="w-full h-48 object-cover object-center"
                                    onError={(e: any) => { e.target.src = defaultImageUrl; }} // Fallback in case of load error
                                />
                                <Badge
                                    variant={offer.is_active ? 'success' : 'destructive'}
                                    className="absolute top-2 right-2"
                                >
                                    {offer.is_active ? 'Active' : 'Inactive'}
                                </Badge>
                            </div>
                            <CardHeader>
                                <CardTitle className="text-lg font-semibold">{offer.title}</CardTitle>
                            </CardHeader>
                            <CardContent className="p-4">
                                <CardDescription className="text-sm text-gray-600">
                                    {offer.description || 'No description available.'}
                                </CardDescription>
                                <div className="mt-2 space-y-1">
                                    {offer.discount_percentage && (
                                        <p className="text-gray-700">
                                            Discount: {offer.discount_percentage}%
                                        </p>
                                    )}
                                    {offer.discount_amount && (
                                        <p className="text-gray-700">
                                            Discount: ${offer.discount_amount}
                                        </p>
                                    )}
                                    {offer.start_date && (
                                        <p className="text-gray-700">
                                            Start Date: {format(new Date(offer.start_date), 'PPP')}
                                        </p>
                                    )}
                                    {offer.end_date && (
                                        <p className="text-gray-700">
                                            End Date: {format(new Date(offer.end_date), 'PPP')}
                                        </p>
                                    )}
                                </div>
                                {/* Optional: Add a button to view more details or apply the offer */}
                            </CardContent>
                        </Card>
                    ))}
                    {offers.length === 0 && (
                        <div className="col-span-full text-center text-gray-500">
                            No offers available at this time.
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default PublicOffersComponent;
