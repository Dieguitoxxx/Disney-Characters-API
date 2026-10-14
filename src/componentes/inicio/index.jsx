import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './inicio.css';

function Inicio() {
  const navigate = useNavigate();
  const [destacados, setDestacados] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://api.disneyapi.dev/character?pageSize=6')
      .then((res) => res.json())
      .then((data) => {
        setDestacados(data.data || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error al obtener destacados de Disney:', err);
        setLoading(false);
      });
  }, []);

  return (
    <main className="inicio-container">
      {/* Hero Banner */}
      <section className="inicio-hero">
        <div className="inicio-hero-overlay">
          <h1 className="inicio-titulo">Universo Mágico de Disney</h1>
          <p className="inicio-descripcion">
            Explora el catálogo completo de personajes, descubre películas, colecciona tus favoritos y pon a prueba tu suerte.
          </p>
          <div className="inicio-hero-botones">
            <button className="btn-primario" onClick={() => navigate('/personajes')}>
              Ver Personajes
            </button>
            <button className="btn-secundario" onClick={() => navigate('/buscador')}>
              Buscar Personaje
            </button>
          </div>
        </div>
      </section>

      {/* Sección de Accesos Rápidos */}
      <section className="inicio-seccion">
        <h2 className="seccion-titulo">Explora las Secciones</h2>
        <div className="inicio-tarjetas-grid">
          <div className="inicio-tarjeta" onClick={() => navigate('/personajes')}>
            <span className="tarjeta-icono">🎭</span>
            <h3>Personajes</h3>
            <p>Lista completa con filtros por películas y series.</p>
          </div>

          <div className="inicio-tarjeta" onClick={() => navigate('/favoritos')}>
            <span className="tarjeta-icono">⭐</span>
            <h3>Favoritos</h3>
            <p>Guarda y gestiona tus personajes preferidos.</p>
          </div>

          <div className="inicio-tarjeta" onClick={() => navigate('/original')}>
            <span className="tarjeta-icono">✨</span>
            <h3>Álbum Mágico</h3>
            <p>Colecciona y desbloquea personajes aleatorios.</p>
          </div>

          <div className="inicio-tarjeta" onClick={() => navigate('/info')}>
            <span className="tarjeta-icono">ℹ️</span>
            <h3>Información</h3>
            <p>Conoce los detalles del proyecto y la API utilizada.</p>
          </div>
        </div>
      </section>

      {/* Sección de Personajes Destacados */}
      <section className="inicio-seccion">
        <h2 className="seccion-titulo">Personajes Destacados</h2>
        {loading ? (
          <p className="inicio-cargando">Cargando personajes destacados...</p>
        ) : (
          <div className="inicio-destacados-grid">
            {destacados.map((personaje) => (
              <div
                key={personaje._id}
                className="destacado-card"
                onClick={() => navigate(`/detalle/${personaje._id}`)}
              >
                <img
                  src={personaje.imageUrl}
                  alt={personaje.name}
                  className="destacado-img"
                  loading="lazy"
                />
                <h4>{personaje.name}</h4>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}

export default Inicio;