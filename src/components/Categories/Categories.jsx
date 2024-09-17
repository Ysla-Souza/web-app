import React from 'react';

import category1 from '../../assets/category1.jpg'; // Imagem da Categoria 1
import category2 from '../../assets/category2.jpg'; // Imagem da Categoria 2
import category3 from '../../assets/category3.jpg'; // Imagem da Categoria 3
import category4 from '../../assets/category4.jpg'; // Imagem da Categoria 4
import category5 from '../../assets/category5.jpg'; // Imagem da Categoria 5

const Categories = () => {
  return (
    <div className="flex flex-col items-center mt-12 w-full px-4">
      <h2 className="text-center text-2xl font-normal mb-6 text-purple-500">
        Categorias
      </h2>
      <div className="flex flex-wrap justify-center gap-6">
        <div className="flex flex-col items-center p-4 bg-white border border-gray-300 rounded-lg shadow-md w-52 cursor-pointer">
          <img src={category1} alt="Categoria 1" className="w-full h-52 object-cover rounded-md mb-2" />
          <p className="text-lg text-gray-700">Categoria 1</p>
        </div>
        <div className="flex flex-col items-center p-4 bg-white border border-gray-300 rounded-lg shadow-md w-52 cursor-pointer">
          <img src={category2} alt="Categoria 2" className="w-full h-52 object-cover rounded-md mb-2" />
          <p className="text-lg text-gray-700">Categoria 2</p>
        </div>
        <div className="flex flex-col items-center p-4 bg-white border border-gray-300 rounded-lg shadow-md w-52 cursor-pointer">
          <img src={category3} alt="Categoria 3" className="w-full h-52 object-cover rounded-md mb-2" />
          <p className="text-lg text-gray-700">Categoria 3</p>
        </div>
        <div className="flex flex-col items-center p-4 bg-white border border-gray-300 rounded-lg shadow-md w-52 cursor-pointer">
          <img src={category4} alt="Categoria 4" className="w-full h-52 object-cover rounded-md mb-2" />
          <p className="text-lg text-gray-700">Categoria 4</p>
        </div>
        <div className="flex flex-col items-center p-4 bg-white border border-gray-300 rounded-lg shadow-md w-52 cursor-pointer">
          <img src={category5} alt="Categoria 5" className="w-full h-52 object-cover rounded-md mb-2" />
          <p className="text-lg text-gray-700">Categoria 5</p>
        </div>
      </div>
    </div>
  );
};

export default Categories;
