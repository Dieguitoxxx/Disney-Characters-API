import { useEffect, useState } from 'react';
import Tarjeta from '../tarjeta';
import './personajes.css';

function Personajes() {
  const [personajes, setPersonajes] = useState([]);
  const [filtroCategoria, setFiltroCategoria] = useState('todos');
  const [favoritos, setFavoritos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://api.disneyapi.dev/character?pageSize=50')
      .then((res) => res.json())
      .then((data) => {
        setPersonajes(data.data || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error al cargar la lista de personajes:', err);
        setLoading(false);
      });

    try {
      const guardados = JSON.parse(localStorage.getItem('disneyFavoritos') || '[]');
      setFavoritos(guardados);
    } catch {
      setFavoritos([]);
    }
  }, []);

  const toggleFavorito = (personaje) => {
    const existe = favoritos.some((fav) => fav._id === personaje._id);
    let actualizados = [];

    if (existe) {
      actualizados = favoritos.filter((fav) => fav._id !== personaje._id);
    } else {
      actualizados = [...favoritos, personaje];
    }

    setFavoritos(actualizados);
    localStorage.setItem('disneyFavoritos', JSON.stringify(actualizados));
  };

  const personajesFiltrados = personajes.filter((personaje) => {
    if (filtroCategoria === 'todos') return true;
    if (filtroCategoria === 'films') return personaje.films?.length > 0;
    if (filtroCategoria === 'tvShows') return personaje.tvShows?.length > 0;
    if (filtroCategoria === 'shortFilms') return personaje.shortFilms?.length > 0;
    if (filtroCategoria === 'videoGames') return personaje.videoGames?.length > 0;
    return true;
  });

  if (loading) {
    return <div className="personajes-loading">Cargando el catálogo de personajes...</div>;
  }

  return (
    <main className="personajes-container">
      <h1 className="personajes-titulo">Catálogo de Personajes</h1>

      <div className="personajes-filtros">
        <label htmlFor="filtro-select">Filtrar por categoría:</label>
        <select
          id="filtro-select"
          value={filtroCategoria}
          onChange={(e) => setFiltroCategoria(e.target.value)}
          className="personajes-select"
        >
          <option value="todos">Todos los personajes</option>
          <option value="films">Tiene Películas</option>
          <option value="tvShows">Tiene Series de TV</option>
          <option value="shortFilms">Tiene Cortometrajes</option>
          <option value="videoGames">Tiene Videojuegos</option>
        </select>
      </div>

      <p className="personajes-conteo">
        Mostrando <span>{personajesFiltrados.length}</span> personajes
      </p>

      <section className="personajes-grid">
        {personajesFiltrados.map((personaje) => {
          const esFavorito = favoritos.some((fav) => fav._id === personaje._id);

          return (
            <Tarjeta
              key={personaje._id}
              personaje={personaje}
              esFavorito={esFavorito}
              onToggleFavorito={toggleFavorito}
            />
          );
        })}
      </section>
    </main>
  );
}

export default Personajes;