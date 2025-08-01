import './CrewmatesList.css'

const CrewmatesList = ({ crewmates, loading, onCrewmateClick, onEditClick }) => {
  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading crewmates...</p>
      </div>
    )
  }

  if (crewmates.length === 0) {
    return (
      <div className="empty-state">
        <h2>No Crewmates Yet! 🚀</h2>
        <p>Create your first crewmate to start building your team!</p>
      </div>
    )
  }

  return (
    <div className="crewmates-list">
      <div className="list-header">
        <h2>Your Crewmates ({crewmates.length})</h2>
        <p>Click on any crewmate to view details</p>
      </div>

      <div className="crewmates-grid">
        {crewmates.map((crewmate) => (
          <div key={crewmate.id} className="crewmate-card">
            <div 
              className="crewmate-info"
              onClick={() => onCrewmateClick(crewmate)}
            >
              <div className="crewmate-avatar">
                <span className="avatar-emoji">👨‍🚀</span>
                <div 
                  className="color-indicator" 
                  style={{ backgroundColor: crewmate.color?.toLowerCase() }}
                ></div>
              </div>
              
              <div className="crewmate-details">
                <h3 className="crewmate-name">{crewmate.name}</h3>
                <div className="crewmate-attributes">
                  <span className="attribute">
                    <strong>Color:</strong> {crewmate.color}
                  </span>
                </div>
                <div className="created-date">
                  Created: {new Date(crewmate.created_at).toLocaleDateString()}
                </div>
              </div>
            </div>

            <div className="card-actions">
              <button 
                className="edit-btn"
                onClick={(e) => {
                  e.stopPropagation()
                  onEditClick(crewmate)
                }}
              >
                ✏️ Edit
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default CrewmatesList
