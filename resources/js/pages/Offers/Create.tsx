import React from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { CheckCircledIcon, ExclamationTriangleIcon } from "@radix-ui/react-icons";

interface Props {
    auth: {
        user: any;
    };
    errors: Record<string, string>;
}

interface OfferFormData {
    title: string;
    title_ar: string;
    description: string;
    description_ar: string;
    discount_percentage: string;
    start_date: string;
    end_date: string;
    image: File | null;
    is_active: boolean;
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

const OffersCreate: React.FC<Props> = ({ auth, errors }) => {
    const { data, setData, post, processing, wasSuccessful, clearErrors } = useForm<OfferFormData>({
        title: '',
        title_ar: '',
        description: '',
        description_ar: '',
        discount_percentage: '',
        start_date: '',
        end_date: '',
        image: null,
        is_active: true,
    });

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setData(event.target.name as keyof OfferFormData, event.target.value);
        clearErrors(event.target.name);
    };

    const handleCheckboxChange = (checked: boolean) => {
        setData('is_active', checked);
        clearErrors('is_active');
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0] || null;
        if (file) {
            setData('image', file);  // Store the file in the form data
            clearErrors('image');
        }
    };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();

        const formData = new FormData();
        formData.append('title', data.title);
        formData.append('title_ar', data.title_ar);
        formData.append('description', data.description || '');
        formData.append('description_ar', data.description_ar || '');
        formData.append('discount_percentage', data.discount_percentage || '');
        formData.append('start_date', data.start_date || '');
        formData.append('end_date', data.end_date || '');
        formData.append('is_active', data.is_active ? '1' : '0'); // Convert boolean to string

        if (data.image) {
            formData.append('image', data.image); // Append image file
        }

        post(route('offers.store'), formData, {
            onSuccess: () => {
                setData({
                    title: '',
                    title_ar: '',
                    description: '',
                    description_ar: '',
                    discount_percentage: '',
                    start_date: '',
                    end_date: '',
                    image: null,
                    is_active: true,
                });
            },
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create Offer" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <Card>
                        <CardHeader>
                            <CardTitle>Create Offer </CardTitle>
                            <CardDescription>Create a new offer here.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            {wasSuccessful && (
                                <Alert variant="success">
                                    <CheckCircledIcon className="h-4 w-4" />
                                    <AlertTitle>Success!</AlertTitle>
                                    <AlertDescription>Offer created successfully.</AlertDescription>
                                </Alert>
                            )}

                            <form onSubmit={handleSubmit} className="space-y-4" encType="multipart/form-data">
                                {[
                                    { id: "title", label: "Title (English)", type: "text" },
                                    { id: "title_ar", label: "Title (Arabic)", type: "text" },
                                    { id: "description", label: "Description (English)", type: "textarea" },
                                    { id: "description_ar", label: "Description (Arabic)", type: "textarea" },
                                    { id: "discount_percentage", label: "Discount Percentage", type: "number" },
                                    { id: "start_date", label: "Start Date", type: "date" },
                                    { id: "end_date", label: "End Date", type: "date" },
                                ].map(({ id, label, type }) => (
                                    <div key={id}>
                                        <Label htmlFor={id}>{label}:</Label>
                                        {type === "textarea" ? (
                                            <Textarea
                                                id={id}
                                                name={id}
                                                value={data[id as keyof OfferFormData] as string}
                                                onChange={handleInputChange}
                                            />
                                        ) : (
                                            <Input
                                                type={type}
                                                id={id}
                                                name={id}
                                                value={data[id as keyof OfferFormData] as string}
                                                onChange={handleInputChange}
                                            />
                                        )}
                                        {errors[id] && (
                                            <Alert variant="destructive">
                                                <ExclamationTriangleIcon className="h-4 w-4" />
                                                <AlertTitle>Error!</AlertTitle>
                                                <AlertDescription>{errors[id]}</AlertDescription>
                                            </Alert>
                                        )}
                                    </div>
                                ))}

                                <div>
                                    <Label htmlFor="image">Image:</Label>
                                    <Input
                                        type="file"
                                        id="image"
                                        name="image"
                                        onChange={handleFileChange}
                                    />
                                    {errors.image && (
                                        <Alert variant="destructive">
                                            <ExclamationTriangleIcon className="h-4 w-4" />
                                            <AlertTitle>Error!</AlertTitle>
                                            <AlertDescription>{errors.image}</AlertDescription>
                                        </Alert>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <div className="flex items-center space-x-2">
                                        <Checkbox
                                            id="is_active"
                                            checked={data.is_active}
                                            onCheckedChange={handleCheckboxChange}
                                        />
                                        <Label htmlFor="is_active">Active</Label>
                                    </div>
                                </div>
                                <div className="flex gap-4">
                                    <Button type="submit" disabled={processing}>
                                        {processing ? 'Creating...' : 'Create'}
                                    </Button>
                                    <Link href={route('offers.index')}>
                                        <Button variant="ghost">Cancel</Button>
                                    </Link>
                                </div>
                            </form>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
};

export default OffersCreate;
