import { insertItem } from "../../../lib/db";

export async function POST(req) {
    const {name, name_en, description, id_category, image_path, quantity, price} = await req.json(); // Asegúrate de extraer el cuerpo de la solicitud
    
    try {
        // Llama a la función que se conecta con la base de datos
        await insertItem({name, name_en, description, id_category, image_path, quantity, price});
        return new Response(JSON.stringify({ message: "Usuario registrado exitosamente" }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        console.error("Error al registrar el usuario:", error);
        return new Response(JSON.stringify({ error: "Hubo un error al registrar el usuario" }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}

export async function GET(req) {
    // Si necesitas manejar solicitudes GET, puedes implementarlo aquí
    return new Response(JSON.stringify({ message: "Método GET no implementado" }), {
        status: 501,
        headers: { 'Content-Type': 'application/json' },
    });
}
