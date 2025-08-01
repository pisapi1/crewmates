import { useState } from 'react'
import { supabase } from '../client'
import './CreateCrewmate.css'

const CreateCrewmate = ({ onCrewmateCreated, onCancel }) => {
  const [formData, setFormData] = useState({
    name: '',
    color: ''
  })
  const [loading, setLoading] = useState(false)

  const colorOptions = ['Red', 'Blue', 'Green', 'Pink', 'Orange', 'Yellow', 'Black', 'White', 'Purple', 'Brown', 'Cyan', 'Lime']

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleAttributeSelect = (attribute, value) => {
    setFormData(prev => ({
      ...prev,
      [attribute]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    // Validation
    if (!formData.name.trim()) {
      alert('Please enter a name for your crewmate')
      return
    }
    if (!formData.color) {
      alert('Please select a color for your crewmate')
      return
    }

    setLoading(true)

    try {
      const { data, error } = await supabase
        .from('Crewmates')
        .insert([
          {
            name: formData.name.trim(),
            color: formData.color
          }
        ])
        .select()

      if (error) {
        console.error('Error creating crewmate:', error)
        alert('Error creating crewmate: ' + error.message)
      } else {
        console.log('Crewmate created successfully:', data)
        onCrewmateCreated()
      }
    } catch (err) {
      console.error('Unexpected error:', err)
      alert('An unexpected error occurred')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="create-crewmate">
      <div className="form-header">
        <h2>Create a New Crewmate</h2>
        <p>Build your perfect team member!</p>
      </div>

      <form onSubmit={handleSubmit} className="crewmate-form">
        {/* Name Input */}
        <div className="form-group">
          <label htmlFor="name">Crewmate Name *</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Enter crewmate name..."
            maxLength={50}
            required
          />
        </div>

        {/* Color Selection */}
        <div className="form-group">
          <label>Color *</label>
          <div className="color-options">
            {colorOptions.map((color) => (
              <button
                key={color}
                type="button"
                className={`color-btn ${formData.color === color ? 'selected' : ''}`}
                style={{ backgroundColor: color.toLowerCase() }}
                onClick={() => handleAttributeSelect('color', color)}
                title={color}
              >
                {formData.color === color && '✓'}
              </button>
            ))}
          </div>
        </div>

        {/* Preview */}
        {formData.name && (
          <div className="crewmate-preview">
            <h3>Preview</h3>
            <div className="preview-card">
              <div className="preview-avatar">
                <span>👨‍🚀</span>
                <div 
                  className="preview-color-indicator" 
                  style={{ backgroundColor: formData.color?.toLowerCase() }}
                ></div>
              </div>
              <div className="preview-info">
                <h4>{formData.name}</h4>
                <p>Color: {formData.color || 'Not selected'}</p>
              </div>
            </div>
          </div>
        )}

        {/* Form Actions */}
        <div className="form-actions">
          <button 
            type="button" 
            className="cancel-btn"
            onClick={onCancel}
            disabled={loading}
          >
            Cancel
          </button>
          <button 
            type="submit" 
            className="submit-btn"
            disabled={loading}
          >
            {loading ? 'Creating...' : 'Create Crewmate'}
          </button>
        </div>
      </form>
    </div>
  )
}

export default CreateCrewmate
