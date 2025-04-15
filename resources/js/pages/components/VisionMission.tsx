import React from 'react';
import { TextAnimate } from "./../../../js/components/ui/magicui/text-animate";
import { useTranslation } from 'react-i18next';
import { cn } from "@/lib/utils";
import { ReactNode } from 'react';

interface VisionMissionProps {
    className?: string; // Optional class name for the component
}

const VisionMission: React.FC<VisionMissionProps> = ({ className }) => {
    const { t, i18n } = useTranslation();
    const isRtl = i18n.language === 'ar';
    return (
        <section className={cn("py-16 bg-gray-50 dark:bg-gray-900", className)}>
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-center mb-12 text-primary dark:text-white">
                    <TextAnimate animation="scaleUp" by="text">
                        {t("visionMission.title")}
                    </TextAnimate>
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Vision */}
                    <div className="rounded-lg shadow-lg p-6 bg-white dark:bg-gray-800 dark:border dark:border-gray-700 transition-colors duration-300 hover:shadow-xl">
                        <div className="flex flex-col items-center text-center mb-6">
                            <img
                                src="/icons/vision.png" // Replace with actual Vision icon URL
                                alt={t("visionMission.visionIconAlt")}
                                className="w-16 h-16 mr-4 object-contain"
                            />
                            <h3 className="text-2xl font-semibold text-primary dark:text-gray-50">
                                <TextAnimate animation="scaleUp" by="text">
                                    {t("visionMission.ourVision")}
                                </TextAnimate>
                            </h3>
                        </div>
                        <p className="text-gray-700 dark:text-gray-400 leading-relaxed text-center">
                            {t("visionMission.visionDescription")}
                        </p>
                    </div>

                    {/* Mission */}
                    <div className="rounded-lg shadow-lg p-6 bg-white dark:bg-gray-800 dark:border dark:border-gray-700 transition-colors duration-300 hover:shadow-xl">
                        <div className="flex flex-col items-center mb-6">
                            <img
                                src="/icons/mission.png" // Replace with actual Mission icon URL
                                alt={t("visionMission.missionIconAlt")}
                                className="w-16 h-16 mr-4 object-contain"
                            />
                            <h3 className="text-2xl font-semibold text-primary dark:text-gray-50">
                                <TextAnimate animation="scaleUp" by="text">
                                    {t("visionMission.ourMission")}
                                </TextAnimate>
                            </h3>
                        </div>
                        <p className="text-gray-700 dark:text-gray-400 leading-relaxed text-center">
                            {t("visionMission.missionDescription")}
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default VisionMission;
