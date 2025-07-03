import React, { useEffect, useState, useRef } from 'react';
// import {  } from "react";
import { motion } from "framer-motion";
import img1 from '../../assets/images/1n.webp';
import img2 from '../../assets/images/2n.webp';
import img3 from '../../assets/images/3n.webp';
import img4 from '../../assets/images/4n.webp';
import img5 from '../../assets/images/Long.jpg';
import img6 from '../../assets/images/bgRemover.webp';
import img7 from '../../assets/images/bgRemover3.jpg';
import img8 from '../../assets/images/bgRemover3.webp';
import img9 from '../../assets/images/imageExtender.webp';
import img10 from '../../assets/images/photoShot.webp';
import img11 from '../../assets/images/replaceBg.webp';
import img12 from '../../assets/images/restorer.webp';
import img13 from '../../assets/images/socialMediaGraphic.webp';
import img14 from '../../assets/images/templates.jpg';


const rotatingWords = ["Google Ads", "Meta Ads", "Banners", "Product Visuals", "Catalogues"];

const images = [
    // img1,
    // img2,
    // img3,
    // img4,
    // img5,
    // img6,
    img7,
    img8,
    img9,
    img10,
    img11,
    img12,
    img13,
    img14        
];

const FeaturesSection = () => {
    const [displayedText, setDisplayedText] = useState("");
    const [deleting, setDeleting] = useState(false);
    const [charIndex, setCharIndex] = useState(0);
    const [loopNum, setLoopNum] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const scrollRef = useRef(null);

    // const currentWord = rotatingWords[wordIndex];
    // Typing animation
    useEffect(() => {
        const current = rotatingWords[loopNum % rotatingWords.length];
        const fullText = current;

        const timeout = setTimeout(() => {
            if (!deleting && charIndex < fullText.length) {
                setDisplayedText(fullText.substring(0, charIndex + 1));
                setCharIndex((prev) => prev + 1);
            } else if (deleting && charIndex > 0) {
                setDisplayedText(fullText.substring(0, charIndex - 1));
                setCharIndex((prev) => prev - 1);
            } else if (!deleting && charIndex === fullText.length) {
                setTimeout(() => setDeleting(true), 1200);
            } else if (deleting && charIndex === 0) {
                setDeleting(false);
                setLoopNum((prev) => prev + 1);
            }
        }, deleting ? 30 : 100);

        return () => clearTimeout(timeout);
    }, [charIndex, deleting, loopNum]);

    const handleMouseEnter = () => {
        setIsPaused(true);
    };

    const handleMouseLeave = () => {
        setIsPaused(false);
    };


    return (
        <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
            <style>{`
                @keyframes blink {
                    0%, 100% { opacity: 1; }
                    50% { opacity: 0; }
                }

                .animate-blink {
                    animation: blink 1s step-start infinite;
                }
                    
            `}</style>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 flex items-center justify-center gap-3 flex-wrap">
                        Create & Edit{" "}
                        <span className="relative inline-flex items-center min-h-[48px] px-1">
                            <span className="whitespace-nowrap text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 text-lg md:text-2xl font-bold drop-shadow-[0_0_6px_rgba(236,72,153,0.6)]">
                                {displayedText}
                            </span>
                            <span className="ml-1 w-[2px] h-[1.2em] bg-pink-600 animate-blink" />
                        </span>{" "}
                        in Seconds
                    </h2>
                    <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
                        Design <span className="text-purple-600 font-semibold">stunning visuals</span> & optimise <span className="text-blue-600 font-semibold">campaigns</span> for <span className="text-green-600 font-semibold">maximum ROI</span>. Utilise tailored templates & AI tools for Product Photography, Photo Editing, Ads & Banner Creation and Marketplace Listings
                    </p>
                </div>
            </div>
        </section>
    );
};

export default FeaturesSection;