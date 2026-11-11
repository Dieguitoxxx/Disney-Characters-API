import { useState, useEffect } from "react";
import "./usuario.css";

const USUARIOS_INICIALES = [
  {
    id: 1,
    nombre: "Juan Diego Triana",
    correo: "admin@disney.com",
    password: "123",
    avatar: "🧙‍♂️ Mickey Aprendiz",
    rol: "Administrador",
  },
];

export default function ModuloUsuario({ usuarioActivo, setUsuarioActivo }) {
  const [usuarios, setUsuarios] = useState(() => {
    const guardados = localStorage.getItem("disney_usuarios_db");
    return guardados ? JSON.parse(guardados) : USUARIOS_INICIALES;
  });

  const [vista, setVista] = useState(usuarioActivo ? "crud" : "login");
  const [mensaje, setMensaje] = useState("");

  const [loginCorreo, setLoginCorreo] = useState("");
  const [loginPass, setLoginPass] = useState("");

  const [editandoId, setEditandoId] = useState(null);
  const [form, setForm] = useState({
    nombre: "",
    correo: "",
    password: "",
    avatar: "🧙‍♂️ Mickey Aprendiz",
    rol: "Explorador",
  });

  const [sedeMapa, setSedeMapa] = useState("huila");
  const [objetoReclamado, setObjetoReclamado] = useState(() => {
    return localStorage.getItem("objeto_san_agustin_reclamado") === "true";
  });

  useEffect(() => {
    localStorage.setItem("disney_usuarios_db", JSON.stringify(usuarios));
  }, [usuarios]);

  const mostrarAlerta = (texto) => {
    setMensaje(texto);
    setTimeout(() => setMensaje(""), 4000);
  };

  // 1. LOGIN (0.1)
  const manejarLogin = (e) => {
    e.preventDefault();
    const encontrado = usuarios.find(
      (u) =>
        u.correo.toLowerCase() === loginCorreo.toLowerCase().trim() &&
        u.password === loginPass
    );

    if (!encontrado) {
      mostrarAlerta("❌ Correo o contraseña incorrectos.");
      return;
    }

    setUsuarioActivo(encontrado);
    localStorage.setItem("disney_usuario_activo", JSON.stringify(encontrado));
    mostrarAlerta(`✅ ¡Bienvenido de nuevo, ${encontrado.nombre}!`);
    setLoginCorreo("");
    setLoginPass("");
    setVista("crud");
  };

  const cerrarSesion = () => {
    setUsuarioActivo(null);
    localStorage.removeItem("disney_usuario_activo");
    mostrarAlerta("🔒 Has cerrado sesión correctamente.");
    setVista("login");
  };

  // 2. REGISTRO (0.1) Y CRUD CREATE / UPDATE (0.1)
  const manejarGuardarUsuario = (e) => {
    e.preventDefault();
    if (!form.nombre.trim() || !form.correo.trim() || !form.password.trim()) {
      mostrarAlerta("⚠️ Todos los campos son obligatorios.");
      return;
    }

    if (editandoId) {
      const actualizados = usuarios.map((u) =>
        u.id === editandoId ? { ...form, id: editandoId } : u
      );
      setUsuarios(actualizados);

      if (usuarioActivo && usuarioActivo.id === editandoId) {
        const nuevoActivo = { ...form, id: editandoId };
        setUsuarioActivo(nuevoActivo);
        localStorage.setItem("disney_usuario_activo", JSON.stringify(nuevoActivo));
      }

      setEditandoId(null);
      mostrarAlerta("✅ Usuario actualizado correctamente en el CRUD.");
    } else {
      const existe = usuarios.some(
        (u) => u.correo.toLowerCase() === form.correo.toLowerCase().trim()
      );
      if (existe) {
        mostrarAlerta("⚠️ Ya existe un usuario registrado con ese correo.");
        return;
      }

      const nuevoUsuario = {
        ...form,
        id: Date.now(),
      };
      setUsuarios([...usuarios, nuevoUsuario]);

      if (!usuarioActivo) {
        setUsuarioActivo(nuevoUsuario);
        localStorage.setItem("disney_usuario_activo", JSON.stringify(nuevoUsuario));
      }
      mostrarAlerta("🎉 Usuario registrado con éxito.");
      setVista("crud");
    }

    setForm({
      nombre: "",
      correo: "",
      password: "",
      avatar: "🧙‍♂️ Mickey Aprendiz",
      rol: "Explorador",
    });
  };

  // 3. CRUD EDITAR Y ELIMINAR
  const iniciarEdicion = (usuario) => {
    setEditandoId(usuario.id);
    setForm({
      nombre: usuario.nombre,
      correo: usuario.correo,
      password: usuario.password,
      avatar: usuario.avatar,
      rol: usuario.rol,
    });
    setVista("crud");
  };

  const eliminarUsuario = (id) => {
    const filtrados = usuarios.filter((u) => u.id !== id);
    setUsuarios(filtrados);

    if (usuarioActivo && usuarioActivo.id === id) {
      cerrarSesion();
    } else {
      mostrarAlerta("🗑️ Usuario eliminado del sistema.");
    }
  };

  // 4. OBJETO ALOJADO EN SAN AGUSTÍN (0.1)
  const alternarReclamoObjeto = () => {
    const nuevoEstado = !objetoReclamado;
    setObjetoReclamado(nuevoEstado);
    localStorage.setItem("objeto_san_agustin_reclamado", String(nuevoEstado));
    mostrarAlerta(
      nuevoEstado
        ? "🗿 ¡Has vinculado el Objeto de San Agustín a tu inventario!"
        : "🗿 Objeto devuelto a su altar en San Agustín."
    );
  };

  return (
    <div className="usuario-container">
      <div className="usuario-header-banner">
        <h2>✨ Portal de Usuario & San Agustín</h2>
        <p>
          Gestión de cuenta, CRUD de usuarios y geolocalización del Objeto Mágico en San Agustín
        </p>
      </div>

      <div className="sub-tabs">
        {!usuarioActivo && (
          <>
            <button
              className={`sub-tab-btn ${vista === "login" ? "activo" : ""}`}
              onClick={() => setVista("login")}
            >
              🔑 Login
            </button>
            <button
              className={`sub-tab-btn ${vista === "registro" ? "activo" : ""}`}
              onClick={() => {
                setEditandoId(null);
                setVista("registro");
              }}
            >
              📝 Registro
            </button>
          </>
        )}
        <button
          className={`sub-tab-btn ${vista === "crud" ? "activo" : ""}`}
          onClick={() => setVista("crud")}
        >
          ⚙️ CRUD de Usuarios
        </button>
        <button
          className={`sub-tab-btn ${vista === "sanagustin" ? "activo" : ""}`}
          onClick={() => setVista("sanagustin")}
        >
          🗿 Objeto en San Agustín
        </button>
        {usuarioActivo && (
          <button className="btn-peligro" onClick={cerrarSesion}>
            🚪 Cerrar Sesión ({usuarioActivo.nombre})
          </button>
        )}
      </div>

      {mensaje && <div className="alerta-msg">{mensaje}</div>}

      {/* LOGIN (0.1) */}
      {vista === "login" && (
        <div className="card-panel">
          <h3>🔑 Iniciar Sesión (Login)</h3>
          <form onSubmit={manejarLogin}>
            <div className="form-grid">
              <div className="input-group">
                <label>Correo Electrónico</label>
                <input
                  type="email"
                  placeholder="admin@disney.com"
                  value={loginCorreo}
                  onChange={(e) => setLoginCorreo(e.target.value)}
                  required
                />
              </div>
              <div className="input-group">
                <label>Contraseña</label>
                <input
                  type="password"
                  placeholder="••••••"
                  value={loginPass}
                  onChange={(e) => setLoginPass(e.target.value)}
                  required
                />
              </div>
            </div>
            <button type="submit" className="btn-primario">
              Entrar a Disney App
            </button>
            <p style={{ marginTop: "1rem", fontSize: "0.85rem", color: "#475569" }}>
              💡 Usuario demo precargado: <b>admin@disney.com</b> | Contraseña: <b>123</b>
            </p>
          </form>
        </div>
      )}

      {/* REGISTRO (0.1) */}
      {vista === "registro" && (
        <div className="card-panel">
          <h3>📝 Registro de Nuevo Usuario</h3>
          <form onSubmit={manejarGuardarUsuario}>
            <div className="form-grid">
              <div className="input-group">
                <label>Nombre Completo</label>
                <input
                  type="text"
                  placeholder="Ej. Ana María"
                  value={form.nombre}
                  onChange={(e) => setForm({ ...form, nombre: e.target.value })}
                  required
                />
              </div>
              <div className="input-group">
                <label>Correo Electrónico</label>
                <input
                  type="email"
                  placeholder="usuario@uniagustiniana.edu.co"
                  value={form.correo}
                  onChange={(e) => setForm({ ...form, correo: e.target.value })}
                  required
                />
              </div>
              <div className="input-group">
                <label>Contraseña</label>
                <input
                  type="password"
                  placeholder="Crea una contraseña"
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  required
                />
              </div>
              <div className="input-group">
                <label>Avatar Disney</label>
                <select
                  value={form.avatar}
                  onChange={(e) => setForm({ ...form, avatar: e.target.value })}
                >
                  <option value="🧙‍♂️ Mickey Aprendiz">🧙‍♂️ Mickey Aprendiz</option>
                  <option value="👑 Elsa de Arendelle">👑 Elsa de Arendelle</option>
                  <option value="🦁 Simba Rey">🦁 Simba Rey</option>
                  <option value="🚀 Buzz Lightyear">🚀 Buzz Lightyear</option>
                  <option value="🧞‍♂️ Genio de la Lámpara">🧞‍♂️ Genio de la Lámpara</option>
                </select>
              </div>
            </div>
            <button type="submit" className="btn-primario">
              Crear Cuenta Ahora
            </button>
          </form>
        </div>
      )}

      {/* CRUD DE USUARIO (0.1) */}
      {vista === "crud" && (
        <div className="card-panel">
          <h3>
            ⚙️ {editandoId ? "Editar Usuario Existente (Update)" : "Gestión CRUD de Usuarios"}
          </h3>

          <form onSubmit={manejarGuardarUsuario} style={{ marginBottom: "2rem" }}>
            <div className="form-grid">
              <div className="input-group">
                <label>Nombre</label>
                <input
                  type="text"
                  placeholder="Nombre completo"
                  value={form.nombre}
                  onChange={(e) => setForm({ ...form, nombre: e.target.value })}
                  required
                />
              </div>
              <div className="input-group">
                <label>Correo</label>
                <input
                  type="email"
                  placeholder="correo@ejemplo.com"
                  value={form.correo}
                  onChange={(e) => setForm({ ...form, correo: e.target.value })}
                  required
                />
              </div>
              <div className="input-group">
                <label>Contraseña</label>
                <input
                  type="text"
                  placeholder="Contraseña"
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  required
                />
              </div>
              <div className="input-group">
                <label>Avatar</label>
                <select
                  value={form.avatar}
                  onChange={(e) => setForm({ ...form, avatar: e.target.value })}
                >
                  <option value="🧙‍♂️ Mickey Aprendiz">🧙‍♂️ Mickey Aprendiz</option>
                  <option value="👑 Elsa de Arendelle">👑 Elsa de Arendelle</option>
                  <option value="🦁 Simba Rey">🦁 Simba Rey</option>
                  <option value="🚀 Buzz Lightyear">🚀 Buzz Lightyear</option>
                  <option value="🧞‍♂️ Genio de la Lámpara">🧞‍♂️ Genio de la Lámpara</option>
                </select>
              </div>
              <div className="input-group">
                <label>Rol</label>
                <select
                  value={form.rol}
                  onChange={(e) => setForm({ ...form, rol: e.target.value })}
                >
                  <option value="Explorador">Explorador</option>
                  <option value="Coleccionista">Coleccionista</option>
                  <option value="Administrador">Administrador</option>
                </select>
              </div>
            </div>

            <div style={{ display: "flex", gap: "0.8rem" }}>
              <button type="submit" className="btn-primario">
                {editandoId ? "💾 Guardar Cambios (Update)" : "➕ Agregar Usuario (Create)"}
              </button>
              {editandoId && (
                <button
                  type="button"
                  className="btn-secundario"
                  onClick={() => {
                    setEditandoId(null);
                    setForm({
                      nombre: "",
                      correo: "",
                      password: "",
                      avatar: "🧙‍♂️ Mickey Aprendiz",
                      rol: "Explorador",
                    });
                  }}
                >
                  Cancelar Edición
                </button>
              )}
            </div>
          </form>

          <div className="tabla-responsive">
            <table className="tabla-crud">
              <thead>
                <tr>
                  <th>Avatar</th>
                  <th>Nombre</th>
                  <th>Correo</th>
                  <th>Rol</th>
                  <th>Estado</th>
                  <th>Acciones (U / D)</th>
                </tr>
              </thead>
              <tbody>
                {usuarios.map((u) => {
                  const esActivo = usuarioActivo && usuarioActivo.id === u.id;
                  return (
                    <tr key={u.id}>
                      <td>{u.avatar}</td>
                      <td>
                        <strong>{u.nombre}</strong>
                      </td>
                      <td>{u.correo}</td>
                      <td>{u.rol}</td>
                      <td>
                        {esActivo ? (
                          <span style={{ color: "#16a34a", fontWeight: "700" }}>
                            🟢 En sesión
                          </span>
                        ) : (
                          <span style={{ color: "#64748b" }}>⚪ Registrado</span>
                        )}
                      </td>
                      <td>
                        <button
                          className="btn-editar"
                          onClick={() => iniciarEdicion(u)}
                        >
                          ✏️ Editar
                        </button>
                        <button
                          className="btn-peligro"
                          onClick={() => eliminarUsuario(u.id)}
                        >
                          🗑️ Eliminar
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* OBJETO ALOJADO EN SAN AGUSTÍN (0.1) */}
      {vista === "sanagustin" && (
        <div className="card-panel">
          <h3>🗿 Objeto Especial Alojado en San Agustín</h3>
          <div className="san-agustin-grid">
            <div className="reliquia-box">
              <div className="reliquia-icono">🗿✨</div>
              <h4 style={{ color: "#ffd700", fontSize: "1.4rem", margin: "0.5rem 0" }}>
                Tótem Mágico de San Agustín (Edición Disney)
              </h4>
              <span className="coordenadas-badge">
                {sedeMapa === "huila"
                  ? "📍 Coordenadas: 1.8879° N, 76.2952° W (San Agustín, Huila)"
                  : "📍 Coordenadas: 4.6534° N, 74.1456° W (Sede San Agustín / Tagaste)"}
              </span>
              <p style={{ fontSize: "0.95rem", lineHeight: "1.5", margin: "1rem 0" }}>
                Objeto arqueológico-digital alojado de forma permanente en San Agustín.
                Otorga acceso de nivel Guardián dentro del Universo Mágico de Disney.
              </p>
              <div style={{ marginBottom: "1rem", fontSize: "0.9rem" }}>
                <strong>Estado del Objeto: </strong>
                {objetoReclamado ? (
                  <span style={{ color: "#4ade80" }}>
                    ✅ Vinculado a {usuarioActivo ? usuarioActivo.nombre : "tu cuenta local"}
                  </span>
                ) : (
                  <span style={{ color: "#ffd700" }}>🏛️ Alojado en el Altar de San Agustín</span>
                )}
              </div>
              <button className="btn-primario" onClick={alternarReclamoObjeto}>
                {objetoReclamado ? "🔄 Devolver al Altar" : "✨ Reclamar / Sincronizar Objeto"}
              </button>
            </div>

            <div>
              <div style={{ display: "flex", gap: "0.5rem", marginBottom: "0.8rem" }}>
                <button
                  className={`sub-tab-btn ${sedeMapa === "huila" ? "activo" : ""}`}
                  onClick={() => setSedeMapa("huila")}
                >
                  🗺️ Parque San Agustín (Huila)
                </button>
                <button
                  className={`sub-tab-btn ${sedeMapa === "bogota" ? "activo" : ""}`}
                  onClick={() => setSedeMapa("bogota")}
                >
                  🏛️ Campus San Agustín / Uniagustiniana
                </button>
              </div>

              <iframe
                title="Mapa Objeto San Agustín"
                width="100%"
                height="300"
                style={{ border: "2px solid #001f3f", borderRadius: "12px" }}
                loading="lazy"
                src={
                  sedeMapa === "huila"
                    ? "https://www.openstreetmap.org/export/embed.html?bbox=-76.305%2C1.878%2C-76.285%2C1.898&layer=mapnik&marker=1.8879%2C-76.2952"
                    : "https://www.openstreetmap.org/export/embed.html?bbox=-74.155%2C4.643%2C-74.135%2C4.663&layer=mapnik&marker=4.6534%2C-74.1456"
                }
              ></iframe>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}