"use client";

import { useState } from 'react';

export default function CartForm({productName, lang}) {
  const [quantity, setQuantity] = useState(1);

  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value, 10);
    setQuantity(value > 0 ? value : 1); // Evitar valores menores a 1
  };

  const addToCart = () => {
    if(lang === 'es'){
    alert(`Has agregado ${quantity} ${productName} al carrito.`);
      return
    }else{
    alert(`You added ${quantity} ${productName} to the cart.`);
    }
  };

  return (
    <div className="flex p-4  max-w-sm justify-start ">
      <div className="mb-4 mx-2">
        <input
          type="number"
          value={quantity}
          min="1"
          onChange={handleQuantityChange}
          className="w-16 text-center border focus:ring focus:ring-blue-300 focus:outline-none"
        />
      </div>
      <button
        className="p-2 mx-2 bg-zinc-900 rounded text-zinc-100 text-sm font-semibold  hover:text-amber-200 focus:outline-none"
        onClick={addToCart}
      >
      {lang === 'es' ? "Agregar al carrito" : "Add to cart"}
      </button>
    </div>
  );
}

