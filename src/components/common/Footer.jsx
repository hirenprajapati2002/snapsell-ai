// src/components/common/Footer.jsx
import React from 'react';
import { Facebook, Instagram, Twitter, Linkedin, Youtube } from 'lucide-react';
import { Link } from 'react-router-dom';

// Import social icons
import FacebookIcon from '../../assets/images/social-icons/facebook.svg';
import InstagramIcon from '../../assets/images/social-icons/instagram.svg';
import PinterestIcon from '../../assets/images/social-icons/pinterest.svg';
import ShopifyIcon from '../../assets/images/social-icons/shopify.svg';
import TwitterIcon from '../../assets/images/social-icons/twitter.svg';
import LinkedInIcon from '../../assets/images/social-icons/linkedin.svg';
import AmazonIcon from '../../assets/images/social-icons/amazon.svg';
import EtsyIcon from '../../assets/images/social-icons/etsy.svg';

const Footer = () => {
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-[#121212] text-white pt-16 pb-8">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
                    {/* Logo and description column */}
                    <div className="lg:col-span-1">
                        <div className="mb-6 flex items-center">
                            <div className="flex items-center space-x-2">
                                <div className="bg-[#7B3FF7] text-white h-10 w-10 rounded-lg flex items-center justify-center font-bold text-xl">
                                    S
                                </div>
                                <h2 className="text-2xl font-bold text-white">
                                    Snapsell.<span className="text-[#7B3FF7]">AI</span>
                                </h2>
                            </div>
                        </div>
                        <p className="text-gray-400 mb-6 text-sm">
                            A complete photo editor for simplified editing & improved design
                        </p>
                        <div className="flex space-x-3">
                            <a href="#" className="bg-[#1A1A1A] p-2.5 rounded-full hover:bg-[#7B3FF7] transition-colors">
                                <Facebook size={20} />
                            </a>
                            <a href="#" className="bg-[#1A1A1A] p-2.5 rounded-full hover:bg-[#7B3FF7] transition-colors">
                                <Instagram size={20} />
                            </a>
                            <a href="#" className="bg-[#1A1A1A] p-2.5 rounded-full hover:bg-[#7B3FF7] transition-colors">
                                <Twitter size={20} />
                            </a>
                            <a href="#" className="bg-[#1A1A1A] p-2.5 rounded-full hover:bg-[#7B3FF7] transition-colors">
                                <Linkedin size={20} />
                            </a>
                        </div>
                    </div>

                    {/* Navigation columns */}
                    <div>
                        <h3 className="text-lg font-semibold text-white mb-4">Snapsell.AI</h3>
                        <ul className="space-y-3">
                            <li><Link to="/" className="text-gray-400 hover:text-white transition-colors">Home</Link></li>
                            <li><Link to="/all-tools" className="text-gray-400 hover:text-white transition-colors">All Tools</Link></li>
                            <li><Link to="/apis" className="text-gray-400 hover:text-white transition-colors">APIs</Link></li>
                            <li><Link to="/services" className="text-gray-400 hover:text-white transition-colors">Services</Link></li>
                            <li><Link to="/careers" className="text-gray-400 hover:text-white transition-colors">Careers</Link></li>
                            <li><Link to="/about-us" className="text-gray-400 hover:text-white transition-colors">About Us</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-lg font-semibold text-white mb-4">AI Tools</h3>
                        <ul className="space-y-3">
                            <li><Link to="/tools/image-extender" className="text-gray-400 hover:text-white transition-colors">Image Extender</Link></li>
                            <li><Link to="/tools/art-generator" className="text-gray-400 hover:text-white transition-colors">AI Art Generator</Link></li>
                            <li><Link to="/tools/object-replacer" className="text-gray-400 hover:text-white transition-colors">Object Replacer</Link></li>
                            <li><Link to="/tools/background-replacer" className="text-gray-400 hover:text-white transition-colors">Background Replacer</Link></li>
                            <li><Link to="/tools/object-remover" className="text-gray-400 hover:text-white transition-colors">Object Remover</Link></li>
                            <li><Link to="/tools/image-enhancer" className="text-gray-400 hover:text-white transition-colors">AI Image Enhancer</Link></li>
                            <li><Link to="/tools" className="text-gray-400 hover:text-white transition-colors">More Tools</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-lg font-semibold text-white mb-4">Support</h3>
                        <ul className="space-y-3">
                            <li><Link to="/contact-us" className="text-gray-400 hover:text-white transition-colors">Contact Us</Link></li>
                            <li><Link to="/help-center" className="text-gray-400 hover:text-white transition-colors">Help Center</Link></li>
                            <li><Link to="/blogs" className="text-gray-400 hover:text-white transition-colors">Blogs</Link></li>
                            <li><Link to="/pricing" className="text-gray-400 hover:text-white transition-colors">Pricing</Link></li>
                            <li><Link to="/affiliates" className="text-gray-400 hover:text-white transition-colors">Affiliates</Link></li>
                        </ul>
                    </div>
                </div>

                {/* Marketplace logos */}
                <div className="border-t border-[#333] pt-8 mt-8">
                    <p className="text-gray-400 mb-5 text-center">Contact us at <a href="mailto:support@phot.ai" className="text-[#7B3FF7] hover:text-[#9B6DFF]">support@snapsell.ai</a></p>
                    <div className="flex flex-wrap justify-center items-center gap-4 md:gap-6">
                        <div className="w-10 h-10 bg-[#1A1A1A] rounded-full p-2 hover:bg-[#252525] transition-colors">
                            <img src={FacebookIcon} alt="Facebook" className="w-full h-full object-contain" />
                        </div>
                        <div className="w-10 h-10 bg-[#1A1A1A] rounded-full p-2 hover:bg-[#252525] transition-colors">
                            <img src={InstagramIcon} alt="Instagram" className="w-full h-full object-contain" />
                        </div>
                        <div className="w-10 h-10 bg-[#1A1A1A] rounded-full p-2 hover:bg-[#252525] transition-colors">
                            <img src={TwitterIcon} alt="Twitter" className="w-full h-full object-contain" />
                        </div>
                        <div className="w-10 h-10 bg-[#1A1A1A] rounded-full p-2 hover:bg-[#252525] transition-colors">
                            <img src={LinkedInIcon} alt="LinkedIn" className="w-full h-full object-contain" />
                        </div>
                    </div>
                </div>

                {/* Bottom footer */}
                <div className="border-t border-[#333] mt-8 pt-8">
                    <div className="flex flex-col md:flex-row justify-between items-center">
                        <p className="text-gray-400 text-sm">
                            © {currentYear} Snapsell.AI, All rights reserved.
                        </p>
                        <div className="flex flex-wrap gap-4 mt-4 md:mt-0">
                            <Link to="/legal/privacy-policy" className="text-gray-400 text-sm hover:text-white transition-colors">
                                Privacy Policy
                            </Link>
                            <Link to="/legal/terms" className="text-gray-400 text-sm hover:text-white transition-colors">
                                Terms & Conditions
                            </Link>
                            <Link to="/legal/cancel-subscription" className="text-gray-400 text-sm hover:text-white transition-colors">
                                Cancel Subscription
                            </Link>
                            <Link to="/legal/cookie-policy" className="text-gray-400 text-sm hover:text-white transition-colors">
                                Cookie Policy
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
