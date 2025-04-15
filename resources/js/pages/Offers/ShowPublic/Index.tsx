import React from 'react';
import { Head, usePage } from '@inertiajs/react';
import { Offer } from '@/types';
import { format } from 'date-fns';
import { enUS, ar } from 'date-fns/locale'; // Import the Arabic locale
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Navbar from '@/pages/components/Navbar';
import { HeroSectiion } from '@/pages/components/HeroSection';
import Footer from '@/pages/components/Footer';
import { Separator } from "@/components/ui/separator"
import { CalendarDays, Percent, Tag, Timer } from "lucide-react"
import { useTranslation } from "react-i18next";

interface Props {
    offers: Offer[];
    auth: {
        user: any;
    };
}

const defaultImageUrl = '/images/logo.png';

const PublicOffersComponent: React.FC<Props> = ({ offers, auth }) => {
    const { props } = usePage<{ locale: string }>();
    const locale = props.locale;
    const { t, i18n } = useTranslation();

    const localizedFormat = (dateString: string | null, formatStr: string) => {
        if (!dateString) {
            return ''; // Or some other placeholder like 'N/A'
        }
        try {
            const date = new Date(dateString);
            if (isNaN(date.getTime())) {
                return ''; // Invalid Date
            }
            const selectedLocale = i18n.language === 'ar' ? ar : enUS; // Use imported locale objects

            return format(date, formatStr, { locale: selectedLocale }); // Pass locale to format
        } catch (error) {
            console.error("Error formatting date:", error);
            return ''; //Or handle the error as appropriate
        }
    };

    const isRtl = i18n.language === 'ar'; // Use i18n.language for RTL check

    const getLocalizedText = (offer: Offer, field: string) => {
        const localizedFieldValue = i18n.language === 'ar' ? offer[`${field}_ar`] : offer[field];
        return localizedFieldValue || t('No description available.'); // Fallback if localized value is empty
    };


    return (
        <div dir={isRtl ? "rtl" : "ltr"} className="dark:bg-gray-900 dark:text-gray-100">
            <Navbar auth={auth} locale={locale} />
            <HeroSectiion />
            <div className="py-12 bg-gray-100 min-h-screen dark:bg-gray-800">
                <Head title={t('Available Offers')} />
                <div className="max-w-6xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    <h1 className="text-3xl font-semibold text-gray-800 mb-4 dark:text-white">
                        {t('public_offer_header')}
                    </h1>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {offers.map((offer) => (
                            <Card key={offer.id} className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-200 dark:bg-gray-700 dark:border dark:border-gray-600">
                                <div className="relative">
                                    <img
                                        src={offer.image ? `/storage/${offer.image}` : defaultImageUrl}
                                        alt={offer.title}
                                        className="w-full h-48 object-cover object-center"
                                        onError={(e: any) => {
                                            e.target.src = defaultImageUrl;
                                        }}
                                    />
                                    <Badge
                                        variant={offer.is_active ? 'success' : 'destructive'}
                                        className="absolute top-2 right-2 text-sm font-medium dark:text-gray-200"
                                    >
                                        {t(offer.is_active ? 'Active' : 'Inactive')}
                                    </Badge>
                                </div>
                                <CardHeader className="space-y-1.5">
                                    <CardTitle className="text-xl font-semibold line-clamp-1 dark:text-gray-100">
                                        {getLocalizedText(offer, 'title')}
                                    </CardTitle>
                                    <CardDescription className="text-gray-500 line-clamp-2 dark:text-gray-400">
                                        {getLocalizedText(offer, 'description')}
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="p-4">
                                    <Separator className="dark:bg-gray-600" />
                                    <div className="mt-4 space-y-3">
                                        {offer.discount_percentage && (
                                            <div className="flex items-center gap-x-2 text-gray-700 dark:text-gray-300">
                                                <Percent className="h-4 w-4" />
                                                <span>{t('discount')}: {offer.discount_percentage}%</span>
                                            </div>
                                        )}
                                        {offer.discount_amount && (
                                            <div className="flex items-center gap-x-2 text-gray-700 dark:text-gray-300">
                                                <Tag className="h-4 w-4" />
                                                <span>{t('discount')}: ${offer.discount_amount}</span>
                                            </div>
                                        )}
                                        {offer.start_date && (
                                            <div className="flex items-center gap-x-2 text-gray-700 dark:text-gray-300">
                                                <CalendarDays className="h-4 w-4" />
                                                <span>{t('start_date')}: {localizedFormat(offer.start_date, 'PPP')}</span>
                                            </div>
                                        )}
                                        {offer.end_date && (
                                            <div className="flex items-center gap-x-2 text-gray-700 dark:text-gray-300">
                                                <Timer className="h-4 w-4" />
                                                <span>{t('end_date')}: {localizedFormat(offer.end_date, 'PPP')}</span>
                                            </div>
                                        )}
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                        {offers.length === 0 && (
                            <div className="col-span-full text-center text-gray-500 dark:text-gray-400">
                                {t('No offers available at this time.')}
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <Footer />
        </div >
    );
};

export default PublicOffersComponent;
