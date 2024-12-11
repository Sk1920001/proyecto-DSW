// app/AddJewelry.js
"use client";
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAppContext } from "../../index";
import * as Yup from "yup";


const AddJewelry = () => {
  const [formData, setFormData] = useState({
    name: '',
    name_en: '',
    description: '',
    description_en : '',
    id_category: '',
    quantity: 0,
    price: 0,
    image: ''// Para almacenar el archivo de imagen
  });

  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const { userLanguage } = useAppContext();
  const [formErrors, setFormErrors] = useState({});
  const [isRegistered, setIsRegistered] = useState(false);

  const validationSchema = Yup.object({
    name : Yup.string().required(`${userLanguage === 'es' ? '*Requerido' : '*Required'}`),
    name_en : Yup.string().required(`${userLanguage === 'es' ? '*Requerido' : '*Required'}`),
    description : Yup.string().required(`${userLanguage === 'es' ? '*Requerido' : '*Required'}`),
    description_en : Yup.string().required(`${userLanguage === 'es' ? '*Requerido' : '*Required'}`),
    id_category : Yup.string().required(`${userLanguage === 'es' ? '*Requerido' : '*Required'}`),
    quantity: Yup.number()
    .required(`${userLanguage === 'es' ? '*Requerido' : '*Required'}`)
    .min(1,`${userLanguage === 'es' ? 'La cantidad debe ser al menos 1' : 'Quantity must be at least 1'}`),
    price: Yup.number()
    .required(`${userLanguage === 'es' ? '*Requerido' : '*Required'}`)
    .min(100,`${userLanguage === 'es' ? 'El precio debe ser al menos $100' : 'Price must be at least $100'}`),
    image: Yup.mixed()
      .required(`${userLanguage === 'es' ? '*Requerido' : '*Required'}`)
      .test('not-empty', `${userLanguage === 'es' ? '*Requerido' : '*Required'}`, (value) => {
        console.log(value);
        return value !== ""; // Verifica que no sea una cadena vacía
      })
  });


  useEffect(() => {
    const fetchData = async () => {
      try {
        // Asegúrate de usar la ruta correcta al JSON
        const response = await fetch(`/messages/${userLanguage}.json`);
        

        if (!response.ok) {
          throw new Error('Error en la carga de datos');
        }
        const jsonData = await response.json();
        setData(jsonData);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchData();
  }, [userLanguage]); // hace el fetch cada vez que se actualiza userLanguage;



  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'file'  ? files[0] : value // Manejar el archivo de imagen
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsRegistered(false);

    // Crear un FormData para enviar los datos incluyendo el archivo de imagen
    const data = new FormData();
    for (const key in formData) {
      data.append(key, formData[key]);
    }


    try {
        await validationSchema.validate({name:data.get("name"),
                                         name_en:data.get("name_en"),
                                         description:data.get("description"),
                                         description_en:data.get("description_en"),
                                         id_category:data.get("id_category"),
                                         image:data.get("image"),
                                         quantity:data.get("quantity"),
                                         price:data.get("price")},
                                         {abortEarly : false})

        const response_insert_item = await axios.post("/api/inventory",{name:data.get("name"),
                                                          name_en:data.get("name_en"),
                                                          description:data.get("description"),
                                                          description_en:data.get("description_en"),
                                                          id_category:data.get("id_category"),
                                                          image_path:`/${data.get("image").name}`,
                                                          quantity:data.get("quantity"),
                                                          price:data.get("price")
                                                          });
        if(data.get("image")){
          const response_save_image = await axios.post('/api/save-image', data);
        }       

        const result = await response_insert_item.data;
        console.log('Item registrado exitosamente:', result);
    } catch (error) {
        if(error instanceof Yup.ValidationError){
          const newErrors = {};
          error.inner.forEach(err =>{
            newErrors[err.path] = err.message;
          })
          setFormErrors(newErrors);
          console.log(formErrors);
          return
        }
        console.error('Error al registrar el item:', error);
        setIsRegistered(true);
    }
  


    setFormData({
      name: '',
      name_en: '',
      description: '',
      description_en: '',
      id_category: '',
      quantity: '',
      price: '',
      image: null
    });
  }

    
  return (
    <form onSubmit={handleSubmit} className="w-full sm:w-[600px] mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4 text-center">{data ? data.addItem: ""}</h2>

      <div className="mb-4">
        <label htmlFor="name" className="block mb-1">{data ? data.itemName : ""}</label>
        <input
          type="text"
          name="name"
          id="name"
          value={formData.name}
          onChange={handleChange}
          className="border border-gray-300 p-2 w-full"
        />
      </div>
      {formErrors.name && <h1 className="text-red-500 text-sm pb-2">{formErrors.name}</h1>}

      <div className="mb-4">
        <label htmlFor="name" className="block mb-1">{data ? data.itemName_en : ""}</label>
        <input
          type="text"
          name="name_en"
          id="name_en"
          value={formData.name_en}
          onChange={handleChange}
          className="border border-gray-300 p-2 w-full"
        />
      </div>
      {formErrors.name_en && <h1 className="text-red-500 text-sm pb-2">{formErrors.name_en}</h1>}

      <div className="mb-4">
        <label htmlFor="description" className="block mb-1">{data ? data.description_es : ""}</label>
        <textarea
          name="description"
          id="description"
          value={formData.description}
          onChange={handleChange}
          className="border border-gray-300 p-2 w-full"
        />
      </div>
      {formErrors.description && <h1 className="text-red-500 text-sm pb-2">{formErrors.description}</h1>}

      <div className="mb-4">
        <label htmlFor="description_en" className="block mb-1">{data ? data.description_en : ""}</label>
        <textarea
          name="description_en"
          id="description_en"
          value={formData.description_en}
          onChange={handleChange}
          className="border border-gray-300 p-2 w-full"
        />
      </div>
      {formErrors.description_en && <h1 className="text-red-500 text-sm pb-2">{formErrors.description_en}</h1>}

      <div className="mb-4">
        <label htmlFor="id_category" className="block mb-1">{data ? data.categoryId: ""}</label>

        <select
          name="id_category"
          id="id_category"
          value={formData.id_category}
          onChange={handleChange}
          className="border border-gray-300 p-2 w-full"
        >
          <option value="" disabled>-- {data ? data.select_category : ""} --</option>
          <option value="1">{data ? data.stainlessSteel : ""}</option>
          <option value="2">{data ? data.silverPlated : ""}</option>
          <option value="3">{data ? data.goldPlated : ""}</option>
          <option value="4">{data ? data.silver : ""}</option>
        </select>
      </div>
      {formErrors.id_category && <h1 className="text-red-500 text-sm pb-2">{formErrors.id_category}</h1>}

      <div className="mb-4">
        <label htmlFor="image" className="block mb-1">{data ? data.uploadImage : ""}</label>
        <input
          type="file"
          name="image"
          id="image"
          onChange={handleChange}
          accept="image/*" // Aceptar solo imágenes
          className="border border-gray-300 p-2 w-full"
        />
      </div>
      {formErrors.image && <h1 className="text-red-500 text-sm pb-2">{formErrors.image}</h1>}

      <div className="mb-4">
        <label htmlFor="quantity" className="block mb-1">{data ? data.quantity : ""}</label>
        <input
          type="text" // Cambiado de number a text
          name="quantity"
          id="quantity"
          value={formData.quantity}
          onChange={handleChange}
          className="border border-gray-300 p-2 w-full"
        />
      </div>
      {formErrors.quantity && <h1 className="text-red-500 text-sm pb-2">{formErrors.quantity}</h1>}

      <div className="mb-4">
        <label htmlFor="price" className="block mb-1">{data ? data.price : ""}</label>
        <input
          type="text" // Cambiado de number a text
          name="price"
          id="price"
          value={formData.price}
          onChange={handleChange}
          className="border border-gray-300 p-2 w-full"
        />
      </div>
      {formErrors.price && <h1 className="text-red-500 text-sm pb-2">{formErrors.price }</h1>}
      {isRegistered && <h1 className="text-red-500 text-sm pt-1 text-center ">{
        userLanguage === 'es' ? "El item ya se encuentra registrado": "The item is already registered"}</h1>}

      <button type="submit" className="bg-zinc-900 text-amber-200 hover:text-zinc-100 p-2 rounded">{data ? data.save : ""}</button>
    </form>
  );
};

export default AddJewelry;
