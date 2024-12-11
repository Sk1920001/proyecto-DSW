import React from 'react';

const Table = () => {
  // Datos de ejemplo con la columna `name` para el nombre del producto
  const data = [
    { id: 1, name_category: 'Acero inoxidable', name: 'Tenedor', price: 20.5, quantity: 100 },
    { id: 2, name_category: 'Bañada en plata', name: 'Cuchillo', price: 40.0, quantity: 150 },
    { id: 3, name_category: 'Bañada en oro', name: 'Cucharón', price: 60.75, quantity: 80 },
    { id: 4, name_category: 'Plata', name: 'Taza', price: 30.0, quantity: 200 },
  ];

  return (
    <div className="w-[300px] sm:w-[600px]">
      <h2>Product Categories</h2>
      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name Category</th>
            <th>Name</th> {/* Nueva columna para el nombre del producto */}
            <th>Price</th>
            <th>Quantity</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.name_category}</td>
              <td>{item.name}</td> {/* Mostramos el nombre del producto */}
              <td>${item.price}</td>
              <td>{item.quantity}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
