import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import '../styles/bannerSlider.css';

import banner1 from '../assets/banners/Banner1.png';
import banner2 from '../assets/banners/Banner2.png';
import banner3 from '../assets/banners/Banner3.png';

const bannerImages = [banner1, banner2, banner3];

const BannerSlider = () => {
  return (
    <div className="w-full px-6 pt-6">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        loop
        autoplay={{ delay: 4000 }}
        pagination={{ clickable: true }}
        navigation
        className="w-full max-w-full h-[380px] rounded-2xl overflow-hidden shadow-xl"
        style={{ maxWidth: '100%', height: '380px' }} // Force Swiper to use bounded width
      >
        {bannerImages.map((img, index) => (
          <SwiperSlide key={index}>
            <div className="w-full h-full">
              <img
                src={img}
                alt={`banner-${index}`}
                className="w-full h-full object-cover"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default BannerSlider;
