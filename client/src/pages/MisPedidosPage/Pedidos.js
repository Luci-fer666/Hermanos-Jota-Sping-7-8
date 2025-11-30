import { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { AuthContext } from '../../auth/AuthContext.js';
import CarritoCard from '../../components/CarritoProductCart/CarritoCart';
import { useNavigate } from 'react-router-dom';
import './Pedidos.css';


function Pedidos() {
    const { currentUser } = useContext(AuthContext);
    const navigate = useNavigate();
    const { id } = useParams();
    const [pedidos, setPedidos] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPedidos = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/mis-compras`);

        if (response.status === 404) {
          setPedidos(null);
          setLoading(false);
          return;
        }

        if (!response.ok) {
          throw new Error('No se pudo obtener los pedidos del usuario');
        }

        const data = await response.json();
        console.log("Pedidos recibidos:", data);

        setPedidos(data);

      } catch (err) {
        console.error("Error al obtener los pedidos del usuario:", err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchPedidos();
    }
  }, [id]);

  if (loading) return <p>Cargando perfil...</p>;
  if (!currentUser){
    navigate("/login");
    return <p>Debes iniciar sesión para visualizar esta página</p>;
  }
  if (error) return <p>Error: {error.message}</p>;
  if (!pedidos) return <p>No se encontraron pedidos</p>;

  return (
  <>
   <ul id="lista-productos" className="product-grid" aria-live="polite">
            {pedidos.map(pedido => (
              <div key={pedido._id}>
                <CarritoCard
                  producto={pedido}
                  />
              </div>
              ))}
          </ul>
  </>
  )
};
export default Pedidos;
