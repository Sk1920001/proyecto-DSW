"use client";
import Image from "next/image";
import { useAppContext } from "../index";

export default function ProductsGrid({ products }) {
  const {userLanguage} = useAppContext();
  return (
    <div className="mx-auto">
      <div className="grid grid-cols-1 text-sm md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-2 p-3">
        {products.map((product) => (
          <div className="border border-zinc-200" key={product.id_product}>
            <Image className="mx-auto pt-2" src={product.image_path} alt={product.name} width={200} height={200} />
            <h1 className="border-t border-zinc-200 text-start text-zinc-600 bg-zinc-100 p-1">
              {userLanguage === "es" ? product.name : product.name_en}
            </h1>
            <h1 className="text-start text-amber-500 bg-zinc-100 p-1">${product.price}</h1>
          </div>
        ))}
      </div>
    </div>
  );
}
