import './BodyCarrito.css';
import CarritoCard from '../../components/CarritoProductCart/CarritoCart';
import React, { useContext } from 'react';
import { CartContext } from '../../auth/CartContext';

function CarritoBody() {
  const { cartItems, clearCart} = useContext(CartContext);

  const total = cartItems.reduce(
    (acc, item) => acc + item.precio * item.quantity,
    0
  );

  return (
    <main className="contenido">
      <div className="background-main">
        <h1>Carrito de compras</h1>

        {cartItems.length === 0 && (
          <p>No hay productos en el carrito.</p>
        )}

        <section className="resumen-carrito">
          <ol id="carrito-lista" className="carrito-grid" aria-live="polite">

            {cartItems.map((producto) => (
              <CarritoCard
				key={producto._id}
                producto={producto}
              />
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
          </div>
        </section>
      </div>
    </main>
  );
}

export default CarritoBody;