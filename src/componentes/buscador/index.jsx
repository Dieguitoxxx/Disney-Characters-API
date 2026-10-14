import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './buscador.css';

function Buscador() {
  const [personajes, setPersonajes] = useState([]);
  const [busqueda, setBusqueda] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Cargar personajes de la API de Disney al montar el componente
  useEffect(() => {
    fetch('https://api.disneyapi.dev/character?pageSize=50')
      .then((respuesta) => respuesta.json())
      .then((datos) => {
        setPersonajes(datos.data || []);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error al cargar personajes de Disney:', error);
        setLoading(false);
      });
  }, []);

  // Filtrar personajes en tiempo real según el texto escrito
  const personajesFiltrados = personajes.filter((personaje) =>
    personaje.name.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <main className="buscador-container">
      <h1 className="buscador-titulo">Buscador de Disney</h1>
      
      <div className="buscador-input-wrapper">
        <input
          type="text"
          className="buscador-input"
          placeholder="Busca tu personaje favorito (Ej. Aladdin, Mulan...)"
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
        />
      </div>

      {loading ? (
        <p className="buscador-loading">Cargando magia de Disney...</p>
      ) : (
        <section className="buscador-grid">
          {personajesFiltrados.length > 0 ? (
            personajesFiltrados.map((personaje) => (
              <div
                key={personaje._id}
                className="buscador-card"
                onClick={() => navigate(`/detalle/${personaje._id}`)}
              >
                <img
                  src={personaje.imageUrl}
                  alt={personaje.name}
                  className="buscador-imagen"
                  loading="lazy"
                />
                <div className="buscador-info">
                  <h3>{personaje.name}</h3>
                  <p>Películas: {personaje.films?.length || 0}</p>
                </div>
              </div>
            ))
          ) : (
            <p className="buscador-no-encontrado">No se encontraron personajes con ese nombre.</p>
          )}
        </section>
      )}
    </main>
  );
}

export default Buscador;