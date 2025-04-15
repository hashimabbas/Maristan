import { Link, usePage } from '@inertiajs/react';
import { type SharedData } from '@/types';
import { useState, useEffect, useCallback } from 'react';
import { MenuIcon, XIcon } from 'lucide-react';
import { Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTheme } from "next-themes";
import { useTranslation } from "react-i18next"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"; // Assuming you have a utils file with cn

interface NavbarProps {
    auth: {
        user: any | null;
    };
    locale: string;
}

const LANGUAGES = {
    en: 'English',
    ar: 'Arabic',
};

export default function Navbar({ auth, locale }: NavbarProps) {
    const { t, i18n } = useTranslation();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const { theme, setTheme } = useTheme()

    const toggleTheme = () => {
        setTheme(theme === "light" ? "dark" : "light");
    };

    const isRtl = locale === 'ar';

    const changeLanguage = useCallback((lng: string) => {
        i18n.changeLanguage(lng);
    }, [i18n]);

    const dropdownMenuContentClass = cn(
        "w-56",
        "forceMount",
        isRtl ? "right-0" : "left-0" // Adjust alignment based on RTL
    );

    const dropdownMenuItemClass = cn(
        "cursor-pointer",
        "select-none", // Prevent text selection
        "py-2 px-3",
        "hover:bg-accent",
        "hover:text-accent-foreground",
        "rounded-sm",
        "outline-none", // Remove default focus outline
        "transition-colors",
        "data-[disabled]:pointer-events-none",
        "data-[highlighted]:bg-accent",
        "data-[highlighted]:text-accent-foreground",
        isRtl ? "font-almarai" : "font-inter" // Apply font based on language
    );

    const linkClass = cn(
        "hover:text-[#f53003] dark:hover:text-[#FF4433] dark:text-white block py-2 px-4 md:inline-block",
        isRtl ? "font-almarai" : "font-inter" // Apply font based on language

    );

    return (
        <header className="w-full py-4 bg-[#FDFDFC] dark:bg-[#0a0a0a] shadow-md sticky top-0 z-50">
            <div className="container mx-auto px-6 flex items-center justify-between" dir={isRtl ? "rtl" : "ltr"}>
                {/* Logo */}
                <Link href="/" className="flex items-center">
                    <img
                        src="/logo-removebg.png"
                        alt="Logo"
                        className="h-10 md:h-12 object-contain transition-transform hover:scale-105"
                    />
                </Link>

                {/* Mobile Menu Button */}
                <div className="md:hidden">
                    <button
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="text-[#1b1b18] dark:text-[#EDEDEC] focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[#f53003]"
                        aria-label="Open menu"
                    >
                        {mobileMenuOpen ? (
                            <XIcon className="h-6 w-6" aria-hidden="true" />
                        ) : (
                            <MenuIcon className="h-6 w-6" aria-hidden="true" />
                        )}
                    </button>
                </div>

                {/* Navigation Links */}
                <nav
                    className={`md:block ${mobileMenuOpen
                        ? 'block absolute top-full left-0 w-full dark:text-white bg-[#FDFDFC] dark:bg-[#0a0a0a] py-4 shadow-md'
                        : 'hidden'
                        }`}
                >
                    <ul className="md:flex items-center md:space-x-6 flex-col md:flex-row space-y-4 md:space-y-0 text-center" dir={isRtl ? "rtl" : "ltr"}>
                        {/* Public Links */}
                        <li>
                            <Link
                                href="/"
                                className={linkClass}
                            >
                                {t('home')}
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/about"
                                className={linkClass}
                            >
                                {t('about')}
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/contact"
                                className={linkClass}
                            >
                                {t('contact')}
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/show_offers"
                                className={linkClass}
                            >
                                {t('offers')}
                            </Link>
                        </li>
                        <li>
                            <Button variant="outline" size="icon" onClick={toggleTheme}>
                                {theme === 'light' ? (
                                    <Moon className="h-[1.2rem] w-[1.2rem]" />
                                ) : (
                                    <Sun className="h-[1.2rem] w-[1.2rem] text-white" />
                                )}
                                <span className="sr-only">theme</span>
                            </Button>
                        </li>

                        {/* Language Switcher */}
                        <li>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" className="data-[state=open]:bg-muted h-9 font-inter dark:text-white">
                                        {LANGUAGES[i18n.language as keyof typeof LANGUAGES] || 'Language'}
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className={dropdownMenuContentClass} align="end" forceMount>
                                    {Object.entries(LANGUAGES).map(([key, label]) => (
                                        <DropdownMenuItem key={key} onClick={() => changeLanguage(key)} className={dropdownMenuItemClass}>
                                            {label}
                                        </DropdownMenuItem>
                                    ))}
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </li>

                        {/* Authentication Links */}

                        {/* {auth.user ? (
                            <li>
                                <Link
                                    href={route('dashboard')}
                                    className="inline-block rounded-sm border border-[#19140035] px-5 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#1915014a] dark:border-[#3E3E3A] dark:text-[#EDEDEC] dark:hover:border-[#62605b] block py-2 px-4 md:inline-block"
                                >
                                    dashboard
                                </Link>
                            </li>
                        ) : (
                            <>
                                <li>
                                    <Link
                                        href={route('login')}
                                        className="inline-block rounded-sm border border-transparent px-5 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#19140035] dark:text-[#EDEDEC] dark:hover:border-[#3E3E3A] block py-2 px-4 md:inline-block"
                                    >
                                        login
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href={route('register')}
                                        className="inline-block rounded-sm border border-[#19140035] px-5 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#1915014a] dark:border-[#3E3E3A] dark:text-[#EDEDEC] dark:hover:border-[#62605b] block py-2 px-4 md:inline-block"
                                    >
                                        register
                                    </Link>
                                </li>
                            </>
                        )} */}
                    </ul>
                </nav>
            </div>
        </header>
    );
}
