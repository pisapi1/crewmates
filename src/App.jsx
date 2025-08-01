import { useState, useEffect } from 'react'
import { supabase } from './client'
import CrewmatesList from './components/CrewmatesList'
import CreateCrewmate from './components/CreateCrewmate'
import CrewmateDetail from './components/CrewmateDetail'
import EditCrewmate from './components/EditCrewmate'
import './App.css'

function App() {
  const [currentView, setCurrentView] = useState('list') // 'list', 'create', 'detail', 'edit'
  const [crewmates, setCrewmates] = useState([])
  const [selectedCrewmate, setSelectedCrewmate] = useState(null)
  const [loading, setLoading] = useState(true)

  // Fetch all crewmates
  const fetchCrewmates = async () => {
    setLoading(true)
    try {
      const { data, error } = await supabase
        .from('Crewmates')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) {
        console.error('Error fetching crewmates:', error)
      } else {
        setCrewmates(data || [])
      }
    } catch (err) {
      console.error('Unexpected error:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchCrewmates()
  }, [])

  // Navigation functions
  const goToList = () => {
    setCurrentView('list')
    setSelectedCrewmate(null)
    fetchCrewmates() // Refresh data
  }

  const goToCreate = () => {
    setCurrentView('create')
    setSelectedCrewmate(null)
  }

  const goToDetail = (crewmate) => {
    setSelectedCrewmate(crewmate)
    setCurrentView('detail')
  }

  const goToEdit = (crewmate) => {
    setSelectedCrewmate(crewmate)
    setCurrentView('edit')
  }

  // Handle successful operations
  const handleCrewmateCreated = () => {
    goToList()
  }

  const handleCrewmateUpdated = () => {
    goToList()
  }

  const handleCrewmateDeleted = () => {
    goToList()
  }

  return (
    <div className="app">
      {/* Navigation Header */}
      <header className="app-header">
        <div className="header-content">
          <h1 onClick={goToList} style={{cursor: 'pointer'}}>
            🚀 Crewmate Creator
          </h1>
          <nav className="nav-menu">
            <button 
              className={currentView === 'list' ? 'nav-btn active' : 'nav-btn'}
              onClick={goToList}
            >
              All Crewmates
            </button>
            <button 
              className={currentView === 'create' ? 'nav-btn active' : 'nav-btn'}
              onClick={goToCreate}
            >
              Create New Crewmate
            </button>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="main-content">
        {currentView === 'list' && (
          <CrewmatesList 
            crewmates={crewmates}
            loading={loading}
            onCrewmateClick={goToDetail}
            onEditClick={goToEdit}
          />
        )}

        {currentView === 'create' && (
          <CreateCrewmate 
            onCrewmateCreated={handleCrewmateCreated}
            onCancel={goToList}
          />
        )}

        {currentView === 'detail' && selectedCrewmate && (
          <CrewmateDetail 
            crewmate={selectedCrewmate}
            onEdit={() => goToEdit(selectedCrewmate)}
            onBack={goToList}
          />
        )}

        {currentView === 'edit' && selectedCrewmate && (
          <EditCrewmate 
            crewmate={selectedCrewmate}
            onCrewmateUpdated={handleCrewmateUpdated}
            onCrewmateDeleted={handleCrewmateDeleted}
            onCancel={goToList}
          />
        )}
      </main>
    </div>
  )
}

export default App
