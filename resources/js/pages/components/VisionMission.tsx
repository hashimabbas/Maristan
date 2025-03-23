import React from 'react';
import { TextAnimate } from "./../../../js/components/ui/magicui/text-animate";

interface VisionMissionProps { }

const VisionMission: React.FC<VisionMissionProps> = () => {
    return (
        <section className="py-16 bg-gray-50 dark:bg-gray-900">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-center mb-12 text-gray-800 dark:text-white">
                    <TextAnimate animation="scaleUp" by="text">
                        Vision & Mission
                    </TextAnimate>
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Vision */}
                    <div className="rounded-lg shadow-lg p-6 bg-white dark:bg-gray-800 dark:border dark:border-gray-700 transition-colors duration-300 hover:shadow-xl">
                        <div className="flex flex-col items-center text-center mb-6">
                            <img
                                src="/icons/vision.png" // Replace with actual Vision icon URL
                                alt="Vision Icon"
                                className="w-16 h-16 mr-4 object-contain"
                            />
                            <h3 className="text-2xl font-semibold text-gray-900 dark:text-gray-50">
                                <TextAnimate animation="scaleUp" by="text">
                                    Our Vision
                                </TextAnimate>
                            </h3>
                        </div>
                        <p className="text-gray-700 dark:text-gray-400 leading-relaxed">
                            <TextAnimate animation="blurInUp" by="character" once>
                                To provide accessible, innovative pharmaceutical products and services, prioritizing
                                customer satisfaction, sustainability, and community well-being.
                            </TextAnimate>
                        </p>
                    </div>

                    {/* Mission */}
                    <div className="rounded-lg shadow-lg p-6 bg-white dark:bg-gray-800 dark:border dark:border-gray-700 transition-colors duration-300 hover:shadow-xl">
                        <div className="flex flex-col items-center mb-6">
                            <img
                                src="/icons/mission.png" // Replace with actual Mission icon URL
                                alt="Mission Icon"
                                className="w-16 h-16 mr-4 object-contain"
                            />
                            <h3 className="text-2xl font-semibold text-gray-900 dark:text-gray-50">
                                <TextAnimate animation="scaleUp" by="text">
                                    Our Mission
                                </TextAnimate>
                            </h3>
                        </div>
                        <p className="text-gray-700 dark:text-gray-400 leading-relaxed">
                            <TextAnimate animation="blurInUp" by="character" once>
                                Transforming healthcare through excellence, delivering exceptional pharmaceutical
                                solutions, & fostering a healthier tomorrow.
                            </TextAnimate>
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default VisionMission;
