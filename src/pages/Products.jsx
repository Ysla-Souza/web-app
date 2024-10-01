import React, { useEffect, useState } from 'react';
import { fetchProducts } from '../firebase/products'; // Importe a função para buscar produtos

export default function Products({ onAddToCart }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');


  useEffect(() => {
    const loadProducts = async () => {
      try {
        const productsList = await fetchProducts(); // Chame a função de busca de produtos
        setProducts(productsList); // Atualize o estado com os produtos
      } catch (err) {
        setError('Erro ao carregar produtos');
      } finally {
        setLoading(false);
      }
    };
    loadProducts();
  }, []);

  const handleAddToCart = (product) => {
    onAddToCart(product); // Chama a função passada como prop
    console.log(`Produto ${product.name} adicionado ao carrinho.`);
  };

  if (loading) return <p>Carregando...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="flex flex-col items-center mt-12 w-full px-4 mt-60 mb-10">
      <h2 className="text-center text-2xl font-normal mb-6 text-purple-500">
        Produtos
      </h2>
      <div className="flex flex-wrap justify-center gap-6">
        {products.map((product) => (
          <div key={product.id} className="flex flex-col items-center p-4 bg-white border border-gray-300 rounded-lg shadow-md w-64 cursor-pointer transition-shadow hover:shadow-2xl">
            {product.image && (
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-40 object-cover rounded-md mb-2"
              />
            )}
            <p className="text-lg text-gray-700 mb-2">{product.name}</p>
            <p className="text-gray-500 text-sm mb-2">{product.description}</p>
            <p className="text-gray-900 font-bold">${product.price}</p>
            <button
              className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg"
              onClick={() => handleAddToCart(product)} // Chama a função ao invés de onAddToCart
            >
              Adicionar ao Carrinho
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
