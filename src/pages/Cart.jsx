import React from 'react';

const Cart = ({ cartItems, onUpdateQuantity, onRemoveFromCart, user }) => {
  return (
    <div className="container mx-auto mt-80 mb-8">
      <h1 className="text-2xl font-bold mb-4">Meu Carrinho</h1>
      {user ? (
        cartItems.length === 0 ? (
          <p>Seu carrinho está vazio.</p>
        ) : (
          <div>
            {cartItems.map((item, index) => (
              <div key={index} className="flex justify-between items-center border-b pb-2 mb-2">
                <div>
                  <h2 className="text-xl">{item.name}</h2>
                  <p>Preço: R$ {item.price}</p>
                  <p>Quantidade: {item.quantity}</p>
                </div>
                <div className="flex flex-col items-end">
                  <button
                    onClick={() => onRemoveFromCart(item.id)}
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 mb-2"
                    aria-label={`Remover ${item.name} do carrinho`}
                  >
                    Remover
                  </button>
                  <div className="flex items-center">
                    <button
                      onClick={() => item.quantity > 1 && onUpdateQuantity(item.id, item.quantity - 1)}
                      className="bg-gray-200 text-gray-800 px-3 py-1 rounded mx-1 hover:bg-gray-300"
                      aria-label={`Diminuir quantidade de ${item.name}`}
                    >
                      -
                    </button>
                    <button
                      onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                      className="bg-gray-200 text-gray-800 px-3 py-1 rounded mx-1 hover:bg-gray-300"
                      aria-label={`Aumentar quantidade de ${item.name}`}
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )
      ) : (
        <p className="text-red-500">Por favor, faça login para acessar seu carrinho.</p>
      )}
    </div>
  );
};

export default Cart;
