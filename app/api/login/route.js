import { loginUser } from "../../../lib/db";

export async function POST(req) {

    const { email,password} = await req.json(); // Asegúrate de extraer el cuerpo de la solicitud
    
    try {
        // Llama a la función que se conecta con la base de datos
        const {user,admin} = await loginUser({ email:email, password:password});
        return new Response(JSON.stringify({ 
            message: "Usuario logeado exitosamente",
            user : user,
            admin : admin,
            email: email}), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        console.error("Error al logear el usuario:", error);
        return new Response(JSON.stringify({ error: "Hubo un error al logear el usuario" }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}

export async function GET(req) { //Un GET es visible desde la URL, un POST no!
    // Si necesitas manejar solicitudes GET, puedes implementarlo aquí
    return new Response(JSON.stringify({ message: "Método POST no implementado" }), {
        status: 501,
        headers: { 'Content-Type': 'application/json' },
    });
}
