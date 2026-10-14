import { NavLink } from 'react-router-dom';
import './menu.css';

function Menu() {
  return (
    <header className="menu-header">
      <div className="menu-container">
        {/* Logo / Marca */}
        <NavLink to="/" className="menu-logo">
          <span className="logo-magia">✨</span> Disney App
        </NavLink>

        {/* Navegación por las 5 Pestañas */}
        <nav className="menu-nav">
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? 'menu-link activo' : 'menu-link')}
          >
            🏰 Inicio
          </NavLink>

          <NavLink
            to="/personajes"
            className={({ isActive }) => (isActive ? 'menu-link activo' : 'menu-link')}
          >
            🎭 Personajes
          </NavLink>

          <NavLink
            to="/buscador"
            className={({ isActive }) => (isActive ? 'menu-link activo' : 'menu-link')}
          >
            🔍 Buscador
          </NavLink>

          <NavLink
            to="/favoritos"
            className={({ isActive }) => (isActive ? 'menu-link activo' : 'menu-link')}
          >
            ⭐ Favoritos
          </NavLink>

          <NavLink
            to="/original"
            className={({ isActive }) => (isActive ? 'menu-link activo' : 'menu-link')}
          >
            🎁 Colección
          </NavLink>

          <NavLink
            to="/info"
            className={({ isActive }) => (isActive ? 'menu-link activo' : 'menu-link')}
          >
            ℹ️ Info
          </NavLink>
        </nav>
      </div>
    </header>
  );
}

export default Menu;