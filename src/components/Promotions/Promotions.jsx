import React from 'react';
import promo1 from '../../assets/promo1.jpg';
import promo2 from '../../assets/promo2.jpg';

const Promotions = () => {
  return (
    <section className="flex flex-col items-center gap-5 pt-5 w-full mt-12">
      <h2 className="text-center text-2xl font-normal text-purple-400 mb-5">
        Promoções
      </h2>
      <div className="flex justify-center gap-5">
        <img src={promo1} alt="Promoção 1" className="w-72 h-auto rounded-lg object-cover" />
        <img src={promo2} alt="Promoção 2" className="w-72 h-auto rounded-lg object-cover" />
      </div>
    </section>
  );
};

export default Promotions;
