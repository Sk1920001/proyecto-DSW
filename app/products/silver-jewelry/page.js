import { fetchProducts } from "../../../lib/db";
import Image from "next/image";

export default async function Page() {
  const products = await fetchProducts({category : "Plata"}); //the input is an object
  return(

    <div className="mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-2 p-3">
        {products.map((product) => (
          <div className="border border-zinc-200" key={product.id_product}>
            <Image className="mx-auto pt-2" src={product.image_path} alt={product.name} width={200} height={200}/>
            <h1 className="border-t border-zinc-200 text-start text-zinc-600 bg-zinc-100 p-1">{product.name}</h1>
            <h1 className="text-start text-zinc-600 bg-zinc-100 p-1">${product.price}</h1>
          </div>
        ))}
      </div>

    </div>


  );

  
}
