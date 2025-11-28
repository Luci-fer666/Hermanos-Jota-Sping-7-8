import React, { useContext, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../../auth/AuthContext.js';
import './Login.css';

function Login(){
    const { login } = useContext(AuthContext);
      const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
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
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/users/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        throw new Error('El registro falló.');
      }
      if(response.ok){
        login(response.token);
      }
      setFormData({ email: "", password: "" });
      navigate("/productos");
    } catch (error) {
      alert(error.message);
    }
  }
    return(
    <div>
    <div className="registro-container">
      <h2 className="titulo-formulario">Crear cuenta nueva</h2>
      <form className="formulario-producto" onSubmit={handleSubmit}>
        <div className="campo-formulario">
          <label htmlFor="email">Correo electrónico</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Ej: joseemail@gmail.com"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="campo-formulario">
          <label htmlFor="password">Contraseña</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="asgfgergdsfds64/9*"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn-crear">
          Iniciar sesion
        </button>
      </form>
        <Link to="/register">Todavia no tienes una cuenta?</Link>
    </div>
    </div>)}

export default Login




