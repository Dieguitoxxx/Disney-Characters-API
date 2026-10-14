import { useNavigate } from 'react-router-dom';
import './tarjeta.css';

function Tarjeta({ personaje, esFavorito, onToggleFavorito }) {
  const navigate = useNavigate();

  if (!personaje) return null;

  return (
    <div
      className="tarjeta-compartida"
      onClick={() => navigate(`/detalle/${personaje._id}`)}
    >
      {onToggleFavorito && (
        <button
          className={`tarjeta-btn-fav ${esFavorito ? 'activo' : ''}`}
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorito(personaje, e);
          }}
          title={esFavorito ? 'Quitar de favoritos' : 'Agregar a favoritos'}
        >
          ★
        </button>
      )}

      <img
        src={personaje.imageUrl}
        alt={personaje.name}
        className="tarjeta-imagen"
        loading="lazy"
      />

      <div className="tarjeta-cuerpo">
        <h3 className="tarjeta-nombre">{personaje.name}</h3>
        <p className="tarjeta-info">
          Películas: {personaje.films?.length || 0}
        </p>
      </div>
    </div>
  );
}

export default Tarjeta;