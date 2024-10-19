import React from 'react';
import Carousel from '../components/Carousel'; 
import Highlights from '../components/Highlights/Highlights'; 
import Categories from '../components/Categories/Categories'; 
import Promotions from '../components/Promotions/Promotions'; 

function Home() {
  return (
    <>
      <section className="welcome-section text-center py-10 bg-gray-100">
        <h2 className="text-3xl font-bold mb-4">Mensagem de boas-vindas</h2>
        <p className="text-lg max-w-4xl mx-auto">
          Use este texto para compartilhar informações da sua loja, dar boas-vindas aos clientes ou para dizer o quão incríveis são os seus produtos.
        </p>
      </section>

      <section className="carousel-section py-10 bg-white">
        <Carousel /> {/* Usa o componente Carousel */}
      </section>

      <section className="highlights-section py-10 bg-gray-50">
        <Highlights /> {/* Usa o componente Highlights */}
      </section>

      <section className="categories-section py-10 bg-white">
        <Categories /> {/* Usa o componente Categories */}
      </section>

      {/* Promoções usando o componente Promotions */}
      <section className="promotions-section py-10 bg-gray-100">
        <Promotions /> {/* Usa o componente Promotions */}
      </section>
    </>
  );
}

export default Home;