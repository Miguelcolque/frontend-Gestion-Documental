import { useState, useEffect } from 'react';
import apiService from '../services/api';

const DocumentoSolicitadoList = () => {
  const [documentos, setDocumentos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDocumentos = async () => {
      try {
        const response = await apiService.getDocumentoSolicitados();
        console.log('Response in DocumentoSolicitadoList:', response);
        if (response && response.documentos) {
          setDocumentos(response.documentos);
        } else {
          console.log('No documents found or invalid response');
          setDocumentos([]);
        }
      } catch (error) {
        console.error('Error in DocumentoSolicitadoList:', error);
        setDocumentos([]);
      } finally {
        setLoading(false);
      }
    };

    fetchDocumentos();
  }, []);

  if (loading) {
    return <div className="section">Cargando documentos solicitados...</div>;
  }

  return (
    <div className="section">
      <h2>Documentos Solicitados</h2>
      {documentos.length === 0 ? (
        <p>No hay documentos solicitados</p>
      ) : (
        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Código</th>
                <th>Estado</th>
                <th>Fecha Emisión</th>
                <th>Archivo</th>
              </tr>
            </thead>
            <tbody>
              {documentos.map((doc) => (
                <tr key={doc.docSolicitadoId || Math.random()}>
                  <td>{doc.docSolicitadoId || 'N/A'}</td>
                  <td>{doc.codigoDocSolicitado || 'N/A'}</td>
                  <td>{doc.estado || 'N/A'}</td>
                  <td>{doc.fechaEmision ? new Date(doc.fechaEmision).toLocaleDateString() : 'N/A'}</td>
                  <td>{doc.nombreArchivo || 'N/A'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default DocumentoSolicitadoList;
