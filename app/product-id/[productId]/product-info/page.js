'use client';

import { useEffect, useState } from "react";
import { useAppContext } from "../../../index";
import CartForm from "../../../components/CartForm";
import Image from "next/image";

export default function Page({ params }) {
  const { products } = useAppContext();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    // Intenta obtener el producto de localStorage si existe
    const storedProduct = localStorage.getItem("selectedProduct");
    
    if (storedProduct && (storedProduct.id_product == params.productId)) {
      setProduct(JSON.parse(storedProduct)); // Recupera el producto del almacenamiento
    } else {
      // Si no está en localStorage, busca el producto en el contexto
      const foundProduct = products.reduce((acc, el) => {
        if (el.id_product == params.productId) {
          return el;
        }
        return acc;
      }, null);

      if (foundProduct) {
        setProduct(foundProduct);
        localStorage.setItem("selectedProduct", JSON.stringify(foundProduct)); // Guarda el producto en localStorage
      }
    }
  }, [params.productId, products]);

  if(!product){
    return(<div>Loading...</div>);
  };

  return (
    <div>
      <h1 className="text-xl text-center text-amber-700 px-2 bg-gray-50 py-10 uppercase"> <strong>{product.name} - {product.name_category}</strong></h1>
      <div className="flex flex-col xl:flex-row justify-center py-10">
        <Image className="p-2 mx-auto"  src={product.image_path} width={500} height={500} alt={product.name} />
        <div className="flex flex-col md:w-1/2 xl:w-1/3 md:mx-auto xl:ml-10 p-2">
          <h1 className="text-md text-center border-b text-amber-700">{product.name}</h1>
          <h1 className="text-lg pl-1 border-b py-5">${product.price} CLP</h1>
          <h1 className="text-md pl-1 border-b py-5">DESCRIPCIÓN: {product.description}</h1>
          <CartForm productName={product.name}/>
        </div>
      </div>
    </div>
  );
}

