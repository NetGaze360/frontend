import { http } from './httpService';

export const historyService = {
  getRecentActions: async (limit = 20) => {
    try {
      const response = await http.get(`/history?limit=${limit}`);
      if (response.ok) {
        var res = await response.json();
        console.log('History:', res);
        return res;
      }
      throw new Error('Error al obtener el historial');
    } catch (error) {
      console.error('Error en historyService:', error);
      throw error;
    }
  }
};