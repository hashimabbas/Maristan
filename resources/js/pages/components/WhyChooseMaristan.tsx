// src/components/WhyChooseMaristan.tsx

import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { useTranslation } from 'react-i18next'; // Import useTranslation
import { cn } from "@/lib/utils";
import { ReactNode } from 'react';

interface Reason {
    id: number;
    text: string;
}

interface WhyChooseMaristanProps {
    reasons?: Reason[];
    className?: string; // to pass external classNames
}

const WhyChooseMaristan: React.FC<WhyChooseMaristanProps> = ({ reasons, className }) => {
    const { t, i18n } = useTranslation();
    const isRtl = i18n.language === 'ar';

    const staticReasons: Reason[] = [
        { id: 1, text: t('whyChoose.reason1') }, // Use translation function
        { id: 2, text: t('whyChoose.reason2') },
        { id: 3, text: t('whyChoose.reason3') },
        { id: 4, text: t('whyChoose.reason4') },
        { id: 5, text: t('whyChoose.reason5') },
    ];

    const reasonsToDisplay = reasons || staticReasons;

    return (
        <div className={cn("bg-primary text-white p-8 rounded-lg m-5", className)} dir={isRtl ? "rtl" : "ltr"}>
            <h2 className="text-3xl font-bold mb-4 text-center">{t('whyChoose.title')}</h2> {/* Use translation here too */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {reasonsToDisplay.map((reason) => (
                    <div key={reason.id} className="flex items-center bg-white/5 p-4 rounded-lg">
                        <div className={isRtl ? "w-8 h-8 rounded-full bg-lime-400 text-indigo-900 font-bold flex items-center justify-center ml-4" : "w-8 h-8 rounded-full bg-lime-400 text-indigo-900 font-bold flex items-center justify-center mr-4"}>
                            {reason.id}
                        </div>
                        <div className="text-lg">{reason.text}</div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default WhyChooseMaristan;
