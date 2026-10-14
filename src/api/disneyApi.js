const BASE_URL = 'https://api.disneyapi.dev/character';

// Obtener detalle de un personaje por ID
export const getCharacterById = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}/${id}`);
    if (!response.ok) throw new Error(`Error al consultar el personaje ${id}`);
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error(`Error al obtener detalle del endpoint (${id}):`, error);
    return null;
  }
};