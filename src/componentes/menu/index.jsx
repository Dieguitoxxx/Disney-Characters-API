import { NavLink } from 'react-router-dom';
import './menu.css';

function Menu({ usuarioActivo }) {
  return (
    <header className="menu-header">
      <div className="menu-container">
        {/* Logo / Marca */}
        <NavLink to="/" className="menu-logo">
          <span className="logo-magia">✨</span> Disney App
        </NavLink>

        {/* Navegación por las Pestañas + Ícono de Estado de Logueo */}
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

          {/* Ícono indicando estado de logueo en el menú (0.1) */}
          <NavLink
            to="/usuario"
            className={({ isActive }) =>
              `${isActive ? 'menu-link activo' : 'menu-link'} ${
                usuarioActivo ? 'estado-online' : 'estado-offline'
              }`
            }
            title={
              usuarioActivo
                ? `Conectado como: ${usuarioActivo.nombre}`
                : 'Sin sesión activa - Haz clic para iniciar sesión'
            }
          >
            <span className="icono-estado-login">
              {usuarioActivo ? '🟢 👤' : '🔴 🔒'}
            </span>
            <span>
              {usuarioActivo ? usuarioActivo.nombre.split(' ')[0] : 'Login'}
            </span>
          </NavLink>
        </nav>
      </div>
    </header>
  );
}

export default Menu;