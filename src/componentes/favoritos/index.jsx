import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './favoritos.css';

function Favoritos() {
  const [favoritos, setFavoritos] = useState([]);
  const navigate = useNavigate();

  // Cargar lista de favoritos guardados en localStorage
  useEffect(() => {
    cargarFavoritos();
  }, []);

  const cargarFavoritos = () => {
    try {
      const guardados = JSON.parse(localStorage.getItem('disneyFavoritos') || '[]');
      setFavoritos(guardados);
    } catch (error) {
      console.error('Error al leer favoritos de localStorage:', error);
      setFavoritos([]);
    }
  };

  // Eliminar un personaje de la lista de favoritos
  const eliminarFavorito = (id, event) => {
    event.stopPropagation(); // Evitar que navegue al detalle al hacer clic en eliminar
    const actualizados = favoritos.filter((personaje) => personaje._id !== id);
    setFavoritos(actualizados);
    localStorage.setItem('disneyFavoritos', JSON.stringify(actualizados));
  };

  return (
    <main className="favoritos-container">
      <h1 className="favoritos-titulo">Tus Personajes Favoritos</h1>
      <p className="favoritos-contador">
        Total guardados: <span>{favoritos.length}</span>
      </p>

      {favoritos.length === 0 ? (
        <div className="favoritos-vacio">
          <p>Aún no has agregado personajes a tus favoritos.</p>
          <button className="favoritos-btn-explorar" onClick={() => navigate('/')}>
            Explorar Personajes
          </button>
        </div>
      ) : (
        <section className="favoritos-grid">
          {favoritos.map((personaje) => (
            <div
              key={personaje._id}
              className="favoritos-card"
              onClick={() => navigate(`/detalle/${personaje._id}`)}
            >
              <button
                className="favoritos-btn-eliminar"
                onClick={(e) => eliminarFavorito(personaje._id, e)}
                title="Eliminar de favoritos"
              >
                ✕
              </button>
              <img
                src={personaje.imageUrl}
                alt={personaje.name}
                className="favoritos-imagen"
              />
              <div className="favoritos-info">
                <h3>{personaje.name}</h3>
                <p>{personaje.films?.length || 0} Películas</p>
              </div>
            </div>
          ))}
        </section>
      )}
    </main>
  );
}

export default Favoritos;