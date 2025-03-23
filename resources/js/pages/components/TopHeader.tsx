import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faXTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons'; // Import envelope and phone icons

import React from 'react';

function TopHeader() {
    return (
        <div className="bg-[#333333] text-white py-2">
            <div className="container mx-auto px-6 flex items-center justify-between">
                {/* Contact Information */}
                <div className="flex items-center space-x-4 text-sm">
                    <a href="mailto:marstan9771@gmail.com" className="hover:text-[#f53003] flex items-center">
                        <FontAwesomeIcon icon={faEnvelope} className="mr-1" />
                        marstan9771@gmail.com
                    </a>
                    <a href="tel:+249912197771" className="hover:text-[#f53003] flex items-center">
                        <FontAwesomeIcon icon={faPhone} className="mr-1" />
                        +24991 219 7771
                    </a>
                </div>

                {/* Social Media Icons */}
                <div className="flex items-center space-x-4">
                    <a href="#" className="hover:text-[#f53003]">
                        <FontAwesomeIcon icon={faFacebook} size="lg" />
                    </a>
                    <a href="#" className="hover:text-[#f53003]">
                        <FontAwesomeIcon icon={faXTwitter} size="lg" />
                    </a>
                    <a href="#" className="hover:text-[#f53003]">
                        <FontAwesomeIcon icon={faInstagram} size="lg" />
                    </a>
                </div>
            </div>
        </div>
    );
}

export default TopHeader;
