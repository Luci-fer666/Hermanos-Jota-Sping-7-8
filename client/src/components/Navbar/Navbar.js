import './Navbar.css';
import { AuthContext } from '../../auth/AuthContext.js';
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

function Navbar({ contadorCuenta }) {
  const { currentUser } = useContext(AuthContext);
  const userId = currentUser?.id;
  return (
    <>
      <header className="site-header">
        <div className="branding">
          <Link to="/" className="brand">
            <img
              id="logo"
              src="/assets/img/logo.svg"
              alt="Icono Hermanos Jota"
            />
          </Link>
        </div>

        <nav className="site-nav" aria-label="Principal">
          <Link to="/">Inicio</Link>
          <Link to="/productos">Productos</Link>
          <Link to="/contacto">Contacto</Link>
          <Link to="/carrito">
            Carrito{' '}
            <span id="cart-count" aria-live="polite">
              {contadorCuenta}
            </span>
          </Link>
          {currentUser ? (
            <>
              <Link to={`/perfil/${userId}`}>MiPerfil</Link>
            </>) : 
            (
            <Link to="/login">Login</Link>
            )}
        </nav>

        <form className="search" role="search">
          <label htmlFor="q" className="visually-hidden">
            Buscar
          </label>
          <input
            id="q"
            name="q"
            type="search"
            placeholder="Buscar muebles…"
          />
          <button id="boton-buscar" type="submit">
            Buscar
          </button>
        </form>
      </header>
    </>
  );
}

export default Navbar;