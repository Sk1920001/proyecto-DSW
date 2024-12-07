"use client";
import Image from "next/image";
import Link from "next/link";
import { useAppContext } from "../index";
import axios from "axios";
import { useEffect } from "react";

export default function RecomendedProducts({ category }) {
  const {userLanguage,products,setProducts} = useAppContext();

  //This useEffect changes the products data
  useEffect(() => {
    const fetchData = async () => {

      if(products.length === 0){

        try {
            const response = await axios.get("/api/products");
            

            if (!response) {
                const errorData = await response.data;
                console.error('Error while fetching data :', errorData.message);
                return;
            }

            console.log('Data fetched succesfully');
            setProducts(response.data.productsData);
            

        } catch (error) {
            console.error('Error while fetching data:', error);
        
        };
      };
    };

    fetchData();
  }, []); 

  const data = products.reduce((acc, el) => {
    if (el.name_category === category) {
      acc.push(el); 
    }
    return acc; 
  }, []);

  return (
    <div className="mx-auto">
      <div className="grid grid-cols-1 text-sm sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4  w-3/4 mx-auto gap-2 p-3">
        {data.slice(0,4).map((product) => (
          <Link href={`/product-id/${product.id_product}/product-info`}>
            <div className="border border-zinc-200" key={product.id_product}>
              <div className="w-48 h-48 relative mx-auto">
                <Image src={product.image_path} fill alt={product.name} />
              </div>
              <h1 className="border-t border-zinc-200 text-start text-zinc-600 bg-zinc-100 p-1">
                {userLanguage === "es" ? product.name : product.name_en}
              </h1>
              <h1 className="text-start text-amber-500 bg-zinc-100 p-1">${product.price}</h1>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
