import './CarritoCart.css';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { CartContext } from '../../auth/CartContext';

function CarritoCard({ producto }) {
  const { removeItem } = useContext(CartContext);

  return (
    <li className="carrito-card">
      <img
        className="carrito-img"
        src={producto.imagen}
        alt={producto.nombre}
      />

      <div className="carrito-info">
        <Link to={`/producto/${producto._id}`}>
          <h3 className="carrito-nombre">{producto.nombre}</h3>
        </Link>

        <p className="carrito-precio">
          <strong>ARS</strong> ${producto.precio}
        </p>

        <p className="carrito-cantidad">
          Cantidad: <strong>{producto.quantity}</strong>
        </p>

        <button
          className="carrito-remove"
          onClick={() => removeItem(producto._id)}
        >
          Remover
        </button>
      </div>
    </li>
  );
}

export default CarritoCard;