import { useState, useEffect } from 'react'
import './App.css'
import ModalForm from './components/ModalForm'
import NavBar from './components/NavBar'
import TableList from './components/TableList'
import axios from 'axios'

function App() {
  const [isOpen, setIsOpen] = useState(false)
  const [modalMode, setModalMode] = useState('add')
  const [searchTerm, setSearchTerm] = useState('')
  const [clientData, setClientData] = useState(null)
  const [tableData, setTableData] = useState([])
  const [error, setError] = useState(null)

  // ✅ URL da API vem do .env
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000'

  const fetchClients = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/clients`)
      setTableData(response.data)
    } catch (err) {
      setError(err.message)
    }
  }

  useEffect(() => {
    fetchClients()
  }, [])

  const handleOpen = (mode, client) => {
    setClientData(client)
    setModalMode(mode)
    setIsOpen(true)
  }

  const handleSubmit = async (newClientData) => {
    if (modalMode === 'add') {
      try {
        const response = await axios.post(`${API_URL}/api/clients`, newClientData)
        setTableData((prevData) => [...prevData, response.data])
      } catch (error) {
        console.error('Error adding client:', error)
      }
    } else {
      try {
        const response = await axios.put(`${API_URL}/api/clients/${clientData.id}`, newClientData)
        setTableData((prevData) =>
          prevData.map((client) => (client.id === clientData.id ? response.data : client))
        )
      } catch (error) {
        console.error('Error updating client:', error)
      }
    }
  }

  return (
    <>
      <NavBar onOpen={() => handleOpen('add')} onSearch={setSearchTerm} />
      <TableList
        setTableData={setTableData}
        tableData={tableData}
        handleOpen={handleOpen}
        searchTerm={searchTerm}
      />
      <ModalForm
        isOpen={isOpen}
        OnSubmit={handleSubmit}
        onClose={() => setIsOpen(false)}
        mode={modalMode}
        clientData={clientData}
      />
      {error && <p style={{ color: 'red' }}>Erro: {error}</p>}
    </>
  )
}

export default App
