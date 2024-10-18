const Cart = ({ cartItems, onRemoveFromCart }) => {
  return (
    <div className="container mx-auto mt-80 mb-8">
      <h1 className="text-2xl font-bold mb-4">Meu Carrinho</h1>
      {cartItems.length === 0 ? (
        <p>Seu carrinho está vazio.</p>
      ) : (
        <div>
          {cartItems.map((item, index) => (
            <div key={index} className="flex justify-between items-center border-b pb-2 mb-2">
              <div>
                <h2 className="text-xl">{item.name}</h2>
                <p>Preço: R$ {item.price}</p>
                <p>Quantidade: {item.quantity}</p> {/* Mostra a quantidade do produto */}
              </div>
              <button
                onClick={() => onRemoveFromCart(item.id)} // Chama a função ao clicar
                className="bg-red-500 text-white px-4 py-2 rounded"
              >
                Remover
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Cart;
