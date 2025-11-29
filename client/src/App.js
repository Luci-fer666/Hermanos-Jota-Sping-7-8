import Navbar from './components/Navbar/Navbar.js';
import Footer from './components/Footer/Footer.js';
import ProductosBody from './pages/ProductosPage/ProductosBody.js';
import ProductoIndividualBody from './pages/ProductosDetailPage/ProductDetail.js';
import CarritoBody from './pages/CarritoPage/BodyCarrito.js';
import CrearProducto from './components/CrearProducto/CrearProducto.js';
import ContactForm from './components/ContactForm/ContactForm.js';
import IndexBody from './pages/HomePage/BodyIndex.js';
import Registro from './pages/RegistroPage/Register.js';
import Login from './pages/LoginPage/Login.js';
import Perfil from './pages/PerfilPage/Perfil.js';
import Pedidos from './pages/MisPedidosPage/Pedidos.js';
import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';

function App() {
    const [carrito, setCarrito] = useState([]);

    const agregarAlCarrito = (idProducto) => {
    setCarrito(prev => [...prev, idProducto]);};
    
  return (
    <div className="App">
      <Navbar  contadorCuenta={carrito.length} />
      <Routes>
        <Route path="/" element={ <IndexBody/> } />
        <Route path="/productos" element={ <ProductosBody/> } />
        <Route path="/carrito" element={ <CarritoBody carrito={carrito} /> } />
        <Route path="/contacto" element={ <ContactForm /> } />
        <Route path="/register" element={ <Registro/> } />
        <Route path="/login" element={ <Login/> } />
        <Route path="/perfil/:id" element={ <Perfil/> } />
        <Route path="/admin/crear-producto" element={ <CrearProducto/> } />
        <Route path='/mis-pedidos' element={ <Pedidos/> } />
        <Route path="/producto/:id" element={ <ProductoIndividualBody agregarAlCarrito={agregarAlCarrito} /> } />
      </Routes>
      <Footer/> 
    </div>
  );}

export default App;
