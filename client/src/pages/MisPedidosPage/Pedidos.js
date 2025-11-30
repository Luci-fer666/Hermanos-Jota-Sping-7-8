import { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { AuthContext } from '../../auth/AuthContext.js';
import TarjetaPedido from '../../components/TarjetaPedido/TarjetaPedido.js';
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
        const token = localStorage.getItem("token");
        if (!token) {
            throw new Error("No hay sesión activa");
        }
        
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/mis-compras`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        });

        if (response.status === 404) {
          setPedidos([]);
          setLoading(false);
          return;
        }

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'No se pudo obtener los pedidos');
        }

        const data = await response.json();
        setPedidos(data);

      } catch (err) {
        console.error(err);
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
        {pedidos.map((pedido) => (
          <li key={pedido._id}>
            <TarjetaPedido pedido={pedido} />
          </li>
        ))}
      </ul>
  </>
  )
};
export default Pedidos;
