import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Register.css';
import { Link } from 'react-router-dom';

function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
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
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/users/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('El registro falló.');
      }

      alert(`¡Registro exitoso para ${formData.username}!`);
      setFormData({ username: "", email: "", password: "" });
      navigate("/productos");

    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="registro-container">
      <h2 className="titulo-formulario">Crear cuenta nueva</h2>

      <form className="formulario-producto" onSubmit={handleSubmit}>
        <div className="campo-formulario">
          <label htmlFor="username">Nombre de usuario</label>
          <input
            type="text"
            id="username"
            name="username"
            placeholder="Ej: josejose"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>

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
          Registrarse
        </button>

      </form>
      <Link to="/login">Ya tienes una cuenta?</Link>
    </div>
  );
}

export default Register;