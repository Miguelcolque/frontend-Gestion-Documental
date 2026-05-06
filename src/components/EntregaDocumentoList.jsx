import { useState, useEffect } from 'react';
import apiService from '../services/api';

const EntregaDocumentoList = () => {
  const [entregas, setEntregas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEntregas = async () => {
      try {
        const data = await apiService.getEntregaDocumentos();
        setEntregas(data);
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchEntregas();
  }, []);

  if (loading) {
    return <div className="section">Cargando entregas de documentos...</div>;
  }

  return (
    <div className="section">
      <h2>Entrega de Documentos</h2>
      {entregas.length === 0 ? (
        <p>No hay entregas registradas</p>
      ) : (
        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Documento</th>
                <th>Receptor</th>
                <th>Fecha Entrega</th>
              </tr>
            </thead>
            <tbody>
              {entregas.map((entrega) => (
                <tr key={entrega.id || Math.random()}>
                  <td>{entrega.id || 'N/A'}</td>
                  <td>{entrega.documento || entrega.nombreDocumento || 'N/A'}</td>
                  <td>{entrega.receptor || entrega.nombreReceptor || 'N/A'}</td>
                  <td>{entrega.fechaEntrega || entrega.fecha || 'N/A'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default EntregaDocumentoList;
