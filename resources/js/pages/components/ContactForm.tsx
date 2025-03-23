import React, { useState } from 'react';
import { Head, useForm } from '@inertiajs/react';
// Assuming you have these components defined in your ui folder.  Adjust path if needed.
import { cn } from "@/lib/utils"; // Assuming you have this utility for conditional class names
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faPhone, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import { faFacebook, faGithub, faInstagram, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { CheckCircle, XCircle } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { toast } from "sonner"

interface Props {
    errors: {
        name?: string;
        email?: string;
        phone?: string;
        message?: string;
        attachment?: string;
    };
    success?: string;
}

interface FormData {
    name: string;
    email: string;
    phone: string;
    message: string;
    attachment: File | null;
    [key: string]: any;
}

const ContactForm: React.FC<Props> = ({ errors, success }) => {
    const { data, setData, post, processing, reset, recentlySuccessful } = useForm<FormData>({
        name: '',
        email: '',
        phone: '',
        message: '',
        attachment: null,
    });

    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [submissionStatus, setSubmissionStatus] = useState<'idle' | 'success' | 'error'>('idle');

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = event.target;
        setData(name as keyof FormData, value);
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0] || null;
        setSelectedFile(file);
        setData('attachment', file);
    };


    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSubmissionStatus('idle');

        post(route('contact.store'), {
            onSuccess: () => {
                setSubmissionStatus('success');
                reset();
                setSelectedFile(null);
                toast(
                    "Your message has been sent successfully."
                )
            },
            onError: () => {
                setSubmissionStatus('error');
                toast(
                    "There was an error sending your message. Please try again shortly.",
                )
            },
        });
    };

    return (
        <div className="py-12 bg-gradient-to-br from-gray-100 to-gray-200 min-h-screen">
            <Head title="Contact Us" />
            <div className="max-w-5xl mx-auto">
                <Card className="shadow-xl rounded-2xl overflow-hidden">
                    <div className="md:grid md:grid-cols-2 gap-8 bg-white p-8">
                        <div className="p-6">
                            <CardHeader>
                                <CardTitle className="text-3xl font-extrabold text-gray-800 tracking-tight">
                                    Let's Connect!
                                </CardTitle>
                                <CardDescription className="text-gray-600">
                                    Reach out with any questions, feedback, or collaboration ideas. I'm always happy to hear from you.
                                </CardDescription>
                            </CardHeader>

                            <CardContent className="space-y-4">
                                {submissionStatus === 'success' && (
                                    <Alert className='bg-green-700 text-white'>
                                        <CheckCircle className="h-4 w-4" />
                                        <AlertTitle>Success!</AlertTitle>
                                        <AlertDescription className='text-white'>
                                            Your message has been sent successfully.
                                        </AlertDescription>
                                    </Alert>
                                )}

                                {submissionStatus === 'error' && (
                                    <Alert variant="destructive">
                                        <XCircle className="h-4 w-4" />
                                        <AlertTitle>Error!</AlertTitle>
                                        <AlertDescription>
                                            There was an error sending your message. Please try again shortly.
                                        </AlertDescription>
                                    </Alert>
                                )}

                                <form onSubmit={handleSubmit} className="space-y-4">
                                    <div>
                                        <Label htmlFor="name">Your Name</Label>
                                        <Input
                                            id="name"
                                            type="text"
                                            name="name"
                                            value={data.name}
                                            className="mt-1 block w-full" // Remove redundant class names
                                            autoComplete="name"
                                            onChange={handleInputChange}
                                            required
                                            placeholder="John Doe"
                                        />
                                        {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                                    </div>

                                    <div>
                                        <Label htmlFor="email">Your Email</Label>
                                        <Input
                                            id="email"
                                            type="email"
                                            name="email"
                                            value={data.email}
                                            className="mt-1 block w-full"
                                            autoComplete="email"
                                            onChange={handleInputChange}
                                            required
                                            placeholder="john.doe@example.com"
                                        />
                                        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                                    </div>

                                    <div>
                                        <Label htmlFor="phone">Phone (Optional)</Label>
                                        <Input
                                            id="phone"
                                            type="text"
                                            name="phone"
                                            value={data.phone}
                                            className="mt-1 block w-full"
                                            autoComplete="tel"
                                            onChange={handleInputChange}
                                            placeholder="+249 12345678"
                                        />
                                        {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                                    </div>

                                    <div>
                                        <Label htmlFor="message">Your Message</Label>
                                        <Textarea
                                            id="message"
                                            name="message"
                                            value={data.message}
                                            className="mt-1 block w-full"
                                            onChange={handleInputChange}
                                            required
                                            rows={5}
                                            placeholder="Tell me about your project or inquiry..."
                                        />
                                        {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message}</p>}
                                    </div>

                                    <Button disabled={processing} className="w-full" type="submit">
                                        {processing ? 'Sending...' : 'Send Message'}
                                    </Button>

                                </form>
                            </CardContent>
                        </div>

                        <div className="bg-gray-50 p-6 flex flex-col justify-between">
                            <div>
                                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Contact Information</h2>
                                <div className="mb-4">
                                    <p className="font-bold text-gray-700"><FontAwesomeIcon icon={faEnvelope} className="mr-2" /> Email:</p>
                                    <a href="mailto:marstan9771@gmail.com" className="text-blue-500 hover:underline">marstan9771@gmail.com</a>
                                </div>
                                <div className="mb-4">
                                    <p className="font-bold text-gray-700"><FontAwesomeIcon icon={faPhone} className="mr-2" /> Phone:</p>
                                    <a href="tel:+249912197771">+24991 219 7771</a>
                                </div>
                                <div>
                                    <p className="font-bold text-gray-700"><FontAwesomeIcon icon={faMapMarkerAlt} className="mr-2" /> Address:</p>
                                    <p className="text-gray-600">Atbara, Sudan</p>
                                    <p className="text-gray-600">Block 6, Building 425.</p>
                                </div>
                            </div>

                            <div className="mt-8">
                                <h3 className="text-xl font-semibold text-gray-700 mb-2">Connect with Me</h3>
                                <div className="flex space-x-4">
                                    <a href="#" className="text-gray-500 hover:text-red-500 transition duration-300">
                                        <FontAwesomeIcon icon={faInstagram} size="2x" />
                                    </a>
                                    <a href="#" className="text-gray-500 hover:text-blue-500 transition duration-300">
                                        <FontAwesomeIcon icon={faFacebook} size="2x" />
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default ContactForm;
