import { useState, useEffect } from 'react'
import './App.css'
import DocumentoSolicitadoList from './components/DocumentoSolicitadoList'
import EntregaDocumentoList from './components/EntregaDocumentoList'
import TipoDocumentoList from './components/TipoDocumentoList'
import SolicitudDocumentacionList from './components/SolicitudDocumentacionList'
import PacienteDocList from './components/PacienteDocList'

function App() {
  const [activeSection, setActiveSection] = useState('documentos')

  const menuItems = [
    { id: 'documentos', label: 'Documentos Solicitados', component: DocumentoSolicitadoList },
    { id: 'entregas', label: 'Entrega de Documentos', component: EntregaDocumentoList },
    { id: 'tipos', label: 'Tipos de Documentos', component: TipoDocumentoList },
    { id: 'solicitudes', label: 'Solicitudes de Documentación', component: SolicitudDocumentacionList },
    { id: 'pacientes', label: 'Documentos de Pacientes', component: PacienteDocList }
  ]

  const ActiveComponent = menuItems.find(item => item.id === activeSection)?.component

  return (
    <div className="container">
      <header className="header">
        <h1>Gestión Documental Hospital</h1>
        <p>Departamento de Gestión Documental</p>
      </header>

      <nav className="menu">
        {menuItems.map(item => (
          <button
            key={item.id}
            className={`menu-item ${activeSection === item.id ? 'active' : ''}`}
            onClick={() => setActiveSection(item.id)}
          >
            {item.label}
          </button>
        ))}
      </nav>

      <main>
        <ActiveComponent />
      </main>
    </div>
  )
}

export default App
