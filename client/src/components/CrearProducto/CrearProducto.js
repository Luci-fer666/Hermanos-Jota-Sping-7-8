import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../auth/AuthContext.js';
import './CrearProducto.css';

function CrearProducto() {
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nombre: "",
    imagenUrl: '',
    precio: "",
    descripcion: "",
    medidas: "",
    materiales: "",
    masCaracteristicas: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value 
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("Datos a enviar:", formData);
 
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/productos`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData), 
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message ||'La creacion falló.');
      }
      //const result = await response.json();
      alert(`¡Creacion exitosa para ${formData.nombre}`);
      
      setFormData({ nombre: '', imagenUrl: '', precio: '', descripcion: '', medidas: "", materiales: "", masCaracteristicas: ""});
      //navigate(`/producto/${result._id}`);
      navigate("/productos")
 
    } catch (error) {
      alert(error.message);
    }
  };
    if (!currentUser || !currentUser.rol || !currentUser.roles.includes('admin')) 
      {
        return <p>Debes logearte como administrador para crear productos</p>;
      }

return (
    <div className="crear-producto-container">
      <h2 className="titulo-formulario">Agregar nuevo producto</h2>
      <form className="formulario-producto" onSubmit={handleSubmit}>
        
        <div className="campo-formulario">
          <label htmlFor="nombre">Nombre del producto:</label>
          <input
            type="text"
            id="nombre"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            required
          />
        </div>

        <div className="campo-formulario">
          <label htmlFor="imagenUrl">Imagen del Producto</label>
          <input
            type="url"
            id="imagenUrl"
            name="imagenUrl"
            value={formData.imagenUrl}
            onChange={handleChange}
          />
        </div>

        <div className="campo-formulario">
          <label htmlFor="precio">Precio:</label>
          <input
            type="number"
            id="precio"
            name="precio"
            value={formData.precio}
            onChange={handleChange}
            required
          />
        </div>

        <div className="campo-formulario">
          <label htmlFor="descripcion">Descripción:</label>
          <textarea
            id="descripcion"
            name="descripcion"
            value={formData.descripcion}
            onChange={handleChange}
            rows="4"
          ></textarea>
        </div>

        <div className="campo-formulario">
          <label htmlFor="medidas">Medidas:</label>
          <input
            type="text"
            id="medidas"
            name="medidas"
            value={formData.medidas}
            onChange={handleChange}
          />
        </div>

        <div className="campo-formulario">
          <label htmlFor="materiales">Materiales:</label>
          <input
            type="text"
            id="materiales"
            name="materiales"
            value={formData.materiales}
            onChange={handleChange}
          />
        </div>

        <div className="campo-formulario">
          <label htmlFor="masCaracteristicas">Más características:</label>
          <textarea
            id="masCaracteristicas"
            name="masCaracteristicas"
            value={formData.masCaracteristicas}
            onChange={handleChange}
            rows="3"
          ></textarea>
        </div>

        <button type="submit" className="btn-crear">
          Crear Producto
        </button>
      </form>
    </div>
  );
}
export default CrearProducto;