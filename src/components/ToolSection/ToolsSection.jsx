import React from "react";
import BgReplacer from '../../assets/videos/bg_replacer.mp4';
import ImageGo from '../../assets/videos/imagine-go.mp4';
import ObjectRemover from '../../assets/videos/object_remover.mp4';
import ObjectReplacer from '../../assets/videos/object_replacer.mp4';
import PhotoEnhancer from '../../assets/videos/photo_enhancer.mp4';
import UncropImage from '../../assets/videos/Uncrop_image.mp4';
import Footer from '../common/Footer';

// Import social icons
import FacebookIcon from '../../assets/images/social-icons/facebook.svg';
import InstagramIcon from '../../assets/images/social-icons/instagram.svg';
import PinterestIcon from '../../assets/images/social-icons/pinterest.svg';
import ShopifyIcon from '../../assets/images/social-icons/shopify.svg';
import TwitterIcon from '../../assets/images/social-icons/twitter.svg';
import LinkedInIcon from '../../assets/images/social-icons/linkedin.svg';
import AmazonIcon from '../../assets/images/social-icons/amazon.svg';
import EtsyIcon from '../../assets/images/social-icons/etsy.svg';


const tools = [
    {
        title: "AI Image Extender",
        description: "Expand your images beyond the original borders",
        video: BgReplacer,
    },
    {
        title: "AI Art Generator",
        description: "Unleash your creativity with stunning art powered by advanced AI.",
        video: ImageGo,
    },
    {
        title: "Object Replacer",
        description: "Swap, remove, or add objects to create stunning images with our online editor.",
        video: ObjectRemover,
    },
    {
        title: "Background Replacer",
        description: "Enhance images with our AI background editor—replace, remove, or blur backgrounds.",
        video: ObjectReplacer,
    },
    {
        title: "Object Remover",
        description: "Remove unwanted objects, text, watermark or people from photos using a brush tool.",
        video: PhotoEnhancer,
    },
    {
        title: "Image Enhancer",
        description: "Automate tasks like enhancing quality, clearing blur, and sharpening details.",
        video: UncropImage,
    },
];

const ToolsSection = () => {
    return (
        <>
        <section className="bg-white px-[10px] md:px-[50px] pt-[48px] md:pt-[96px] pb-[96px]">
            {/* Header */}
            <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-semibold text-black">
                    Supercharge Your Visuals with{" "}
                    <span className="text-indigo-600 font-bold">AI-Powered Tools</span>
                </h2>
                <p className="text-gray-500 mt-2">
                    Make your photos, ads, and creatives amazing with Snapsell.AI's easy-to-use tools
                </p>
            </div>

            {/* Shared wrapper for grid and banner */}
            <div className="max-w-6xl mx-auto">
                {/* Tools Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {tools.map((tool, index) => (
                        <div key={index} className="bg-white rounded-xl shadow-md p-4 border border-gray-100">
                            <video
                                src={tool.video}
                                className="rounded-md w-full h-48 object-cover mb-4"
                                autoPlay
                                loop
                                muted
                                playsInline
                            />
                            <h3 className="text-lg font-semibold mb-1 text-black">{tool.title}</h3>
                            <p className="text-gray-600 text-sm">{tool.description}</p>
                        </div>
                    ))}
                </div>

                {/* <div className="flex justify-center mt-10">
                    <button className="bg-[#7B3FF7] text-white font-semibold px-6 py-3 rounded-xl hover:bg-[#682de9] transition duration-300 flex items-center gap-2">
                        View All Tools
                        <span className="text-lg">→</span>
                    </button>
                </div> */}
                {/* Free Trial Banner */}
                <div className="mt-16">
                    <div className="bg-gradient-to-r from-[#1a0730] to-[#120b1e] rounded-2xl px-6 md:px-12 py-8 flex flex-col md:flex-row justify-between items-center gap-6 shadow-md">
                        <div className="text-center md:text-left">
                            <p className="text-sm text-gray-300 mb-1">Not sure yet?</p>
                            <h2 className="text-2xl md:text-3xl font-bold text-white">
                                Try for <span className="text-white font-extrabold">FREE</span> now!
                            </h2>
                        </div>
                        {/* <button className="bg-[#7B3FF7] text-white font-semibold text-sm px-6 py-3 rounded-xl hover:bg-[#682de9] transition duration-300">
                            Claim 25 FREE Photos ✨
                        </button> */}
                    </div>
                </div>
                {/* Marketplace Support Section */}
                <div className="py-16 text-center">
                    <h3 className="text-2xl font-semibold text-black mb-2">Compatible With All Platforms</h3>
                    <p className="text-gray-600 text-lg mb-6">
                        Use your enhanced visuals on all <span className="font-semibold">marketplaces, platforms</span>, and social channels
                    </p>
                    <div className="flex justify-center flex-wrap items-center gap-4 md:gap-6">
                        <div className="h-16 w-16 bg-white rounded-xl shadow-sm flex items-center justify-center p-3 hover:shadow-md transition-all transform hover:-translate-y-1">
                            <img src={FacebookIcon} alt="Facebook" className="h-10 w-10" />
                        </div>
                        <div className="h-16 w-16 bg-white rounded-xl shadow-sm flex items-center justify-center p-3 hover:shadow-md transition-all transform hover:-translate-y-1">
                            <img src={InstagramIcon} alt="Instagram" className="h-10 w-10" />
                        </div>
                        {/* <div className="h-16 w-16 bg-white rounded-xl shadow-sm flex items-center justify-center p-3 hover:shadow-md transition-all transform hover:-translate-y-1">
                            <img src={PinterestIcon} alt="Pinterest" className="h-10 w-10" />
                        </div>
                        <div className="h-16 w-16 bg-white rounded-xl shadow-sm flex items-center justify-center p-3 hover:shadow-md transition-all transform hover:-translate-y-1">
                            <img src={ShopifyIcon} alt="Shopify" className="h-10 w-10" />
                        </div> */}
                        <div className="h-16 w-16 bg-white rounded-xl shadow-sm flex items-center justify-center p-3 hover:shadow-md transition-all transform hover:-translate-y-1">
                            <img src={TwitterIcon} alt="Twitter" className="h-10 w-10" />
                        </div>
                        <div className="h-16 w-16 bg-white rounded-xl shadow-sm flex items-center justify-center p-3 hover:shadow-md transition-all transform hover:-translate-y-1">
                            <img src={LinkedInIcon} alt="LinkedIn" className="h-10 w-10" />
                        </div>
                        <div className="h-16 w-16 bg-white rounded-xl shadow-sm flex items-center justify-center p-3 hover:shadow-md transition-all transform hover:-translate-y-1">
                            <img src={AmazonIcon} alt="Amazon" className="h-10 w-10" />
                        </div>
                        {/* <div className="h-16 w-16 bg-white rounded-xl shadow-sm flex items-center justify-center p-3 hover:shadow-md transition-all transform hover:-translate-y-1">
                            <img src={EtsyIcon} alt="Etsy" className="h-10 w-10" />
                        </div> */}
                        {/* <button className="h-16 px-6 bg-gray-50 rounded-xl text-gray-600 text-sm font-medium hover:bg-gray-100 transition-colors flex items-center justify-center shadow-sm hover:shadow-md transition-all transform hover:-translate-y-1">
                            <span className="text-[#7B3FF7] font-semibold">+12 more</span>
                        </button> */}
                    </div>                </div>
            </div>

            {/* Footer Section */}
        </section>
            <Footer />
        </>
    );
};

export default ToolsSection;