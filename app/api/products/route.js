import { fetchProducts } from "../../../lib/db";

export async function GET(req) {
    
    try {
        // Llama a la función que se conecta con la base de datos
        const data = await fetchProducts();
        return new Response(JSON.stringify({ message: "Data fetched succsesfuly",productsData: data }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        console.error("Error while fetching data :", error);
        return new Response(JSON.stringify({ error: "Error while fetching products data" }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}

export async function POST(req) {
    // Si necesitas manejar solicitudes GET, puedes implementarlo aquí
    return new Response(JSON.stringify({ message: "POST method not implemented" }), {
        status: 501,
        headers: { 'Content-Type': 'application/json' },
    });
}
