import { useState, useEffect } from 'react';
import apiService from '../services/api';

const TipoDocumentoList = () => {
  const [tipos, setTipos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTipos = async () => {
      try {
        const data = await apiService.getTipoDocumentos();
        setTipos(data);
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTipos();
  }, []);

  if (loading) {
    return <div className="section">Cargando tipos de documentos...</div>;
  }

  return (
    <div className="section">
      <h2>Tipos de Documentos</h2>
      {tipos.length === 0 ? (
        <p>No hay tipos de documentos registrados</p>
      ) : (
        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Código</th>
                <th>Nombre Documento</th>
                <th>Departamento</th>
                <th>Estado</th>
              </tr>
            </thead>
            <tbody>
              {tipos.map((tipo) => (
                <tr key={tipo.tipoDocId || Math.random()}>
                  <td>{tipo.tipoDocId || 'N/A'}</td>
                  <td>{tipo.codigoTipoDoc || 'N/A'}</td>
                  <td>{tipo.nombreDocumento || 'N/A'}</td>
                  <td>{tipo.departamentoOrigen || 'N/A'}</td>
                  <td>{tipo.estado || 'N/A'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default TipoDocumentoList;
