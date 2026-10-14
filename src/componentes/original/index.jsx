import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './original.css';

function Original() {
  const [personajesApi, setPersonajesApi] = useState([]);
  const [listaCapturados, setListaCapturados] = useState(() => {
    try {
      const guardados = JSON.parse(localStorage.getItem('disneyColeccion') || '[]');
      return Array.isArray(guardados) ? [...new Set(guardados)] : [];
    } catch {
      return [];
    }
  });
  const [nuevos, setNuevos] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const totalPersonajes = 50; // Cantidad base para el álbum de colección

  // Cargar personajes directamente de la API de Disney al iniciar
  useEffect(() => {
    fetch(`https://api.disneyapi.dev/character?pageSize=${totalPersonajes}`)
      .then((respuesta) => respuesta.json())
      .then((datos) => {
        setPersonajesApi(datos.data || []);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error al cargar la colección Disney:', error);
        setLoading(false);
      });
  }, []);

  // Lógica para desbloquear 4 personajes aleatorios
  const capturarAleatorios = () => {
    if (personajesApi.length === 0) return;

    const seleccionados = Array.from(
      { length: 4 },
      () => Math.floor(Math.random() * personajesApi.length)
    );

    const vistos = new Set(listaCapturados);
    const resultados = seleccionados.map((index) => {
      const personaje = personajesApi[index];
      const id = personaje._id;
      const repetido = vistos.has(id);
      vistos.add(id);
      return { id, personaje, repetido };
    });

    const actualizados = [...vistos];
    setListaCapturados(actualizados);
    setNuevos(resultados);
    localStorage.setItem('disneyColeccion', JSON.stringify(actualizados));
  };

  if (loading) {
    return <div className="original-loading">Cargando la magia del álbum Disney...</div>;
  }

  return (
    <main className="coleccion">
      <h1 className="coleccion-titulo">Álbum Mágico Disney</h1>
      <p className="coleccion-contador">
        {listaCapturados.length} <span>/ {personajesApi.length}</span>
      </p>

      <button
        className="coleccion-boton"
        onClick={capturarAleatorios}
        disabled={listaCapturados.length >= personajesApi.length}
      >
        ✨ Descubrir 4 Nuevos
      </button>

      {/* Sección de personajes recién obtenidos */}
      {nuevos.length > 0 && (
        <section className="coleccion-seccion-nuevos">
          <h2 className="coleccion-subtitulo">¡Tus nuevos personajes!</h2>
          <div className="coleccion-nuevos">
            {nuevos.map(({ id, personaje, repetido }, indice) => (
              <div
                key={`${id}-${indice}`}
                className={repetido ? 'coleccion-nuevo repetido' : 'coleccion-nuevo'}
                onClick={() => navigate(`/detalle/${id}`)}
              >
                {repetido && <span className="tag-repetido">Repetido</span>}
                <img
                  src={personaje?.imageUrl}
                  alt={personaje?.name || `Personaje ${id}`}
                  className="imagen-nuevo"
                />
                <p className="nombre-nuevo">{personaje?.name || ''}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Cuadrícula del Álbum General */}
      <h2 className="coleccion-subtitulo">Tu Álbum de Colección</h2>
      <section className="coleccion-album">
        {personajesApi.map((personaje, index) => {
          const id = personaje._id;
          const capturado = listaCapturados.includes(id);

          return (
            <div
              key={id}
              className={capturado ? 'coleccion-card capturado' : 'coleccion-card'}
              onClick={() => capturado && navigate(`/detalle/${id}`)}
            >
              {capturado ? (
                <>
                  <img
                    src={personaje.imageUrl}
                    alt={personaje.name}
                    className="imagen-album"
                    loading="lazy"
                  />
                  <p className="nombre-album">{personaje.name}</p>
                </>
              ) : (
                <div className="bloqueado">
                  <span className="numero-slot">#{index + 1}</span>
                  <span className="signo-incognito">?</span>
                </div>
              )}
            </div>
          );
        })}
      </section>
    </main>
  );
}

export default Original;