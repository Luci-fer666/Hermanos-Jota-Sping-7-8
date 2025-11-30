import React from "react";
import "./TarjetaPedido.css"; // opcional

function TarjetaPedido({ pedido }) {
  if (!pedido) return null;

  return (
    <div className="tarjeta-pedido">

      <h2 className="tp-titulo">Pedido #{pedido._id}</h2>

      <p className="tp-fecha">
        Fecha: {new Date(pedido.createdAt).toLocaleString()}
      </p>

      <p className="tp-total">
        Total: <strong>${pedido.total}</strong>
      </p>

      <h3 className="tp-subtitulo">Productos:</h3>

      <ul className="tp-items">
        {pedido.items.map((item, i) => (
          <li key={i} className="tp-item">
            {item.nombre} x {item.cantidad}
          </li>
        ))}
      </ul>

    </div>
  );
}

export default TarjetaPedido;