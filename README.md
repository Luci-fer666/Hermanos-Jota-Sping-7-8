<h1>Repositorio del grupo 14</h1>

# Mueblería Hermanos Jota — Sprint 5 y 6
    Sitio web dinamico con HTML, CSS y JavaScript utilizando tecnologias React y ExpressJS con NodeJS. Incluyendo funcionalidades de React Router, Fetch para la conexion con la APi y además de implementación de una base de datos externa en MongoDB y Mongosee
    Incluye páginas de inicio, catálogo de productos, detalle de producto y formulario de contacto con validaciones.

<div><b>Programadores: </b>
    <ul>
    <li> <span>Lautaro Zado <a href="https://github.com/lautarozado"><img src="https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white"></a></li> 
    <li>Guadalupe Grillo <a href="https://github.com/ggrillo729-art"><img src="https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white"></a></li> 
    <li>Luciano Illuminati <a href="https://github.com/Luci-fer666"><img src="https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white"></a></li> 
    <li>Lola Fioramanti <a href="https://github.com/lolafioramanti"><img src="https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white"></a></li> 
    <li>Eliana Ayelen Fuchs <a href="https://github.com/ElianaAFuchs"><img src="https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white"></a></li> 
    <li>Luciana Gutheim <a href="https://github.com/lucianagutheim-sudo"><img src="https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white"></a></li>
    </ul></div>

<h2>Proyecto e-commerce para la Mueblería Hermanos Jota.</h2>
<p align="center">
  <img src="client/public/assets/img/logo.svg" height="100">
</p>
<h3> Contexto de Negocio: El Desafío de "Mueblería Hermanos Jota"
     <h4>La Historia</h4>
<p align="center">
    <img src="client/public/assets/img/Escritorio Costa.png" height="100">
</p>    
<p>La Mueblería Hermanos Jota es un taller familiar con más de 30 años de tradición en el diseño y la
fabricación de muebles de madera de autor. Son conocidos en su ciudad por la alta calidad
de sus materiales y por un estilo que combina la robustez de lo artesanal con líneas de diseño
moderno. Hasta ahora, su negocio ha dependido exclusivamente de su tienda física yde las recomendaciones 
de sus clientes leales.<p>
    <h4>El Desafío: Conquistar el Mundo Digital</h4>
<p align="center">
    <img src="client/public/assets/img/Mesa Comedor Pampa.png" height="100">
</p>   
<p>Los dueños, la familia Jota, han notado un cambio en el mercado. Su clientela tradicional
se mantiene, pero les cuesta mucho atraer a un público más joven y expandir su alcance
más allá de su localidad. Su presencia online se limita a una página de Instagram que manejan
esporádicamente. Para sobrevivir y crecer, han decidido dar el salto digital y los han
contratado a ustedes para construir su primera plataforma de e-commerce.</p>

## Tecnologías
- HTML5 semántico
- CSS3 (Flexbox, Grid, responsive)
- JavaScript (ES6, manipulación del DOM, localStorage)
- React
- React Router DOM
- Manejo de CORS con Proxy
- ExpressJS
- NodeJS
- MongoDB
- Mongosee
- GitHub Pages para el deploy

## Descripcion
El backend se aloja en el puerto 4000, teniendo las rutas 
- GET <b>"/api/productos"</b> Devuelve todos los productos de la colección.
- GET <b>"/api/productos/:id"</b> Devuelve un único producto por su _id.
- POST <b>"/api/productos"</b> Recibe los datos de un nuevo producto en req.body, crea un nuevo documento en la base de datos y lo devuelve con un estado 201.
- PUT <b>"/api/productos/:id"</b> Recibe datos actualizados en req.body y modifica el producto correspondiente en la base de datos.
- DELETE <b>"/api/productos/:id"</b> Elimina un producto de la base de datos por su _id

Por el lado del frontend, este se aloja en el puerto 3000, teniendo las rutas
- Inicio <b>"/"</b>
- El catálogo <b>"/productos"<b>
- El detalle de producto <b>"/productos/:id"</b>
- El formulario de contacto <b>"/contacto"</b>
- Añadir productos <b>"/admin/crear-producto"</b>

Este apartado cuenta con secciones de Inicio, Productos,, Producto Individual, Creacion de Producto, Contacto y un Carrito, los cuales comparten espacio un unico archivo html utilizando React Router DOM para gestionar la navegación.

Cuenta con componentes de: 
- Navbar            Header, Barra de Navegacion con icono del Carrito Actualizable
- Footer            Footer con datos varios
- ProductCard       Tarjeta de producto reutilizable
- ProductList       Lista de productos, contiene multiples repeticiones 
                    de ProductCard
- ProductDetail     Body de la pagina para observar el producto 
                    seleccionado a detalle y añadirlo al carrito
- ProductBody       Body de la pagina donde se renderiza el ProductList
- BodyIndex         Body de inicio, tiene contenido de presentacion
- BodyCarrito       Body del carrito, renderiza los productos dentro de su 
                    array segun el id
- ContactForm       Body del apartado contactos, con opciones de enviar mensaje 
                    y visualizar datos de contacto
-CrearProducto      Formulario para crear un nuevo producto

## Cómo ejecutar
 Proyecto React + Express
    Requisitos
        - Node.js 22.19
        - npm
<ol>
<li> Clonar este repositorio.</li>
<li> Instalar 
    En la terminal:
        <ul>
        <li>Frontend:
            - cd client
            - npm install</li>
        <li>Backend:
            - cd backend
            - npm install</li></li>
        </ul>
<li> Ejecutar 
    En la terminal:
        <ul>
        <li>Frontend:
            - cd client
            - npm start</li>
        <li>Backend:
            - cd backend
            - npm start</li></li>
        </ul>
</ol>

## Link a Render y Vercel
- Backend: [https://hermanos-jota-sping-5-6.onrender.com](https://hermanos-jota-sping-7-8-grupo-14.onrender.com/)
- Vercel: 

## Capturas
<img width="1920" height="1080" alt="Captura de pantalla 2025-11-01 215833" src="https://github.com/user-attachments/assets/6790490b-6fca-424e-ad5b-37ecd474f008" />
<img width="1920" height="1080" alt="Captura de pantalla 2025-11-01 220640" src="https://github.com/user-attachments/assets/f78477ee-a0e8-42ca-b9b4-715a888a98c8" />
<img width="1920" height="1080" alt="Captura de pantalla 2025-11-01 220750" src="https://github.com/user-attachments/assets/b919e1c7-cec0-4476-8a17-9cf6aac24623" />
