import React from 'react';
import { TextAnimate } from "./../../../js/components/ui/magicui/text-animate";

function AboutUs() {
    return (
        <section className="bg-white py-12 px-6 rounded-2xl shadow-md dark:bg-gray-900 dark:text-gray-100 mt-6">
            <div className="container mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                    <div className="relative">
                        <img
                            src="/images/medicine-2994788_1280.jpg"
                            alt="Maristan Pharmaceutical Company"
                            className="w-full rounded-xl object-cover shadow-lg transition-transform duration-300 hover:scale-105" // Added hover effect
                            style={{ aspectRatio: '4/3', maxWidth: '450px', margin: '0 auto' }} // Set max width and center on smaller screens
                        />
                    </div>
                    <div>
                        <h2 className="text-3xl font-extrabold text-gray-800 mb-4 dark:text-white">
                            <TextAnimate animation="blurInUp" by="character" once>
                                Our Commitment to Healthcare
                            </TextAnimate>
                        </h2>
                        <div className="prose lg:prose-lg max-w-none text-gray-700 dark:text-gray-300">
                            <p>
                                Established in 2018, Maristan Pharmaceutical Company is a leading pharmaceutical provider based in Atbara, Sudan.

                            </p>
                            <p>
                                Our core mission is to deliver innovative, affordable, and readily accessible healthcare solutions to the communities we serve.

                            </p>
                            <p>
                                We bring unparalleled expertise to pharmaceutical distribution and retail, guaranteeing consistently high-quality products, prompt delivery, and exceptional customer support, all driven by our deep commitment to improving lives.
                            </p>
                        </div>
                        <div className="mt-6">
                            <a
                                href="#"
                                className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2.5 px-5 rounded-lg transition-colors duration-200 shadow-md dark:bg-indigo-500 dark:hover:bg-indigo-400"
                            >
                                <TextAnimate animation="blurInUp" by="character" once>
                                    Learn More
                                </TextAnimate>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default AboutUs;
