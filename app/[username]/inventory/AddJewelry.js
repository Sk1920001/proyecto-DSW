// app/AddJewelry.js
import { useState } from 'react';
import axios from 'axios';

const AddJewelry = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    id_category: '',
    quantity: '',
    price: '',
    image: null // Para almacenar el archivo de imagen
  });

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'file' ? files[0] : value // Manejar el archivo de imagen
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Crear un FormData para enviar los datos incluyendo el archivo de imagen
    const data = new FormData();
    for (const key in formData) {
      data.append(key, formData[key]);
    }

    const response_save_image = await axios.post('/api/save-image', data);

    try {
        const response_insert_item = await axios.post("/api/inventory",{name:data.get("name"),
                                                          description:data.get("description"),
                                                          id_category:data.get("id_category"),
                                                          image_path:`/${data.get("image").name}`,
                                                          quantity:data.get("quantity"),
                                                          price:data.get("price")
                                                          });
        

        if (!response_insert_item) {
            const errorData = await response_save_image.data;
            console.error('Error al registrar el item:', errorData.message);
            return;
        }

        const result = await response_insert_item.data;
        console.log('Item registrado exitosamente:', result);
    } catch (error) {
        console.error('Error al registrar el item:', error);
    }
  


    setFormData({
      name: '',
      description: '',
      id_category: '',
      quantity: '',
      price: '',
      image: null
    });
  }

    
  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Añadir Joya Nueva</h2>

      <div className="mb-4">
        <label htmlFor="name" className="block mb-1">Nombre</label>
        <input
          type="text"
          name="name"
          id="name"
          value={formData.name}
          onChange={handleChange}
          required
          className="border border-gray-300 p-2 w-full"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="description" className="block mb-1">Descripción</label>
        <textarea
          name="description"
          id="description"
          value={formData.description}
          onChange={handleChange}
          required
          className="border border-gray-300 p-2 w-full"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="id_category" className="block mb-1">ID de Categoría</label>
        <input
          type="text"
          name="id_category"
          id="id_category"
          value={formData.id_category}
          onChange={handleChange}
          required
          className="border border-gray-300 p-2 w-full"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="image" className="block mb-1">Subir Imagen</label>
        <input
          type="file"
          name="image"
          id="image"
          onChange={handleChange}
          accept="image/*" // Aceptar solo imágenes
          required
          className="border border-gray-300 p-2 w-full"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="quantity" className="block mb-1">Cantidad</label>
        <input
          type="text" // Cambiado de number a text
          name="quantity"
          id="quantity"
          value={formData.quantity}
          onChange={handleChange}
          required
          className="border border-gray-300 p-2 w-full"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="price" className="block mb-1">Precio</label>
        <input
          type="text" // Cambiado de number a text
          name="price"
          id="price"
          value={formData.price}
          onChange={handleChange}
          required
          className="border border-gray-300 p-2 w-full"
        />
      </div>

      <button type="submit" className="bg-zinc-900 text-amber-200 hover:text-zinc-100 p-2 rounded">Añadir Joya</button>
    </form>
  );
};

export default AddJewelry;
