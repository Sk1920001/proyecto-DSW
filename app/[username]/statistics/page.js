"use client";
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAppContext } from "../../index";
import * as Yup from "yup";
import  BarChartx  from "../../components/BarChartx";
import  BarCharty  from "../../components/BarCharty";



export default function page() {
  const [formData, setFormData] = useState({
    table: '',
    order: '',
    field: '',
    values:''
  });

  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const { userLanguage } = useAppContext();
  const [formErrors, setFormErrors] = useState({});
  const [graphData, setGraphData] = useState({});
  const [isSubmmited, setIsSubmmited] = useState(false);
  const [axis, setAxis] = useState("x");

  const validationSchema = Yup.object({
    table: Yup.string().required(`${userLanguage === 'es' ? '*Requerido' : '*Required'}`),
    order: Yup.string().required(`${userLanguage === 'es' ? '*Requerido' : '*Required'}`),
    field: Yup.string().required(`${userLanguage === 'es' ? '*Requerido' : '*Required'}`),
    values: Yup.string().required(`${userLanguage === 'es' ? '*Requerido' : '*Required'}`),
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
    const { name, value} = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value 
    }));
    console.log(formData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    for (const key in formData) {
      data.append(key, formData[key]);
    }
    console.log(data)
    if(data.get("field") === 'name_category' && data.get("values") === 'price'){
      data.delete("field");
      data.append("field", "name");
    }



    try {
        await validationSchema.validate({table:data.get("table"),
                                         order:data.get("order"),
                                         field:data.get("field"),
                                         values:data.get("values")},
                                         {abortEarly : false})

        const response= await axios.get("/api/graphs-data",{params:{table:data.get("table"),
                                                          order:data.get("order"),
                                                          values:data.get("values"),
                                                          field:data.get("field")
                                                          }});
               

        const result = await response.data;
        console.log(result);
        const labels_values = result.productsData.reduce((acc,el) => {
          if(data.get("values") === 'quantity'){
            acc.push(el.quantity);
          }else{
            acc.push(el.price);
          }
          return acc;
        },[]);

        const labels = result.productsData.reduce((acc,el) => {
          if (data.get("field") === "name"){
            if(userLanguage === 'es'){
              acc.push(el.name);
            }else{
            acc.push(el.name_en);
            }
          }else{
            if(userLanguage === 'es'){
              acc.push(el.name_category);
            }else{
              acc.push(el.name_category_en);
            }
          }
          return acc;
        },[]);
        console.log(labels);



        const bardata = {
          labels: labels,
          datasets: [
            {
              label: `${data.get("values") === 'price' ?
                      `${userLanguage === 'es' ? "Precio en pesos chilenos (CLP)" : "Price in Chilean Pesos (CLP)"}` :
                      `${userLanguage === 'es' ? "Cantidad" : "Quantity"}`}`, 
              data: labels_values, 
              backgroundColor: ["rgba(255, 211, 77, 1)"], // rgba(r,g,b,transparencia)
              borderColor:["rgba(0, 0, 0, 1)"],
              borderWidth:1
            }
          ]
        };
        setGraphData(bardata);

        if(data.get("field") === 'name'){
          setAxis("y");
        }else{
          setAxis("x");
        }


        setIsSubmmited(true);
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
    }
  


    setFormData({
      table: data.get("table"), 
      order: data.get("order"), 
      field: data.get("field"), 
      values: data.get("values") 
    });
    setFormErrors({})
  }

    
  return (
    <div className="w-full h-full sm:w-[600px]">
      <form onSubmit={handleSubmit} className=" mx-auto p-4">
        <h2 className="text-2xl font-bold mb-4 text-center">{data ? data.statistics_title : ""}</h2>

        <div className="mb-4">
          <label htmlFor="table" className="block mb-1">{data ? data.statistics_table : ""}</label>

          <select
            name="table"
            id="table"
            value={formData.table}
            onChange={handleChange}
            className="border border-gray-300 p-2 w-full"
          >
            <option value="" disabled>-- {data ? data.select_category : ""} --</option>
            <option value="products">{data ? data.statistics_products : ""}</option>
          </select>
        </div>

        {formErrors.table && <h1 className="text-red-500 text-sm pb-2">{formErrors.table}</h1>}



        <div className="mb-4">
          <label htmlFor="order" className="block mb-1">{data ? data.statistics_order : ""}</label>

          <select
            name="order"
            id="order"
            value={formData.order}
            onChange={handleChange}
            className="border border-gray-300 p-2 w-full"
          >
            <option value="" disabled>-- {data ? data.select_category : ""} --</option>
            <option value="ASC">{data ? data.statistics_asc : ""}</option>
            <option value="DESC">{data ? data.statistics_desc : ""}</option>
          </select>
        </div>
        {formErrors.order && <h1 className="text-red-500 text-sm pb-2">{formErrors.order}</h1>}

        <div className="mb-4">
          <label htmlFor="field" className="block mb-1">{data ? data.statistics_filter : ""}</label>

          <select
            name="field"
            id="field"
            value={formData.field}
            onChange={handleChange}
            className="border border-gray-300 p-2 w-full"
          >
            <option value="" disabled>-- {data ? data.select_category : ""} --</option>
            {formData.values !== 'price' && <option value="name_category">{data ? data.statistics_material : ""}</option>}
            <option value="name">{data ? data.statistics_prod_name : ""}</option>
          </select>
        </div>
        {formErrors.field && <h1 className="text-red-500 text-sm pb-2">{formErrors.field}</h1>}

        <div className="mb-4">
          <label htmlFor="values" className="block mb-1">{data ? data.statistics_values : ""}</label>

          <select
            name="values"
            id="values"
            value={formData.values}
            onChange={handleChange}
            className="border border-gray-300 p-2 w-full"
          >
            <option value="" disabled>-- {data ? data.select_category : ""} --</option>
            <option value="quantity">{data ? data.statistics_quantity : ""}</option>
            <option value="price">{data ? data.statistics_price : ""}</option>
          </select>
        </div>
        {formErrors.values && <h1 className="text-red-500 text-sm pb-2">{formErrors.values}</h1>}
        

        <button type="submit" className="bg-zinc-900 text-amber-200 hover:text-zinc-100 p-2 rounded">
          {data ? data.statistics_generate : "" }
        </button>
        {isSubmmited && axis === 'x' && <BarChartx  data={graphData} axis={axis}/>}
        {isSubmmited && axis === 'y' && <BarCharty  data={graphData} axis={axis}/>}
      </form>
    </div>
  );
};

