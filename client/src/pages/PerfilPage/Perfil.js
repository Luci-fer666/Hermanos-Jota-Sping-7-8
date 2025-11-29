import { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { AuthContext } from '../../auth/AuthContext.js';
import { useNavigate } from 'react-router-dom';
import './Perfil.css';

function Perfil() {
  const { currentUser, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const { id } = useParams();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsuario = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/users/${id}`);

        if (response.status === 404) {
        setUser(null);
        setLoading(false);
        return;
      }
        if (!response.ok) {
          throw new Error('No se pudo obtener el usuario');
        }

        const data = await response.json();
        console.log("Usuario recibido:", data);

        setUser(data);

      } catch (err) {
        console.error("Error al obtener usuario:", err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchUsuario();
    }
  }, [id]);

  if (loading) return <p>Cargando perfil...</p>;
  if (!currentUser){
    navigate("/login");
    return <p>Debes iniciar sesión para visualizar esta página</p>;}
  if (error) return <p>Error: {error.message}</p>;
  if (!user) return <p>No se encontró el usuario</p>;

  return (
    <main id="perfil-container">
        <div id="perfil-info">
          <h2>{user.username}</h2>

          <img
            id="imagen"
            src="https://www.svgrepo.com/show/384670/account-avatar-profile-user.svg"
            alt={user.username}
          />

          <ul>
            <li><strong>Usuario:</strong> {user.username}</li>
            <li><strong>Email:</strong> {user.email}</li>
            <button onClick={logout}>Logout</button>
          </ul>
        </div>
    </main>
  );
}

export default Perfil;