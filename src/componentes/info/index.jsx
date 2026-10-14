import { useNavigate } from 'react-router-dom';
import './info.css';

function Info() {
  const navigate = useNavigate();

  return (
    <main className="info-container">
      <h1 className="info-titulo">Página Informativa</h1>
      <p className="info-subtitulo">
        Proyecto Universidad - Disney Characters Application
      </p>

      <section className="info-card">
        <h2>Detalles del Proyecto</h2>
        <p>
          Esta aplicación interactiva consume la <strong>Disney Characters API</strong> para explorar, filtrar, buscar y coleccionar a tus personajes favoritos del universo Disney.
        </p>
      </section>

      <section className="info-grid">
        <div className="info-box-item">
          <h3>👤 Desarrollador</h3>
          <p>Juan Diego Triana Vargas</p>
        </div>

        <div className="info-box-item">
          <h3>🔗 Endpoint Utilizado</h3>
          <p className="info-endpoint">https://api.disneyapi.dev/character</p>
        </div>

        <div className="info-box-item">
          <h3>⚡ Tecnologías</h3>
          <p>React, React Router, Vite, CSS3, LocalStorage / AsyncStorage</p>
        </div>

        <div className="info-box-item">
          <h3>🎯 Funcionalidades</h3>
          <p>Lista de elementos, Buscador en tiempo real, Filtros, Detalle por ID, Álbum de Favoritos y Sección Original.</p>
        </div>
      </section>

      <section className="info-card info-creditos">
        <h2>Créditos y Reconocimientos</h2>
        <p>
          Toda la información e imágenes mostradas pertenecen a <strong>Disney Enterprises, Inc.</strong> Proporcionado mediante la API abierta desarrollada por DisneyAPI.dev.
        </p>
        <button className="info-btn-volver" onClick={() => navigate('/')}>
          Volver al Inicio
        </button>
      </section>
    </main>
  );
}

export default Info;