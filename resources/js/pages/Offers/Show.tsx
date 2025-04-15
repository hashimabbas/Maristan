// resources/js/pages/Offers/Show.tsx

import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { Offer } from '@/types';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge"; // Assuming you want to use a badge for status
import { Separator } from "@/components/ui/separator"; // For visual separation

interface Props {
    offer: Offer; // Correct the prop name to singular 'offer'
    auth: {
        user: any;
    };
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

const OffersShow: React.FC<Props> = ({ offer, auth }) => {

    // Function to generate the full image URL
    const getImageUrl = (imagePath: string | null | undefined): string | undefined => {
        if (!imagePath) {
            return undefined; // Or return a default image URL if you have one
        }
        return `/storage/${imagePath}`;  // Assuming your public disk URL is /storage
    };

    const imageUrl = getImageUrl(offer.image);


    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={offer.title} />

            <div className="py-12">
                <div className="max-w-4xl mx-auto sm:px-6 lg:px-8">
                    <Card>
                        <CardHeader>
                            <CardTitle>{offer.title}</CardTitle>
                            <CardDescription>Details of this offer.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center space-x-2">
                                <Badge variant={offer.is_active ? 'success' : 'destructive'}>
                                    {offer.is_active ? 'Active' : 'Inactive'}
                                </Badge>
                            </div>
                            <Separator />
                            <div>
                                <h4 className="text-sm font-medium leading-none">Description</h4>
                                <p className="text-sm text-muted-foreground">
                                    {offer.description || 'No description provided.'}
                                </p>
                            </div>
                            <Separator />

                            {offer.discount_percentage && (
                                <div>
                                    <h4 className="text-sm font-medium leading-none">Discount</h4>
                                    <p className="text-sm text-muted-foreground">{offer.discount_percentage}%</p>
                                </div>
                            )}
                            <Separator />

                            {offer.start_date && (
                                <div>
                                    <h4 className="text-sm font-medium leading-none">Start Date</h4>
                                    <p className="text-sm text-muted-foreground">{offer.start_date}</p>
                                </div>
                            )}
                            <Separator />

                            {offer.end_date && (
                                <div>
                                    <h4 className="text-sm font-medium leading-none">End Date</h4>
                                    <p className="text-sm text-muted-foreground">{offer.end_date}</p>
                                </div>
                            )}
                            <Separator />

                            {imageUrl && (
                                <div className="flex justify-center">
                                    <img
                                        src={imageUrl}
                                        alt={offer.title}
                                        className="rounded-md object-cover w-full h-64"
                                    />
                                </div>
                            )}
                            <Separator />

                            <div className="flex justify-between">
                                <Link href={route('offers.edit', { offer: offer.id })}>
                                    <Button>Edit</Button>
                                </Link>
                                <Link href={route('offers.index')}>
                                    <Button variant="secondary">Back to Offers</Button>
                                </Link>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
};

export default OffersShow;
