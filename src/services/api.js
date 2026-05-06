const API_BASE_URL = `${import.meta.env.VITE_API_URL}/api`;

const apiService = {
  async fetchData(endpoint) {
    try {
      console.log(`Fetching: ${API_BASE_URL}${endpoint}`);
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        mode: 'cors'
      });
      
      console.log(`Response status: ${response.status}`);
      console.log(`Response headers:`, response.headers);
      
      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status} - ${response.statusText}`);
      }
      
      const data = await response.json();
      console.log(`Data received from ${endpoint}:`, data);
      return data;
    } catch (error) {
      console.error(`Error fetching ${endpoint}:`, error);
      console.error('Error details:', error.message);
      return null;
    }
  },

  async getDocumentoSolicitados() {
    return await this.fetchData('/DocumentoSolicitadoes/ListarTodos');
  },

  async getEntregaDocumentos() {
    return await this.fetchData('/EntregaDocumentoes');
  },

  async getTipoDocumentos() {
    return await this.fetchData('/TipoDocumentoes');
  },

  async getSolicitudDocumentaciones() {
    return await this.fetchData('/SolicitudDocumentacions');
  },

  async getPacienteDocs() {
    return await this.fetchData('/PacienteDocs');
  }
};

export default apiService;
