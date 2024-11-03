
// app/api/jewelry/route.js
import fs from 'fs/promises';
import path from 'path';
import { NextResponse } from 'next/server';

export const POST = async (req) => {
  const formData = await req.formData(); // Capturamos el FormData de la solicitud
  const image = formData.get('image'); // Obtenemos el archivo de imagen

  if (!image) {
    return NextResponse.json({ error: 'No se ha recibido imagen.' }, { status: 400 });
  }

  const buffer = Buffer.from(await image.arrayBuffer()); // Convertimos el archivo a Buffer
  const newPath = path.join(process.cwd(), 'public', image.name); // Ruta destino en la carpeta public

  try {
    await fs.writeFile(newPath, buffer); // Guardamos el archivo en la carpeta public
    return NextResponse.json({ message: 'Archivo guardado exitosamente' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Error al mover el archivo' }, { status: 500 });
  }
};

