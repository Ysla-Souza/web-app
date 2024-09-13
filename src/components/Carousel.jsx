import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

import img1 from '../assets/img1.png'; // Imagem 1
import img2 from '../assets/img2.png'; // Imagem 2
import img3 from '../assets/img3.png'; // Imagem 3

const Carousel = () => {
  return (
    <div className="relative w-full max-w-4xl mx-auto mb-24"> {/* Centraliza e define a largura máxima */}
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={10}
        slidesPerView={1}
        navigation={true}
        pagination={{
          type: 'fraction',
        }}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        className="w-full mb-5"  // Estilos do swiper
      >
        <SwiperSlide>
          <img src={img1} alt="Imagem 1" className="w-full h-auto object-cover mt-[-5px]" /> {/* Estilos da imagem */}
        </SwiperSlide>
        <SwiperSlide>
          <img src={img2} alt="Imagem 2" className="w-full h-auto object-cover mt-[-5px]" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={img3} alt="Imagem 3" className="w-full h-auto object-cover mt-[-5px]" />
        </SwiperSlide>
      </Swiper>

      {/* Adiciona o contêiner de navegação e paginação */}
      <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 text-center text-lg text-gray-800">
        {/* Posição do slide (1/3) */}
        <div className="swiper-pagination-fraction"></div>
      </div>
    </div>
  );
};

export default Carousel;
