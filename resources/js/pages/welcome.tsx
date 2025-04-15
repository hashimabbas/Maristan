import React, { useEffect } from 'react';
import { type SharedData, PageProps } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import Navbar from './components/Navbar';
import TopHeader from './components/TopHeader';
import { HeroSectiion } from './components/HeroSection';
import AboutUs from './components/AboutUs';
import Footer from './components/Footer';
import VisionMission from './components/VisionMission';
import Values from './components/Values';
import Regions from './components/Regions';
import ProductsServices from './components/ProductsServices';
import KeyStrengths from './components/Key_Strengths';
import AgenciesWon from './components/AgenciesWon';
import OurExclusiveOffers from './components/OurExclusiveOffers';
import WhyChooseMaristan from './components/WhyChooseMaristan';
import "./../i18n"
import { useTranslation } from "react-i18next"
import './../globals.css'

interface WelcomeProps extends PageProps {
    auth: SharedData['auth'];
}

export default function Welcome({ auth }: WelcomeProps) {
    const { props } = usePage<{ locale: string }>();  // Type hint for props object
    const locale = props.locale;


    return (
        <>
            <Head title="Welcome">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
            </Head>
            <div className="flex min-h-screen flex-col items-center bg-[#FDFDFC] text-[#1b1b18] lg:justify-center dark:bg-[#0a0a0a]">
                <Navbar auth={auth} locale={locale} />
                <HeroSectiion />
                <AboutUs />
                <VisionMission />
                <Values />
                <Regions />
                <ProductsServices />
                <KeyStrengths />
                <AgenciesWon />
                <OurExclusiveOffers />
                <WhyChooseMaristan />
                <div className="hidden h-14.5 lg:block"></div>
                <Footer />
            </div>
        </>
    );
}
