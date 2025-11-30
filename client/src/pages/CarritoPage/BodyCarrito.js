import './BodyCarrito.css';
import CarritoCard from '../../components/CarritoProductCart/CarritoCart';
import React, { useContext } from 'react';
import { CartContext } from '../../auth/CartContext';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";

function CarritoBody() {
  const { cartItems, clearCart} = useContext(CartContext);
  const navigate = useNavigate();

  const total = cartItems.reduce(
    (acc, item) => acc + item.precio * item.quantity,
    0
  );

   const realizarPedido = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("No hay sesión activa");
        return;
      }
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/mis-compras`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          items: cartItems,
          total: total
        })
      });
      const data = await response.json();
      if (!response.ok) {
        alert(data.message || "Error al procesar pedido");
        return;
      }
      alert("Pedido realizado con éxito!");
      clearCart();
      const decoded = jwtDecode(token);
      const userId = decoded.id;
      navigate(`/mis-pedidos/${userId}`);
    } catch (error) {
      console.error(error);
      alert("Error inesperado");
    }
  };

  return (
    <main className="contenido">
      <div className="background-main">
        <h1 class="titulo-pagina">Carrito de compras</h1>

        {cartItems.length === 0 && (
          <p>No hay productos en el carrito.</p>
        )}

        <section className="resumen-carrito">
          <ol id="carrito-lista" className="carrito-grid" aria-live="polite">
            {cartItems.map((producto) => (
              <div key={producto._id}>
                <CarritoCard
                  producto={producto}
                />
              </div>
            ))}

          </ol>

          <div className="total">
            <p>
              Total:{' '}
              <strong>
                ARS ${total}
              </strong>
            </p>
            <button id="vaciar-carrito" className="btncar" onClick={clearCart}>
              Vaciar carrito
            </button>
            <button id="vaciar-carrito" className="btncar" 
            onClick={() => realizarPedido()}
            >
              Realizar pedido
            </button>
          </div>
        </section>
      </div>
    </main>
  );
}

export default CarritoBody;