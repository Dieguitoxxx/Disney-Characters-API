import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Importación de todos los componentes
import Menu from './componentes/menu';
import Inicio from './componentes/inicio';
import Personajes from './componentes/personajes';
import Buscador from './componentes/buscador';
import Detalle from './componentes/detalle';
import Favoritos from './componentes/favoritos';
import Original from './componentes/original';
import Info from './componentes/info';
import ModuloUsuario from './componentes/usuario';

import './App.css';

function App() {
  // Estado global de sesión para el ícono del menú y el módulo de usuario
  const [usuarioActivo, setUsuarioActivo] = useState(() => {
    const guardado = localStorage.getItem('disney_usuario_activo');
    return guardado ? JSON.parse(guardado) : null;
  });

  return (
    <Router>
      <div className="app-main-layout">
        {/* Menú de navegación principal presente en todas las vistas */}
        <Menu usuarioActivo={usuarioActivo} />

        {/* Definición de Rutas */}
        <div className="app-content-area">
          <Routes>
            <Route path="/" element={<Inicio />} />
            <Route path="/personajes" element={<Personajes />} />
            <Route path="/buscador" element={<Buscador />} />
            <Route path="/detalle/:id" element={<Detalle />} />
            <Route path="/favoritos" element={<Favoritos />} />
            <Route path="/original" element={<Original />} />
            <Route path="/info" element={<Info />} />
            <Route
              path="/usuario"
              element={
                <ModuloUsuario
                  usuarioActivo={usuarioActivo}
                  setUsuarioActivo={setUsuarioActivo}
                />
              }
            />
            {/* Ruta por defecto por si escriben una URL no válida */}
            <Route path="*" element={<Inicio />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;