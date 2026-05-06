import { useState, useEffect } from 'react';
import apiService from '../services/api';

const SolicitudDocumentacionList = () => {
  const [solicitudes, setSolicitudes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSolicitudes = async () => {
      try {
        const data = await apiService.getSolicitudDocumentaciones();
        setSolicitudes(data);
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSolicitudes();
  }, []);

  if (loading) {
    return <div className="section">Cargando solicitudes de documentación...</div>;
  }

  return (
    <div className="section">
      <h2>Solicitudes de Documentación</h2>
      {solicitudes.length === 0 ? (
        <p>No hay solicitudes registradas</p>
      ) : (
        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Código</th>
                <th>Paciente</th>
                <th>Departamento</th>
                <th>Médico</th>
                <th>Estado</th>
                <th>Fecha</th>
              </tr>
            </thead>
            <tbody>
              {solicitudes.map((solicitud) => (
                <tr key={solicitud.solicitudId || Math.random()}>
                  <td>{solicitud.solicitudId || 'N/A'}</td>
                  <td>{solicitud.codigoSolicitud || 'N/A'}</td>
                  <td>{solicitud.codigoPaciente || 'N/A'}</td>
                  <td>{solicitud.departamentoSolicitante || 'N/A'}</td>
                  <td>{solicitud.codigoMedico || 'N/A'}</td>
                  <td>{solicitud.estado || 'N/A'}</td>
                  <td>{solicitud.fechaSolicitud ? new Date(solicitud.fechaSolicitud).toLocaleDateString() : 'N/A'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default SolicitudDocumentacionList;
