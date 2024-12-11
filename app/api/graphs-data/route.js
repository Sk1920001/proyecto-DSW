import { fetchGraphData } from "../../../lib/db";

export async function GET(req) {
    const { searchParams } = new URL(req.url);

    const table = searchParams.get("table");
    const order = searchParams.get("order");
    const quantity = parseInt(searchParams.get("quantity"));
    const field = searchParams.get("field");
    const values = searchParams.get("values");

    try {
        // Llama a la función que se conecta con la base de datos
        const data = await fetchGraphData({table:table,order:order,quantity:quantity,field:field, values:values});
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
