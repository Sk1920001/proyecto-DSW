import { fetchProducts } from "../../../lib/db";

export default async function Page() {
  const products = await fetchProducts();
  console.log(products);
  return(

    <div>
      <h1>Joyitas Lindas :D</h1>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            {product.nombre} - ${product.precio}
          </li>
        ))}
      </ul>

    </div>


  );

  
}
