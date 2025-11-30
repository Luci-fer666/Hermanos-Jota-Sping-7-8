import './Navbar.css';
import { AuthContext } from '../../auth/AuthContext.js';
import { CartContext } from '../../auth/CartContext';
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  const { currentUser } = useContext(AuthContext);
  const { cartItems } = useContext(CartContext);
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
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
              ({totalItems})
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
      </header>
    </>
  );
}

export default Navbar;