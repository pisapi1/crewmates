import './CrewmateDetail.css'

const CrewmateDetail = ({ crewmate, onEdit, onBack }) => {
  const formatDate = (dateString) => {
    const options = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }
    return new Date(dateString).toLocaleDateString('en-US', options)
  }

  const getColorEmoji = (color) => {
    switch (color?.toLowerCase()) {
      case 'red': return '🔴'
      case 'blue': return '🔵'
      case 'green': return '🟢'
      case 'yellow': return '🟡'
      case 'orange': return '🟠'
      case 'purple': return '🟣'
      case 'pink': return '🩷'
      case 'black': return '⚫'
      case 'white': return '⚪'
      case 'brown': return '🟤'
      case 'cyan': return '🩵'
      case 'lime': return '🟢'
      default: return '⭕'
    }
  }

  return (
    <div className="crewmate-detail">
      {/* Navigation */}
      <div className="detail-nav">
        <button className="back-btn" onClick={onBack}>
          ← Back to All Crewmates
        </button>
        <div className="breadcrumb">
          <span onClick={onBack} style={{cursor: 'pointer'}}>All Crewmates</span>
          <span className="separator">/</span>
          <span>{crewmate.name}</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="detail-content">
        {/* Hero Section */}
        <div className="hero-section">
          <div className="crewmate-avatar-large">
            <span className="avatar-emoji-large">👨‍🚀</span>
            <div 
              className="color-indicator-large"
              style={{ backgroundColor: crewmate.color?.toLowerCase() }}
            ></div>
          </div>
          
          <div className="crewmate-main-info">
            <h1>{crewmate.name}</h1>
            <p className="crewmate-subtitle">Crewmate ID: #{crewmate.id}</p>
            
            <div className="quick-stats">
              <div className="stat">
                <span className="stat-icon">{getColorEmoji(crewmate.color)}</span>
                <span className="stat-label">Color</span>
                <span className="stat-value">{crewmate.color}</span>
              </div>
            </div>

            <button className="edit-btn-primary" onClick={onEdit}>
              ✏️ Edit This Crewmate
            </button>
          </div>
        </div>

        {/* Detailed Information */}
        <div className="info-cards">
          <div className="info-card">
            <h3>🎯 Attributes</h3>
            <div className="attribute-details">
              <div className="attribute-item">
                <strong>Suit Color:</strong>
                <span className="color-display">
                  <div 
                    className="color-swatch"
                    style={{ backgroundColor: crewmate.color?.toLowerCase() }}
                  ></div>
                  {crewmate.color}
                </span>
              </div>
            </div>
          </div>

          <div className="info-card">
            <h3>📋 Profile Information</h3>
            <div className="profile-details">
              <div className="detail-row">
                <strong>Full Name:</strong>
                <span>{crewmate.name}</span>
              </div>
              
              <div className="detail-row">
                <strong>Crewmate ID:</strong>
                <span>#{crewmate.id}</span>
              </div>
              
              <div className="detail-row">
                <strong>Recruited:</strong>
                <span>{formatDate(crewmate.created_at)}</span>
              </div>
              
              <div className="detail-row">
                <strong>Last Updated:</strong>
                <span>{formatDate(crewmate.updated_at || crewmate.created_at)}</span>
              </div>
            </div>
          </div>

          <div className="info-card">
            <h3>🚀 Mission Stats</h3>
            <div className="mission-stats">
              <div className="stat-item">
                <strong>Missions Completed:</strong>
                <span className="stat-number">
                  {Math.floor(Math.random() * 50) + 1}
                </span>
              </div>
              
              <div className="stat-item">
                <strong>Tasks Completed:</strong>
                <span className="stat-number">
                  {Math.floor(Math.random() * 200) + 50}
                </span>
              </div>
              
              <div className="stat-item">
                <strong>Emergency Meetings Called:</strong>
                <span className="stat-number">
                  {Math.floor(Math.random() * 10) + 1}
                </span>
              </div>
              
              <div className="stat-item">
                <strong>Reliability Score:</strong>
                <span className="reliability-score">
                  {(Math.random() * 2 + 8).toFixed(1)}/10 ⭐
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="detail-actions">
          <button className="action-btn secondary" onClick={onBack}>
            ← Back to List
          </button>
          <button className="action-btn primary" onClick={onEdit}>
            ✏️ Edit Crewmate
          </button>
        </div>
      </div>
    </div>
  )
}

export default CrewmateDetail
