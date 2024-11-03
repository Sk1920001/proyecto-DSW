import { fetchProducts } from "../../../lib/db";
import Image from "next/image";
import  ProductsGrid from "../../components/ProductsGrid"; // si es export default usar sin corchetes!



export default async function Page() {
  const products = await fetchProducts({category : 'Plata'}); //the input is an object
  return(

    <div>
    <ProductsGrid products={products}/> 
    </div>


  );

  
}
