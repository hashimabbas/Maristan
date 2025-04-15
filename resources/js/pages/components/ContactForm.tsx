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
import { useTranslation } from 'react-i18next';

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
  const { t, i18n } = useTranslation(); // Import i18n
  const isRtl = i18n.language === 'ar'; // RTL checker
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
          t("contactForm.toastSuccess")
        )
      },
      onError: () => {
        setSubmissionStatus('error');
        toast(
          t("contactForm.toastError"),
        )
      },
    });
  };

  return (
    <div className="py-12 bg-gradient-to-br dark:bg-gray-700 min-h-screen">
      <Head title={t("contactForm.title")} />
      <div className="max-w-5xl mx-auto">
        <Card className="shadow-xl rounded-2xl overflow-hidden">
          <div className={cn("md:grid md:grid-cols-2 gap-8 dark:bg-gray-700 dark:text-white p-8", isRtl ? 'flex-row-reverse' : 'flex-row')} dir={isRtl ? "rtl" : "ltr"}>
            <div className="p-6">
              <CardHeader>
                <CardTitle className="text-3xl font-extrabold text-primary tracking-tight">
                  {t("contactForm.cardTitle")}
                </CardTitle>
                <CardDescription className="text-gray-600 dark:text-white">
                  {t("contactForm.cardDescription")}
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-4">
                {submissionStatus === 'success' && (
                  <Alert className='bg-green-700 text-white'>
                    <CheckCircle className="h-4 w-4" />
                    <AlertTitle>{t("contactForm.successAlert")}</AlertTitle>
                    <AlertDescription className='text-white'>
                      {t("contactForm.successAlertDescription")}
                    </AlertDescription>
                  </Alert>
                )}

                {submissionStatus === 'error' && (
                  <Alert variant="destructive">
                    <XCircle className="h-4 w-4" />
                    <AlertTitle>{t("contactForm.errorAlert")}</AlertTitle>
                    <AlertDescription>
                      {t("contactForm.errorAlertDescription")}
                    </AlertDescription>
                  </Alert>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="name" className='text-primary'>{t("contactForm.nameLabel")}</Label>
                    <Input
                      id="name"
                      type="text"
                      name="name"
                      value={data.name}
                      className="mt-1 block w-full" // Remove redundant class names
                      autoComplete="name"
                      onChange={handleInputChange}
                      required
                      placeholder={t("contactForm.namePlaceholder")}
                    />
                    {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                  </div>

                  <div>
                    <Label htmlFor="email" className='text-primary'>{t("contactForm.emailLabel")}</Label>
                    <Input
                      id="email"
                      type="email"
                      name="email"
                      value={data.email}
                      className="mt-1 block w-full"
                      autoComplete="email"
                      onChange={handleInputChange}
                      required
                      placeholder={t("contactForm.emailPlaceholder")}
                    />
                    {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                  </div>

                  <div>
                    <Label htmlFor="phone" className='text-primary'>{t("contactForm.phoneLabel")}</Label>
                    <Input
                      id="phone"
                      type="text"
                      name="phone"
                      value={data.phone}
                      className="mt-1 block w-full"
                      autoComplete="tel"
                      onChange={handleInputChange}
                      placeholder={t("contactForm.phonePlaceholder")}
                    />
                    {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                  </div>

                  <div>
                    <Label htmlFor="message" className='text-primary'>{t("contactForm.messageLabel")}</Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={data.message}
                      className="mt-1 block w-full"
                      onChange={handleInputChange}
                      required
                      rows={5}
                      placeholder={t("contactForm.messagePlaceholder")}
                    />
                    {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message}</p>}
                  </div>

                  <Button disabled={processing} className="w-full" type="submit">
                    {processing ? t("contactForm.sendingButton") : t("contactForm.sendButton")}
                  </Button>

                </form>
              </CardContent>
            </div>

            <div className="bg-gray-50 p-6 flex flex-col justify-between">
              <div>
                <h2 className="text-2xl font-semibold text-primary mb-4">{t("contactForm.contactInformation")}</h2>
                <div className="mb-4">
                  <p className="font-bold text-gray-700"><FontAwesomeIcon icon={faEnvelope} className="mr-2" /> {t("contactForm.email")}:</p>
                  <a href="mailto:Info@maristanpharma.com" className="text-blue-500 hover:underline">Info@maristanpharma.com</a>
                </div>
                <div className="mb-4">
                  <p className="font-bold text-gray-700"><FontAwesomeIcon icon={faPhone} className="mr-2" /> {t("contactForm.phone")}:</p>
                  <a href="tel:+249912197771">+24991 219 7771</a>
                </div>
                <div>
                  <p className="font-bold text-gray-700"><FontAwesomeIcon icon={faMapMarkerAlt} className="mr-2" /> {t("contactForm.address")}:</p>
                  <p className="text-gray-600">{t("contactForm.atbaraSudan")}</p>
                  <p className="text-gray-600">{t("contactForm.blockBuilding")}</p>
                </div>
              </div>

              <div className="mt-8">
                <h3 className="text-xl font-semibold text-primary mb-2">{t("contactForm.connectWithMe")}</h3>
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
