/**
 * Servicio HTTP para realizar peticiones a la API
 * Incluye manejo de tokens de autenticación
 */

// URL base de la API
const API_BASE_URL = import.meta.env.VITE_API_URI;

/**
 * Realiza una petición a la API
 * @param {string} url - URL del endpoint (sin incluir la base)
 * @param {Object} options - Opciones de fetch
 * @returns {Promise} - Promesa con la respuesta
 */
async function fetchWithAuth(url, options = {}) {
  console.log('Haciendo petición a:', `${API_BASE_URL}${url}`);
  // Configuración por defecto
  const defaultOptions = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  // Combinar opciones
  const fetchOptions = {
    ...defaultOptions,
    ...options,
    headers: {
      ...defaultOptions.headers,
      ...options.headers,
    },
  };

  // Agregar token de autenticación si existe
  const token = localStorage.getItem('accessToken');
  if (token) {
    fetchOptions.headers.Authorization = `Bearer ${token}`;
    console.log('Token agregado a la petición:', token);
  }
  else
  {
    console.log('No hay token');
  }

  try {
    // Realizar la petición
    const response = await fetch(`${API_BASE_URL}${url}`, fetchOptions);

    // Si la respuesta es 401 (Unauthorized) o 403 (Forbidden), intentar renovar el token
    if (response.status === 401 || response.status === 403) {
      console.log(`Recibido error ${response.status}, intentando renovar token...`);
      const refreshed = await refreshToken();
      
      // Si se pudo renovar el token, reintentar la petición
      if (refreshed) {
        console.log("Token renovado exitosamente, reintentando petición...");
        const newToken = localStorage.getItem('accessToken');
        fetchOptions.headers.Authorization = `Bearer ${newToken}`;
        return fetch(`${API_BASE_URL}${url}`, fetchOptions);
      } else {
        // Si no se pudo renovar, forzar cierre de sesión
        console.log("No se pudo renovar el token, redirigiendo a login...");
        logout();
        throw new Error('Sesión expirada. Por favor, inicie sesión nuevamente.');
      }
    }

    // Devolver la respuesta
    return response;
  } catch (error) {
    console.error('Error en la petición:', error);
    throw error;
  }
}

/**
 * Intenta renovar el token de acceso
 * @returns {Promise<boolean>} - true si se renovó correctamente, false en caso contrario
 */
async function refreshToken() {
  try {
    console.log("Intentando renovar token...");
    const response = await fetch(`${API_BASE_URL}/auth/refresh-token`, {
      method: 'POST',
      credentials: 'include', // Incluir cookies
    });

    console.log("Respuesta del servidor:", response.status);
    
    if (!response.ok) {
      console.error("Error en la renovación:", await response.text());
      return false;
    }

    const data = await response.json();
    console.log("Nuevo token recibido:", data.accessToken ? "Sí" : "No");
    
    if (data.accessToken) {
      localStorage.setItem('accessToken', data.accessToken);
      return true;
    } else {
      console.error("No se recibió un nuevo access token");
      return false;
    }
  } catch (error) {
    console.error('Error al renovar el token:', error);
    return false;
  }
}

/**
 * Cierra la sesión del usuario
 */
function logout() {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('user');
  window.location.href = '/login';
}

/**
 * Métodos HTTP
 */
export const http = {
  /**
   * Petición GET
   * @param {string} url - URL del endpoint
   * @param {Object} options - Opciones adicionales
   * @returns {Promise} - Promesa con la respuesta
   */
  get: (url, options = {}) => {
    return fetchWithAuth(url, {
      method: 'GET',
      ...options,
    });
  },

  /**
   * Petición POST
   * @param {string} url - URL del endpoint
   * @param {Object} body - Cuerpo de la petición
   * @param {Object} options - Opciones adicionales
   * @returns {Promise} - Promesa con la respuesta
   */
  post: (url, body, options = {}) => {
    return fetchWithAuth(url, {
      method: 'POST',
      body: JSON.stringify(body),
      ...options,
    });
  },

  /**
   * Petición PUT
   * @param {string} url - URL del endpoint
   * @param {Object} body - Cuerpo de la petición
   * @param {Object} options - Opciones adicionales
   * @returns {Promise} - Promesa con la respuesta
   */
  put: (url, body, options = {}) => {
    return fetchWithAuth(url, {
      method: 'PUT',
      body: JSON.stringify(body),
      ...options,
    });
  },

  /**
   * Petición DELETE
   * @param {string} url - URL del endpoint
   * @param {Object} options - Opciones adicionales
   * @returns {Promise} - Promesa con la respuesta
   */
  delete: (url, options = {}) => {
    return fetchWithAuth(url, {
      method: 'DELETE',
      ...options,
    });
  },
};

export default http;
