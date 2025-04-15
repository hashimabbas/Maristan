import React, { useEffect } from 'react';
import { Head, Link, useForm, router } from '@inertiajs/react'; // Import router if needed for redirects etc.
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem, type User } from '@/types'; // Assuming User type exists

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

// Define a type for the Offer object passed from the controller
// Adjust properties based on your actual Offer model
interface OfferType {
    id: number;
    title: string;
    title_ar: string;
    description: string | null;
    description_ar: string | null;
    discount_percentage: number | null; // Or string if handled that way
    start_date: string | null; // Assuming YYYY-MM-DD format
    end_date: string | null;   // Assuming YYYY-MM-DD format
    image_url: string | null; // URL to the existing image
    is_active: boolean | number; // Could be boolean or 0/1
    // Add other relevant fields if needed
}

interface Props {
    auth: {
        user: User; // Use your defined User type
    };
    errors: Record<string, string>;
    offer: OfferType; // Add the offer prop
    breadcrumbs: BreadcrumbItem[]; // Pass breadcrumbs from controller
}

// Define the structure for the form data state
interface OfferFormData {
    _method: 'PUT'; // Method spoofing for update
    title: string;
    title_ar: string;
    description: string;
    description_ar: string;
    discount_percentage: string; // Keep as string for input compatibility
    start_date: string;
    end_date: string;
    image: File | null; // Represents the *new* image to upload
    is_active: boolean;
}

const OffersEdit: React.FC<Props> = ({ auth, errors, offer, breadcrumbs }) => {
    const { data, setData, post, processing, recentlySuccessful, clearErrors, reset } = useForm<OfferFormData>({
        _method: 'PUT', // Important for Laravel update routes with FormData
        title: offer.title || '',
        title_ar: offer.title_ar || '',
        description: offer.description || '',
        description_ar: offer.description_ar || '',
        discount_percentage: offer.discount_percentage?.toString() || '', // Convert number to string for input
        start_date: offer.start_date || '', // Ensure correct date format if needed
        end_date: offer.end_date || '',   // Ensure correct date format if needed
        image: null, // Start with null, only set if a *new* image is selected
        is_active: !!offer.is_active, // Ensure boolean type (converts 0/1 if needed)
    });

    // Effect to clear errors if the user starts typing in a field again
    useEffect(() => {
        // You might want more specific error clearing logic if needed
    }, [data]); // Rerun when data changes

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const key = event.target.name as keyof Omit<OfferFormData, 'image' | 'is_active' | '_method'>;
        setData(key, event.target.value);
        clearErrors(key); // Clear specific error on change
    };

    const handleCheckboxChange = (checked: boolean | 'indeterminate') => {
        // Checkbox component might return 'indeterminate', handle boolean case
        if (typeof checked === 'boolean') {
            setData('is_active', checked);
            clearErrors('is_active');
        }
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0] || null;
        setData('image', file); // Update the state with the selected file (or null)
        clearErrors('image');
    };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();

        // 'post' method from useForm handles FormData creation and _method spoofing
        post(route('offers.update', offer.id), {
            // data is automatically sent by the hook
            // Optional callbacks:
            onSuccess: () => {
                // Optional: Show a success toast/message
                // Optional: Reset only the file input state after successful upload
                // reset('image'); // If you want the file input to clear
            },
            onError: () => {
                // Optional: Handle specific error logic
            },
            preserveScroll: true, // Keep scroll position on validation errors
            // preserveState: false, // Set to false if you want page props to refresh completely on success
            // Set to true to keep component state on validation error
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Edit Offer - ${offer.title}`} />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <Card>
                        <CardHeader>
                            <CardTitle>Edit Offer</CardTitle>
                            <CardDescription>Update the details for offer: "{offer.title}".</CardDescription>
                        </CardHeader>
                        <CardContent>
                            {recentlySuccessful && (
                                <Alert variant="success" className="mb-4">
                                    <CheckCircledIcon className="h-4 w-4" />
                                    <AlertTitle>Success!</AlertTitle>
                                    <AlertDescription>Offer updated successfully.</AlertDescription>
                                </Alert>
                            )}

                            {/* Display Server-Side Validation Errors */}
                            {Object.keys(errors).length > 0 && (
                                <Alert variant="destructive" className="mb-4">
                                    <ExclamationTriangleIcon className="h-4 w-4" />
                                    <AlertTitle>Validation Error</AlertTitle>
                                    <AlertDescription>
                                        Please check the form fields for errors.
                                        {/* Optionally list specific errors */}
                                        {/* <ul>
                                            {Object.entries(errors).map(([key, value]) => (
                                                <li key={key}>- {value}</li>
                                            ))}
                                        </ul> */}
                                    </AlertDescription>
                                </Alert>
                            )}


                            <form onSubmit={handleSubmit} className="space-y-6"> {/* Increased spacing */}
                                {/* Input Fields Loop (same as create) */}
                                {[
                                    { id: "title", label: "Title (English)", type: "text" },
                                    { id: "title_ar", label: "Title (Arabic)", type: "text" },
                                    { id: "description", label: "Description (English)", type: "textarea" },
                                    { id: "description_ar", label: "Description (Arabic)", type: "textarea" },
                                    { id: "discount_percentage", label: "Discount Percentage", type: "number", step: "0.01" }, // Added step for decimals
                                    { id: "start_date", label: "Start Date", type: "date" },
                                    { id: "end_date", label: "End Date", type: "date" },
                                ].map(({ id, label, type, ...props }) => (
                                    <div key={id}>
                                        <Label htmlFor={id} className="mb-1 block">{label}:</Label> {/* Added margin */}
                                        {type === "textarea" ? (
                                            <Textarea
                                                id={id}
                                                name={id}
                                                value={data[id as keyof Omit<OfferFormData, 'image' | 'is_active' | '_method'>]}
                                                onChange={handleInputChange}
                                                className={errors[id] ? 'border-red-500' : ''} // Highlight error field
                                            />
                                        ) : (
                                            <Input
                                                type={type}
                                                id={id}
                                                name={id}
                                                value={data[id as keyof Omit<OfferFormData, 'image' | 'is_active' | '_method'>]}
                                                onChange={handleInputChange}
                                                className={errors[id] ? 'border-red-500' : ''} // Highlight error field
                                                {...props} // Pass extra props like 'step'
                                            />
                                        )}
                                        {errors[id] && (
                                            <p className="text-sm text-red-600 mt-1">{errors[id]}</p> // Simplified error display
                                        )}
                                    </div>
                                ))}

                                {/* Image Handling Section */}
                                <div>
                                    <Label htmlFor="image">Update Image (Optional):</Label>
                                    {/* Display Current Image */}
                                    {offer.image_url && !data.image && ( // Show current only if no new image is selected
                                        <div className="my-2">
                                            <p className="text-sm text-gray-600 mb-1">Current Image:</p>
                                            <img
                                                src={offer.image_url}
                                                alt="Current offer image"
                                                className="max-w-xs max-h-40 object-contain border rounded"
                                            />
                                        </div>
                                    )}
                                    {/* Display New Image Preview (if a new file is selected) */}
                                    {data.image && (
                                        <div className="my-2">
                                            <p className="text-sm text-gray-600 mb-1">New Image Preview:</p>
                                            <img
                                                src={URL.createObjectURL(data.image)} // Create temporary URL for preview
                                                alt="New image preview"
                                                className="max-w-xs max-h-40 object-contain border rounded"
                                                onLoad={(e) => URL.revokeObjectURL((e.target as HTMLImageElement).src)} // Clean up temporary URL
                                            />
                                        </div>
                                    )}

                                    <Input
                                        type="file"
                                        id="image"
                                        name="image"
                                        onChange={handleFileChange}
                                        className={errors.image ? 'border-red-500' : ''}
                                        accept="image/*" // Suggest image file types
                                    />
                                    {errors.image && (
                                        <p className="text-sm text-red-600 mt-1">{errors.image}</p>
                                    )}
                                    <p className="text-xs text-gray-500 mt-1">Leave blank to keep the current image.</p>
                                </div>

                                {/* Active Checkbox */}
                                <div className="space-y-2">
                                    <div className="flex items-center space-x-2">
                                        <Checkbox
                                            id="is_active"
                                            checked={data.is_active}
                                            onCheckedChange={handleCheckboxChange}
                                        />
                                        <Label htmlFor="is_active" className="cursor-pointer">Active</Label>
                                    </div>
                                    {errors.is_active && (
                                        <p className="text-sm text-red-600 mt-1">{errors.is_active}</p>
                                    )}
                                </div>

                                {/* Action Buttons */}
                                <div className="flex gap-4 pt-4"> {/* Added padding top */}
                                    <Button type="submit" disabled={processing}>
                                        {processing ? 'Saving...' : 'Update Offer'}
                                    </Button>
                                    <Link href={route('offers.index')}>
                                        <Button type="button" variant="outline">Cancel</Button> {/* Changed variant */}
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

export default OffersEdit;
