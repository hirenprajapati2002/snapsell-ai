import React from "react";
import BgReplacer from '../../assets/videos/bg_replacer.mp4';
import ImageGo from '../../assets/videos/imagine-go.mp4';
import ObjectRemover from '../../assets/videos/object_remover.mp4';
import ObjectReplacer from '../../assets/videos/object_replacer.mp4';
import PhotoEnhancer from '../../assets/videos/photo_enhancer.mp4';
import UncropImage from '../../assets/videos/Uncrop_image.mp4';


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

                <div className="flex justify-center mt-10">
                    <button className="bg-[#7B3FF7] text-white font-semibold px-6 py-3 rounded-xl hover:bg-[#682de9] transition duration-300 flex items-center gap-2">
                        View All Tools
                        <span className="text-lg">→</span>
                    </button>
                </div>
                {/* Free Trial Banner */}
                <div className="mt-16">
                    <div className="bg-gradient-to-r from-[#1a0730] to-[#120b1e] rounded-2xl px-6 md:px-12 py-8 flex flex-col md:flex-row justify-between items-center gap-6 shadow-md">
                        <div className="text-center md:text-left">
                            <p className="text-sm text-gray-300 mb-1">Not sure yet?</p>
                            <h2 className="text-2xl md:text-3xl font-bold text-white">
                                Try for <span className="text-white font-extrabold">FREE</span> now!
                            </h2>
                        </div>
                        <button className="bg-[#7B3FF7] text-white font-semibold text-sm px-6 py-3 rounded-xl hover:bg-[#682de9] transition duration-300">
                            Claim 25 FREE Photos ✨
                        </button>
                    </div>
                </div>
                {/* Marketplace Support Section */}
                <div className="mt-16 text-center">
                    <p className="text-gray-800 text-lg mb-6">
                        Suitable for all <span className="font-semibold">marketplaces, platform</span>, and channel
                    </p>
                    <div className="flex justify-center flex-wrap items-center gap-6">
                        <img src="/src/assets/icons/facebook.svg" alt="Facebook" className="h-8 w-8" />
                        <img src="/src/assets/icons/instagram.svg" alt="Instagram" className="h-8 w-8" />
                        <img src="/src/assets/icons/pinterest.svg" alt="Pinterest" className="h-8 w-8" />
                        <img src="/src/assets/icons/shopify.svg" alt="Shopify" className="h-8 w-8" />
                        <img src="/src/assets/icons/twitter.svg" alt="Twitter" className="h-8 w-8" />
                        <img src="/src/assets/icons/tiktok.svg" alt="Tiktok" className="h-8 w-8" />
                        <img src="/src/assets/icons/linkedin.svg" alt="LinkedIn" className="h-8 w-8" />
                        <img src="/src/assets/icons/snapchat.svg" alt="Snapchat" className="h-8 w-8" />
                        <img src="/src/assets/icons/amazon.svg" alt="Amazon" className="h-8 w-8" />
                        <img src="/src/assets/icons/etsy.svg" alt="Etsy" className="h-8 w-8" />
                        <img src="/src/assets/icons/ebay.svg" alt="eBay" className="h-8 w-8" />
                        <img src="/src/assets/icons/flipkart.svg" alt="Flipkart" className="h-8 w-8" />
                        <span className="text-gray-600 text-sm font-medium">+more</span>
                    </div>
                </div>
            </div>
            {/* API Integration Section - Break out of container for full width */}
            <div className="relative mt-24 -mx-[10px] md:-mx-[50px] pb-24">
                {/* Full-width peach background for lower half */}
                <div className="absolute inset-0 top-1/3 bg-[#fef1eb]"></div>

                {/* Content container */}
                <div className="relative px-[10px] md:px-[50px]">
                    <div className="max-w-6xl mx-auto bg-white border border-gray-200 shadow-xl rounded-2xl overflow-hidden flex flex-col lg:flex-row">

                        {/* Left Text Block */}
                        <div className="w-full lg:w-1/2 p-8 md:p-12 flex flex-col justify-center">
                            <h2 className="text-3xl font-bold text-black leading-tight mb-2">
                                Integrate <br />
                                <span className="font-extrabold">Snapsell.AI's API</span>
                            </h2>
                            <p className="text-gray-600 mt-2 mb-6">
                                Join thousands of businesses and developers integrating Snapsell.AI's AI infrastructure into their apps, websites, and workflows
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4">
                                <button className="bg-[#7B3FF7] text-white font-semibold px-6 py-3 rounded-xl hover:bg-[#682de9] transition">
                                    Get API Key
                                </button>
                                <button className="border border-[#7B3FF7] text-[#7B3FF7] font-semibold px-6 py-3 rounded-xl hover:bg-[#f1ebff] transition">
                                    Documentation
                                </button>
                            </div>
                        </div>

                        {/* Right Code Block */}
                        <div className="w-full lg:w-1/2 p-6 md:p-8 flex items-center justify-center">
                            <div className="bg-[#1c1f26] text-white rounded-xl p-6 font-mono text-sm w-full shadow-inner overflow-x-auto relative">
                                {/* Copy Button */}
                                <button className="absolute top-4 right-4 p-2 bg-gray-700 hover:bg-gray-600 rounded-md transition-colors">
                                    <svg className="w-4 h-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                    </svg>
                                </button>

                                <pre className="whitespace-pre-wrap pr-12">
                                    <code>
                                        <span className="text-purple-400">const</span> <span className="text-blue-300">axios</span> <span className="text-white">=</span> <span className="text-blue-300">require</span><span className="text-white">(</span><span className="text-orange-300">"axios"</span><span className="text-white">);</span>
                                        {'\n\n'}
                                        <span className="text-purple-400">const</span> <span className="text-blue-300">url</span> <span className="text-white">=</span>
                                        {'\n  '}<span className="text-orange-300">"https://prodapi.phot.ai/external/api/v3/user_activity/remove-background"</span><span className="text-white">;</span>
                                        {'\n'}
                                        <span className="text-purple-400">const</span> <span className="text-blue-300">headers</span> <span className="text-white">=</span> <span className="text-white">{'{'}</span>
                                        {'\n  '}<span className="text-orange-300">"x-api-key"</span><span className="text-white">:</span> <span className="text-orange-300">"&lt;PhotAI API Key&gt;"</span><span className="text-white">,</span>
                                        {'\n  '}<span className="text-orange-300">"Content-Type"</span><span className="text-white">:</span> <span className="text-orange-300">"application/json"</span>
                                        {'\n'}<span className="text-white">{'}'}</span><span className="text-white">;</span>
                                        {'\n'}
                                        <span className="text-purple-400">const</span> <span className="text-blue-300">data</span> <span className="text-white">=</span> <span className="text-white">{'{'}</span>
                                        {'\n  '}<span className="text-blue-300">source_url</span><span className="text-white">:</span> <span className="text-orange-300">"https://ai-image-editor-wasabi-bucket.phot.ai/bg_replacer_assets/original_images/chair.webp"</span> <span className="text-gray-400">// Replace with the</span> <span className="text-yellow-300">URL</span> <span className="text-gray-400">of your input image</span>
                                        {'\n'}<span className="text-white">{'}'}</span><span className="text-white">;</span>
                                    </code>
                                </pre>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ToolsSection;