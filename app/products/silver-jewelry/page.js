import { fetchProducts } from "../../../lib/db";
import Image from "next/image";
import  ProductsGrid from "../../components/ProductsGrid"; // si es export default usar sin corchetes!



export default async function Page() {
  return(

    <div>
    <ProductsGrid category={"Plata"}/> 
    </div>


  );

  
}
