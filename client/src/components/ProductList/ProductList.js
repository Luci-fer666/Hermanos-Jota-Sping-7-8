import './ProductList.css';
import ProductCard from '../ProductCard/ProductCard.js';
import React, { useState, useEffect } from 'react';

function ProductList() {
  const [productos, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/productos`);
        if (!response.ok) {
          throw new Error('La respuesta de la red no fue satisfactoria');
        }
        const data = await response.json();
        console.log("Productos recibidos:", data);
        setProducts(data);
      } catch (err) {
        console.error("Error fetching productos:", err);
        setError(err);
      } finally {
        setLoading(false);
      } };
    fetchProducts(); }, []);
  if (loading) {
    return <p>Cargando productos...</p>; }
  if (error) {
    return <p>Error al cargar los datos: {error.message}</p>; }

    return (<>
        <ul id="lista-productos" className="product-grid" aria-live="polite">
          {productos.map(producto => (
            <li key={producto._id}>
              <ProductCard 
                key={producto._id}
                producto={producto}
                />
            </li>
            ))}
        </ul>
    </>);
}
export default ProductList;