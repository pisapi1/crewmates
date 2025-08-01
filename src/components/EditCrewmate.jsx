import { useState } from 'react'
import { supabase } from '../client'
import './EditCrewmate.css'

const EditCrewmate = ({ crewmate, onCrewmateUpdated, onCrewmateDeleted, onCancel }) => {
  const [formData, setFormData] = useState({
    name: crewmate.name,
    color: crewmate.color
  })
  const [loading, setLoading] = useState(false)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)

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

  const handleUpdate = async (e) => {
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
        .update({
          name: formData.name.trim(),
          color: formData.color
        })
        .eq('id', crewmate.id)
        .select()

      if (error) {
        console.error('Error updating crewmate:', error)
        alert('Error updating crewmate: ' + error.message)
      } else {
        console.log('Crewmate updated successfully:', data)
        onCrewmateUpdated()
      }
    } catch (err) {
      console.error('Unexpected error:', err)
      alert('An unexpected error occurred')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async () => {
    setLoading(true)

    try {
      const { error } = await supabase
        .from('Crewmates')
        .delete()
        .eq('id', crewmate.id)

      if (error) {
        console.error('Error deleting crewmate:', error)
        alert('Error deleting crewmate: ' + error.message)
      } else {
        console.log('Crewmate deleted successfully')
        onCrewmateDeleted()
      }
    } catch (err) {
      console.error('Unexpected error:', err)
      alert('An unexpected error occurred')
    } finally {
      setLoading(false)
      setShowDeleteConfirm(false)
    }
  }

  return (
    <div className="edit-crewmate">
      <div className="form-header">
        <h2>Edit {crewmate.name}</h2>
        <p>Update your crewmate's information</p>
      </div>

      <form onSubmit={handleUpdate} className="crewmate-form">
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
        <div className="crewmate-preview">
          <h3>Updated Preview</h3>
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
              <p>Color: {formData.color}</p>
            </div>
          </div>
        </div>

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
            className="update-btn"
            disabled={loading}
          >
            {loading ? 'Updating...' : 'Update Crewmate'}
          </button>
        </div>
      </form>

      {/* Delete Section */}
      <div className="delete-section">
        <h3>⚠️ Danger Zone</h3>
        <p>Permanently delete this crewmate. This action cannot be undone.</p>
        
        {!showDeleteConfirm ? (
          <button 
            className="delete-btn"
            onClick={() => setShowDeleteConfirm(true)}
            disabled={loading}
          >
            🗑️ Delete Crewmate
          </button>
        ) : (
          <div className="delete-confirm">
            <p><strong>Are you sure you want to delete "{crewmate.name}"?</strong></p>
            <div className="confirm-actions">
              <button 
                className="cancel-delete-btn"
                onClick={() => setShowDeleteConfirm(false)}
                disabled={loading}
              >
                Cancel
              </button>
              <button 
                className="confirm-delete-btn"
                onClick={handleDelete}
                disabled={loading}
              >
                {loading ? 'Deleting...' : 'Yes, Delete Forever'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default EditCrewmate
