import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';
import { cn } from "@/lib/utils";
import { ReactNode } from 'react';

interface FooterProps {
    className?: string;
}

function Footer({ className }: FooterProps) {
    const { t, i18n } = useTranslation();
    const isRtl = i18n.language === 'ar'; // Check for RTL language
    const textAlignClass = isRtl ? 'text-right' : 'text-center';

    return (
        <footer className={cn("w-full bg-gray-900 text-gray-300 py-12", className)}>
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8" dir={isRtl ? "rtl" : "ltr"}>
                    {/* Contact Information */}
                    <div>
                        <div className={textAlignClass}>
                            <h4 className="text-lg font-semibold mb-4 text-center text-white">{t('footer.contactUs')}</h4>
                            <ul className="list-none pl-0">
                                <li className="mb-2">
                                    <div className="flex items-center text-center justify-center">
                                        <FaEnvelope className="mr-2 text-gray-500" />
                                        <a href="mailto:Info@maristanpharma.com" className="hover:text-white">Info@maristanpharma.com</a>
                                    </div>
                                </li>
                                <li className="mb-2">
                                    <div className="flex items-center text-center justify-center">
                                        <FaPhone className="mr-2 text-gray-500" />
                                        <a href="tel:+249912197771" className="hover:text-white">+24991 219 7771</a>
                                    </div>
                                </li>
                                <li className="flex items-center text-center justify-center">
                                    <FaMapMarkerAlt className="mr-2 text-gray-500 mt-1" />
                                    <span className="flex items-center text-center justify-center">
                                        {t('footer.addressLine1')}<br />
                                        {t('footer.addressLine2')}
                                    </span>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <div className={textAlignClass}>
                            <h4 className="text-lg font-semibold text-center mb-4 text-white">{t('footer.quickLinks')}</h4>
                            <ul className="list-none pl-0 text-center">
                                <li className="mb-2">
                                    <a href="/about" className="hover:text-white">{t('footer.aboutUs')}</a>
                                </li>
                                <li className="mb-2">
                                    <a href="/contact" className="hover:text-white">{t('footer.contactUs')}</a>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Company Information */}
                    <div>
                        <div className={textAlignClass}>
                            <h4 className="text-lg font-semibold mb-4 text-center text-white">{t('footer.companyName')}</h4>
                            <p className="text-sm text-center">
                                {t('footer.companyDescription')}
                            </p>
                        </div>
                    </div>

                    {/* Social Media */}
                    <div>
                        <div className={textAlignClass}>
                            <h4 className="text-lg font-semibold text-center mb-4 text-white">{t('footer.followUs')}</h4>
                            <div className="flex space-x-4 justify-center text-center">
                                <a href="#" className="hover:text-white">
                                    <FaFacebook size={24} />
                                </a>
                                <a href="#" className="hover:text-white">
                                    <FaTwitter size={24} />
                                </a>
                                <a href="#" className="hover:text-white">
                                    <FaInstagram size={24} />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Copyright */}
                <div className="mt-12 pt-8 border-t border-gray-700 text-center">
                    <p className="text-sm">
                        © {new Date().getFullYear()} {t('footer.companyName')}. {t('footer.allRightsReserved')}
                    </p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
