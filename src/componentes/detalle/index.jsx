import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getCharacterById } from '../../api/disneyApi';
import './detalle.css';

function Detalle() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [personaje, setPersonaje] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function obtenerDetalle() {
      setLoading(true);
      const datosPersonaje = await getCharacterById(id);
      setPersonaje(datosPersonaje);
      setLoading(false);
    }

    obtenerDetalle();
  }, [id]);

  if (loading) {
    return <div className="detalle-loading">Consultando datos del Endpoint ({id})...</div>;
  }

  if (!personaje) {
    return (
      <div className="detalle-error">
        <h2>No se encontró información en el endpoint</h2>
        <button onClick={() => navigate(-1)} className="detalle-btn-volver">Volver</button>
      </div>
    );
  }

  return (
    <main className="detalle-container">
      <button onClick={() => navigate(-1)} className="detalle-btn-volver">
        ← Volver
      </button>

      <div className="detalle-card-content">
        <div className="detalle-header">
          <img
            src={personaje.imageUrl}
            alt={personaje.name}
            className="detalle-imagen"
          />
          <h1 className="detalle-nombre">{personaje.name}</h1>
          <p className="detalle-id-badge">ID Endpoint: #{personaje._id}</p>
        </div>

        <div className="detalle-seccion-info">
          <h3>Información Extraída del Endpoint</h3>

          <div className="detalle-info-grid">
            <div className="info-box">
              <strong>Películas:</strong>
              <p>{personaje.films?.length > 0 ? personaje.films.join(', ') : 'Ninguna'}</p>
            </div>

            <div className="info-box">
              <strong>Cortometrajes:</strong>
              <p>{personaje.shortFilms?.length > 0 ? personaje.shortFilms.join(', ') : 'Ninguno'}</p>
            </div>

            <div className="info-box">
              <strong>Series de TV:</strong>
              <p>{personaje.tvShows?.length > 0 ? personaje.tvShows.join(', ') : 'Ninguna'}</p>
            </div>

            <div className="info-box">
              <strong>Videojuegos:</strong>
              <p>{personaje.videoGames?.length > 0 ? personaje.videoGames.join(', ') : 'Ninguno'}</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Detalle;