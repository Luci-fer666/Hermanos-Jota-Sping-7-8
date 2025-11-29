import './ProductCard.css';
import { Link } from 'react-router-dom';

function ProductCard({producto}) {

    return (
    <li className="producto-item">
      <Link to={`/producto/${producto._id}`}>
        <img src={producto.imagen} alt={producto.nombre}/>
      </Link>
        
      <Link to={`/producto/${producto._id}`}>
        <h3 className="nombre-producto">
          {producto.nombre}
        </h3>
      </Link>
      <p className="precio-producto"><strong>ARS</strong> $ {producto.precio}</p>
      <p className="descripcion-producto">{producto.descripcion}</p>
    </li>
  );
}
export default ProductCard;
