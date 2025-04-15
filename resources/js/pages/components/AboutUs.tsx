import React from 'react';
import { TextAnimate } from "./../../../js/components/ui/magicui/text-animate";
import { useTranslation } from 'react-i18next';
import { cn } from "@/lib/utils";
import { ReactNode } from 'react';

interface AboutUsProps { // Add this interface to define the props
    children?: ReactNode; // Make children optional
}

function AboutUs({ children }: AboutUsProps) {
    const { t, i18n } = useTranslation();
    const isRtl = i18n.language === 'ar';

    const textAlignmentClass = isRtl ? 'text-right' : 'text-left';
    const textAlignStartClass = isRtl ? 'md:text-right' : 'md:text-left';
    const floatClass = isRtl ? 'md:float-left' : 'md:float-right';

    return (
        <section className="bg-white py-12 px-6 rounded-2xl shadow-md dark:bg-gray-900 dark:text-gray-100 mt-6">
            <div className="container mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center" dir={isRtl ? "rtl" : "ltr"}>
                    <div className={`relative ${floatClass}`}>
                        <img
                            src="/images/medicine-2994788_1280.jpg"
                            alt={t("aboutUs.title")}
                            className="w-full rounded-xl object-cover shadow-lg transition-transform duration-300 hover:scale-105"
                            style={{ aspectRatio: '4/3', maxWidth: '450px', margin: '0 auto' }}
                        />
                    </div>
                    <div>
                        <h2 className={cn("text-3xl font-extrabold text-primary mb-4", textAlignmentClass)}>
                            {isRtl ? (t('aboutUs.title')) : (
                                <TextAnimate animation="blurInUp" by="character" once>
                                    {t('aboutUs.title')}
                                </TextAnimate>
                            )}
                        </h2>
                        <div className={`prose lg:prose-lg max-w-none text-gray-700 dark:text-gray-300 ${textAlignStartClass}`}>
                            <p>
                                {t('aboutUs.paragraph1')}
                            </p>
                            <p>
                                {t('aboutUs.paragraph2')}
                            </p>
                            <p>
                                {t('aboutUs.paragraph3')}
                            </p>
                        </div>
                        <div className="mt-6">
                            <a
                                href="#"
                                className="inline-block bg-primary hover:bg-indigo-700 text-white font-semibold py-2.5 px-5 rounded-lg transition-colors duration-200 shadow-md dark:bg-primary dark:hover:bg-indigo-400"
                            >
                                {isRtl ? (t('aboutUs.title')) : (
                                    <TextAnimate animation="blurInUp" by="character" once>
                                        {t('aboutUs.learnMore')}
                                    </TextAnimate>
                                )}


                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default AboutUs;
