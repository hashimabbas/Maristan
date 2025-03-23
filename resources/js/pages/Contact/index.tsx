import React from 'react';
import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import Navbar from './../components/Navbar';
import Footer from './../components/Footer';
import { useTranslation } from "react-i18next"
import ContactForm from '../components/ContactForm';
import { HeroSectiion } from '../components/HeroSection';

interface ContactProps {
    auth: SharedData['auth'];
}

export default function Contact({ auth }: ContactProps) {
    const { props } = usePage<{ locale: string }>();  // Type hint for props object
    const locale = props.locale;

    // useEffect(() => {
    //     if (locale) {
    //         i18n.changeLanguage(locale);
    //     }
    // }, [locale, i18n]);

    return (
        <>
            <Head title="Contact">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
            </Head>
            <div className="flex min-h-screen flex-col items-center bg-[#FDFDFC] text-[#1b1b18] lg:justify-center dark:bg-[#0a0a0a]">
                <Navbar auth={auth} locale={locale} />
                <HeroSectiion />
                <ContactForm errors={{}} />
                <div className="hidden h-14.5 lg:block"></div>
                <Footer />
            </div>
        </>
    );
}
