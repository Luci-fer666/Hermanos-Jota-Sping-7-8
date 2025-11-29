import React, { useContext, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../../auth/AuthContext.js';
import { jwtDecode } from 'jwt-decode';
import './Login.css';

function Login() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
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
        throw new Error('El inicio de sesión falló.');
      }
     
      const data = await response.json(); 
      login(data.token);

      const decoded = jwtDecode(data.token);
      const userId = decoded.id; 
      if (!userId) {
        throw new Error("No se encontró el ID del usuario en el token.");
      }

      navigate(`/perfil/${userId}`);
      setFormData({ email: "", password: "" });
    } catch (error) {
      alert(error.message);
    }
  };
  return (
    <div>
      <div className="registro-container">
        <h2 className="titulo-formulario">Iniciar sesión</h2>
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
            Iniciar sesión
          </button>
        </form>
        <Link to="/register">Todavía no tienes una cuenta?</Link>
      </div>
    </div>
  );
}

export default Login;