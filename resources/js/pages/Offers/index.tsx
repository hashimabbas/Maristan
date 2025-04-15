import React, { useState } from 'react';
import { Head, Link, usePage, useForm } from '@inertiajs/react';
// Make sure Offer type includes all necessary fields, including id
import { Offer, type BreadcrumbItem } from '@/types';
import AppLayout from '@/layouts/app-layout';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Edit, Eye, Trash2 } from 'lucide-react';
import { format } from 'date-fns';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger, // <-- Import AlertDialogTrigger
} from "@/components/ui/alert-dialog";
import { toast } from 'sonner'; // Example: Using sonner for notifications


interface Props {
    // Ensure the Offer type passed here includes 'id' and 'image' if it's optional
    offers: Offer[];
    // You might want to pass flash messages for success/error display
    flash?: {
        success?: string;
        error?: string;
    };
}

// Assuming Offer type looks something like this (adjust as needed):
// interface Offer {
//     id: number;
//     title: string;
//     description: string | null;
//     discount_percentage: number | null;
//     discount_amount: number | null; // Added based on your code
//     start_date: string | null;
//     end_date: string | null;
//     is_active: boolean | number;
//     usage_limit: number | null;
//     usage_count: number;
//     image?: string | null; // Make image optional if it can be null
//     image_url?: string | null; // If you pass a pre-built URL
// }

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'Offers',
        href: route('offers.index'), // Add current page breadcrumb
    }
];

const OffersIndex: React.FC<Props> = ({ offers, flash }) => {
    const { auth } = usePage().props as any; // Cast props if needed, or define a type
    const [offerToDelete, setOfferToDelete] = useState<number | null>(null);
    // Use useForm for the delete action
    const { delete: destroy, processing } = useForm({}); // 'delete' is a reserved keyword, alias it

    // --- Delete handlers ---
    const handleDeleteClick = (offerId: number) => {
        setOfferToDelete(offerId);
    };

    const confirmDelete = () => {
        if (offerToDelete === null) return; // Should not happen if dialog is open, but safe check

        destroy(route('offers.destroy', offerToDelete), { // Use the correct route name
            preserveScroll: true, // Keep scroll position after delete
            onSuccess: () => {
                setOfferToDelete(null); // Close the dialog
                toast.success(flash?.success || 'Offer deleted successfully.'); // Show success toast
            },
            onError: (errors) => {
                setOfferToDelete(null); // Close the dialog even on error
                console.error("Delete Error:", errors);
                toast.error(flash?.error || 'Failed to delete offer. Please try again.'); // Show error toast
            },
            // onFinish: () => { // Alternative: Close dialog regardless of success/error
            //     setOfferToDelete(null);
            // }
        });
    };

    const cancelDelete = () => {
        setOfferToDelete(null); // Close the dialog
    };
    // --- ---

    // Display flash messages if passed via controller .with()
    React.useEffect(() => {
        if (flash?.success) {
            // Use a toast library or a simple alert
            toast.success(flash.success);
        }
        if (flash?.error) {
            toast.error(flash.error);
        }
    }, [flash]);


    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Offers" />

            <div className="w-full py-6 md:py-12"> {/* Added padding */}
                <Card className="max-w-7xl mx-auto"> {/* Centered card */}
                    <CardHeader className="flex flex-col md:flex-row md:items-center justify-between space-y-2 md:space-y-0 pb-4">
                        <div>
                            <CardTitle>Offers</CardTitle>
                            <CardDescription>Manage your offers here.</CardDescription>
                        </div>
                        <Link href={route('offers.create')}>
                            <Button>Create New Offer</Button>
                        </Link>
                    </CardHeader>
                    <CardContent>
                        <div className="w-full rounded-md border md:border-0">
                            <Table>
                                <TableHeader>
                                    <TableRow className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted md:table-row hidden">
                                        {/* Adjusted Headers based on fields shown */}
                                        <TableHead className="px-4 py-3 md:table-cell">Title</TableHead>
                                        <TableHead className="px-4 py-3 md:table-cell">Discount</TableHead>
                                        <TableHead className="px-4 py-3 md:table-cell hidden lg:table-cell">Start Date</TableHead>
                                        <TableHead className="px-4 py-3 md:table-cell hidden lg:table-cell">End Date</TableHead>
                                        <TableHead className="px-4 py-3 md:table-cell">Active</TableHead>
                                        <TableHead className="px-4 py-3 md:table-cell hidden xl:table-cell">Usage Limit</TableHead>
                                        <TableHead className="px-4 py-3 md:table-cell hidden xl:table-cell">Used</TableHead>
                                        <TableHead className="px-4 py-3 md:table-cell">Image</TableHead>
                                        <TableHead className="px-4 py-3 text-right md:table-cell">Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {offers.length > 0 ? (
                                        offers.map((offer) => (
                                            <TableRow
                                                key={offer.id}
                                                className="block border-b p-4 mb-4 rounded-md shadow-sm bg-background md:table-row md:border-b-0 md:p-0 md:mb-0 md:shadow-none hover:bg-muted/50 data-[state=selected]:bg-muted"
                                            >
                                                {/* --- Title --- */}
                                                <TableCell
                                                    data-label="Title:"
                                                    className="flex justify-between items-center text-right font-medium md:table-cell md:text-left md:font-normal md:px-4 md:py-3 before:content-[attr(data-label)] before:font-semibold before:text-left md:before:content-none"
                                                >
                                                    {/* Link title to show page if exists */}
                                                    <Link href={route('offers.show', offer.id)} className="hover:underline">
                                                        {offer.title}
                                                    </Link>
                                                </TableCell>

                                                {/* --- Discount --- */}
                                                <TableCell
                                                    data-label="Discount:"
                                                    className="flex justify-between items-center text-right md:table-cell md:text-left md:px-4 md:py-3 before:content-[attr(data-label)] before:font-semibold before:text-left md:before:content-none"
                                                >
                                                    <span>
                                                        {offer.discount_percentage
                                                            ? `${offer.discount_percentage}%`
                                                            : offer.discount_amount
                                                                ? `$${offer.discount_amount}` // Assuming dollar sign, adjust currency as needed
                                                                : 'N/A'}
                                                    </span>
                                                </TableCell>

                                                {/* --- Start Date (Hidden on smaller screens) --- */}
                                                <TableCell
                                                    data-label="Start Date:"
                                                    className="hidden justify-between items-center text-right lg:table-cell md:text-left md:px-4 md:py-3 before:content-[attr(data-label)] before:font-semibold before:text-left md:before:content-none"
                                                >
                                                    <span>{offer.start_date ? format(new Date(offer.start_date), 'PP') : 'N/A'}</span>
                                                </TableCell>

                                                {/* --- End Date (Hidden on smaller screens) --- */}
                                                <TableCell
                                                    data-label="End Date:"
                                                    className="hidden justify-between items-center text-right lg:table-cell md:text-left md:px-4 md:py-3 before:content-[attr(data-label)] before:font-semibold before:text-left md:before:content-none"
                                                >
                                                    <span>{offer.end_date ? format(new Date(offer.end_date), 'PP') : 'N/A'}</span>
                                                </TableCell>

                                                {/* --- Active Status --- */}
                                                <TableCell
                                                    data-label="Status:"
                                                    className="flex justify-between items-center text-right md:table-cell md:text-left md:px-4 md:py-3 before:content-[attr(data-label)] before:font-semibold before:text-left md:before:content-none"
                                                >
                                                    {/* Use Badge variants from your UI library */}
                                                    <Badge variant={offer.is_active ? 'default' : 'destructive'} className={offer.is_active ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'}>
                                                        {offer.is_active ? 'Active' : 'Inactive'}
                                                    </Badge>
                                                </TableCell>

                                                {/* --- Usage Limit (Hidden on smaller screens) --- */}
                                                <TableCell
                                                    data-label="Limit:"
                                                    className="hidden justify-between items-center text-right xl:table-cell md:text-left md:px-4 md:py-3 before:content-[attr(data-label)] before:font-semibold before:text-left md:before:content-none"
                                                >
                                                    <span>{offer.usage_limit ?? 'Unlimited'}</span>
                                                </TableCell>

                                                {/* --- Usage Count (Hidden on smaller screens) --- */}
                                                <TableCell
                                                    data-label="Used:"
                                                    className="hidden justify-between items-center text-right xl:table-cell md:text-left md:px-4 md:py-3 before:content-[attr(data-label)] before:font-semibold before:text-left md:before:content-none"
                                                >
                                                    <span>{offer.usage_count}</span>
                                                </TableCell>

                                                {/* --- Image --- */}
                                                <TableCell
                                                    data-label="Image:"
                                                    className="flex justify-between items-center text-right md:table-cell md:text-left md:px-4 md:py-3 before:content-[attr(data-label)] before:font-semibold before:text-left md:before:content-none"
                                                >
                                                    {/* Use offer.image_url if generated by controller, otherwise construct path */}
                                                    {offer.image ? (
                                                        <img
                                                            // Assuming image is stored in public disk and storage is linked
                                                            // If you pass image_url directly from controller, use that
                                                            src={offer.image_url ?? `/storage/${offer.image}`}
                                                            alt={offer.title}
                                                            className="h-10 w-14 object-cover rounded ml-auto md:ml-0" // Adjust size as needed
                                                            loading="lazy" // Add lazy loading for images
                                                        />
                                                    ) : (
                                                        <span className="text-xs text-muted-foreground ml-auto md:ml-0">No Image</span>
                                                    )}
                                                </TableCell>

                                                {/* --- Actions --- */}
                                                <TableCell
                                                    data-label="Actions:"
                                                    className="flex justify-end items-center pt-3 md:pt-0 md:table-cell md:text-right md:px-4 md:py-3 before:content-[attr(data-label)] before:font-semibold before:text-left before:self-center md:before:content-none"
                                                >
                                                    <div className="flex gap-1 justify-end">
                                                        {/* Show Button */}
                                                        <Link href={route('offers.show', offer.id)}>
                                                            <Button variant="outline" size="icon" className="h-8 w-8">
                                                                <Eye className="h-4 w-4" />
                                                                <span className="sr-only">View Offer</span>
                                                            </Button>
                                                        </Link>
                                                        {/* Edit Button */}
                                                        <Link href={route('offers.edit', offer.id)}>
                                                            <Button variant="outline" size="icon" className="h-8 w-8">
                                                                <Edit className="h-4 w-4" />
                                                                <span className="sr-only">Edit Offer</span>
                                                            </Button>
                                                        </Link>
                                                        {/* Delete Button Trigger */}
                                                        <AlertDialog>
                                                            <AlertDialogTrigger asChild>
                                                                {/* Button that opens the dialog */}
                                                                <Button
                                                                    variant="destructive"
                                                                    size="icon"
                                                                    className="h-8 w-8"
                                                                    // No onClick here, trigger handles opening
                                                                    // Pass the ID here to the handler if needed, but state is better
                                                                    onClick={() => handleDeleteClick(offer.id)}
                                                                >
                                                                    <Trash2 className="h-4 w-4" />
                                                                    <span className="sr-only">Delete Offer</span>
                                                                </Button>
                                                            </AlertDialogTrigger>
                                                            {/* Content is conditionally rendered below */}
                                                        </AlertDialog>
                                                    </div>
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    ) : (
                                        <TableRow>
                                            <TableCell colSpan={9} className="h-24 text-center text-muted-foreground">
                                                No offers found.
                                            </TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </div>
                        {/* Add Pagination Links Here if using pagination */}
                        {/* <div className="mt-4">
                             <Pagination links={offers.links} />
                         </div> */}
                    </CardContent>
                </Card>
            </div>

            {/* --- Alert Dialog for Delete Confirmation --- */}
            {/* Render the content ONLY when offerToDelete is set */}
            {offerToDelete !== null && (
                <AlertDialog open={offerToDelete !== null} onOpenChange={(isOpen) => !isOpen && cancelDelete()}>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                                This action cannot be undone. This will permanently delete the offer
                                {/* Optionally display offer title here */}
                                {/* {offers.find(o => o.id === offerToDelete)?.title} */}
                                and remove its data from our servers.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel onClick={cancelDelete} disabled={processing}>
                                Cancel
                            </AlertDialogCancel>
                            <AlertDialogAction
                                disabled={processing}
                                onClick={confirmDelete}
                                className="bg-red-600 hover:bg-red-700" // Style confirm button
                            >
                                {processing ? (
                                    <>
                                        {/* Add a spinner icon here */}
                                        Deleting...
                                    </>
                                ) : (
                                    'Delete'
                                )}
                            </AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            )}
        </AppLayout>
    );
};

export default OffersIndex;
