import { useState, useEffect } from 'react';
import apiService from '../services/api';

const PacienteDocList = () => {
  const [pacientes, setPacientes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPacientes = async () => {
      try {
        const response = await apiService.getPacienteDocs();
        setPacientes(response.pacientes || []);
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPacientes();
  }, []);

  if (loading) {
    return <div className="section">Cargando documentos de pacientes...</div>;
  }

  return (
    <div className="section">
      <h2>Documentos de Pacientes</h2>
      {pacientes.length === 0 ? (
        <p>No hay documentos de pacientes registrados</p>
      ) : (
        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Código</th>
                <th>Nombre Paciente</th>
                <th>Estado</th>
                <th>Estado Atención</th>
                <th>Total Documentos</th>
              </tr>
            </thead>
            <tbody>
              {pacientes.map((paciente) => (
                <tr key={paciente.pacienteId || Math.random()}>
                  <td>{paciente.pacienteId || 'N/A'}</td>
                  <td>{paciente.codigoPaciente || 'N/A'}</td>
                  <td>{paciente.nombrePaciente || 'N/A'}</td>
                  <td>{paciente.estado || 'N/A'}</td>
                  <td>{paciente.estadoAtencion || 'N/A'}</td>
                  <td>{paciente.totalDocumentos || 'N/A'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default PacienteDocList;
