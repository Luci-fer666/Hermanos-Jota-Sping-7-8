import { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { AuthContext } from '../../auth/AuthContext.js';
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
    <main className="contenido-pedidos">
      <h1 className="titulo-pagina">Mis Pedidos</h1>

      {pedidos.length === 0 && (
        <p>No has realizado ninguna compra todavía.</p>
      )}

      <div className="lista-pedidos">
        {pedidos.map((pedido) => ( 
          <div key={pedido._id} className="pedido-card">
            
            <div className="pedido-header">
              <div className="info-pedido">
                <h3>Pedido #{pedido._id.slice(-6)}</h3>
                <span className="fecha-pedido">
                  {new Date(pedido.createdAt).toLocaleDateString()}
                </span>
              </div>
              
              <div className="resumen-pedido">
                <p className="total-monto">Total: ${pedido.total}</p>
              </div>
            </div>

            <div className="pedido-items">
              <h4>Productos:</h4>
              <ul className="lista-items">
                {pedido.items.map((item, index) => (
                  <li key={index} className="item-detalle">
                    <div className="item-nombre">
                      {item.nombre} 
                      <small className="item-cantidad">(x{item.cantidad})</small>
                    </div>
                    <div className="item-precio">
                      ${item.precio * item.cantidad}
                    </div>
                  </li>
                ))}
              </ul>
            </div>

          </div>
        ))}
      </div>
    </main>
  );
}
export default Pedidos;
