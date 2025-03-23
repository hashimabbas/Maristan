import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa'; // Import icons
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

function Footer() {
    return (
        <footer className="w-full bg-gray-900 text-gray-300 py-12">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* Contact Information */}
                    {/* Contact Information */}
                    <div>
                        <div className="text-center">
                            <h4 className="text-lg font-semibold mb-4 text-white">Contact Us</h4>
                            <ul className="list-none pl-0 text-center"> {/* Added text-center to ul */}
                                <li className="mb-2"> {/* Removed flex items-center */}
                                    <div className='flex items-center justify-center'>
                                        <FaEnvelope className="mr-2 text-gray-500" />
                                        <a href="mailto:marstan9771@gmail.com" className="hover:text-white">marstan9771@gmail.com</a>
                                    </div>
                                </li>
                                <li className="mb-2"> {/* Removed flex items-center */}
                                    <div className='flex items-center justify-center'>
                                        <FaPhone className="mr-2 text-gray-500" />
                                        <a href="tel:+249912197771" className="hover:text-white">+24991 219 7771</a>
                                    </div>
                                </li>
                                <li className="flex items-start justify-center"> {/* Removed flex items-center and add justify center and added flex items start */}
                                    <FaMapMarkerAlt className="mr-2 text-gray-500 mt-1" />
                                    <span>
                                        Atbara, Sudan<br />
                                        Block 6, Building 425.
                                    </span>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <div className="text-center"> {/* Added text-center */}
                            <h4 className="text-lg font-semibold mb-4 text-white">Quick Links</h4>
                            <ul className="list-none pl-0">
                                <li className="mb-2">
                                    <a href="/about" className="hover:text-white">About Us</a>
                                </li>
                                <li className="mb-2">
                                    <a href="/contact" className="hover:text-white">Contact Us</a>
                                </li>

                            </ul>
                        </div>
                    </div>

                    {/* Company Information */}
                    <div>
                        <div className="text-center"> {/* Added text-center */}
                            <h4 className="text-lg font-semibold mb-4 text-white">Maristan Pharmaceuticals</h4>
                            <p className="text-sm">
                                Providing innovative and affordable healthcare solutions to the people of Sudan.  Committed to quality and customer satisfaction.
                            </p>
                        </div>
                    </div>

                    {/* Social Media */}
                    <div>
                        <div className="text-center"> {/* Added text-center */}
                            <h4 className="text-lg font-semibold mb-4 text-white">Follow Us</h4>
                            <div className="flex space-x-4 justify-center">
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
                        © {new Date().getFullYear()} Maristan Pharmaceutical Company. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
