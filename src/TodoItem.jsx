/**
 * TodoItem.jsx - Individual Todo Item Component
 * 
 * Purpose: This component represents a single todo item in the list.
 * It's a presentational/display component that receives data and callbacks as props.
 * 
 * Responsibilities:
 * - Display the task text
 * - Show completion status (via checkbox or styling)
 * - Display category badge with color coding
 * - Display due date badge with urgency indicators
 * - Provide UI for toggling completion
 * - Provide UI for editing the task
 * - Provide UI for deleting the task
 * - Apply appropriate styling based on completion status
 * 
 * Props:
 * @param {Object} task - The task object containing { id, text, completed, category, dueDate }
 * @param {Function} onToggle - Callback function to toggle task completion
 * @param {Function} onEdit - Callback function to start editing the task
 * @param {Function} onDelete - Callback function to delete the task
 * 
 * This is a "controlled component" - it doesn't manage its own state,
 * instead relying on props passed from the parent TodoApp component.
 */

function TodoItem({ task, onToggle, onEdit, onDelete }) {
  /**
   * Returns the background color for a given category
   * Each category has a distinct, soft color for visual distinction
   */
  const getCategoryColor = (category) => {
    const colors = {
      'Personal': '#6f42c1',    // Purple
      'Work': '#007bff',         // Blue
      'Shopping': '#28a745',     // Green
      'Health': '#dc3545',       // Red
      'Finance': '#ffc107',      // Yellow/Gold
      'Other': '#6c757d'         // Gray
    }
    return colors[category] || '#6c757d' // Default to gray if category not found
  }

  /**
   * Returns the text color based on background brightness
   * Light backgrounds get dark text, dark backgrounds get white text
   */
  const getTextColor = (category) => {
    // Finance (yellow) needs dark text for readability
    return category === 'Finance' ? '#000' : '#fff'
  }

  /**
   * Formats the due date for display
   * @param {string} dateString - The date in YYYY-MM-DD format
   * @param {string} timeString - The time in HH:MM format
   * @returns {string} Formatted date string
   */
  const formatDueDate = (dateString, timeString) => {
    if (!dateString) return ''
    const date = new Date(dateString + 'T00:00:00')
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const dueDate = new Date(date)
    dueDate.setHours(0, 0, 0, 0)
    
    const diffTime = dueDate - today
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    
    // Format time if it exists
    const timeDisplay = timeString ? ` ${formatTime(timeString)}` : ''
    
    if (diffDays < 0) return `⚠️ Overdue${timeDisplay}`
    if (diffDays === 0) return `📅 Today${timeDisplay}`
    if (diffDays === 1) return `📅 Tomorrow${timeDisplay}`
    if (diffDays <= 7) return `📅 ${diffDays} days${timeDisplay}`
    
    return `📅 ${date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}${timeDisplay}`
  }

  /**
   * Formats the time in 12-hour format with AM/PM
   * @param {string} timeString - The time in HH:MM format (24-hour)
   * @returns {string} Formatted time string
   */
  const formatTime = (timeString) => {
    if (!timeString) return ''
    const [hours, minutes] = timeString.split(':')
    const hour = parseInt(hours)
    const ampm = hour >= 12 ? 'PM' : 'AM'
    const displayHour = hour % 12 || 12
    return `${displayHour}:${minutes} ${ampm}`
  }

  /**
   * Returns the color for the due date badge based on urgency
   */
  const getDueDateColor = (dateString) => {
    if (!dateString) return '#6c757d'
    const date = new Date(dateString + 'T00:00:00')
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const dueDate = new Date(date)
    dueDate.setHours(0, 0, 0, 0)
    
    const diffTime = dueDate - today
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    
    if (diffDays < 0) return '#dc3545' // Red for overdue
    if (diffDays === 0) return '#ffc107' // Yellow for today
    if (diffDays <= 3) return '#fd7e14' // Orange for soon
    return '#6c757d' // Gray for later
  }

  return (
    <div className={`todo-item ${task.completed ? 'completed' : ''}`}>
      {/* Checkbox to mark task as complete/incomplete */}
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => onToggle(task.id)}
        className="todo-checkbox"
        aria-label="Toggle task completion"
      />
      
      {/* Task text - click to toggle completion */}
      <span 
        className="todo-text"
        onClick={() => onToggle(task.id)}
        style={{ 
          textDecoration: task.completed ? 'line-through' : 'none',
          color: task.completed ? '#888' : '#000',
          cursor: 'pointer',
          flex: 1,
          userSelect: 'none',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          flexWrap: 'wrap'
        }}
      >
        <span>{task.text}</span>
        {task.category && (
          <span 
            className="category-badge"
            style={{
              fontSize: '11px',
              padding: '4px 10px',
              backgroundColor: getCategoryColor(task.category),
              color: getTextColor(task.category),
              borderRadius: '12px',
              fontWeight: '600',
              textTransform: 'uppercase',
              letterSpacing: '0.5px',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
              whiteSpace: 'nowrap'
            }}
          >
            {task.category}
          </span>
        )}
        {task.dueDate && (
          <span 
            className="due-date-badge"
            style={{
              fontSize: '11px',
              padding: '4px 10px',
              backgroundColor: getDueDateColor(task.dueDate),
              color: '#fff',
              borderRadius: '12px',
              fontWeight: '600',
              letterSpacing: '0.5px',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
              whiteSpace: 'nowrap'
            }}
          >
            {formatDueDate(task.dueDate, task.dueTime)}
          </span>
        )}
      </span>
      
      {/* Action buttons container */}
      <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
        {/* Edit button with pencil SVG icon */}
        <button 
          onClick={() => onEdit(task.id, task.text, task.dueDate, task.dueTime)}
          className="edit-btn"
          aria-label="Edit task"
          style={{
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
            padding: '4px',
            display: 'flex',
            alignItems: 'center',
            transition: 'transform 0.2s'
          }}
          onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
          onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
        >
          <svg 
            width="20" 
            height="20" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="#6f42c1" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
          </svg>
        </button>

        {/* Delete button with trashcan SVG icon */}
        <button 
          onClick={() => onDelete(task.id)}
          className="delete-btn"
          aria-label="Delete task"
          style={{
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
            padding: '4px',
            display: 'flex',
            alignItems: 'center',
            transition: 'transform 0.2s'
          }}
          onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
          onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
        >
          <svg 
            width="20" 
            height="20" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="#6f42c1" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            <polyline points="3 6 5 6 21 6"></polyline>
            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
            <line x1="10" y1="11" x2="10" y2="17"></line>
            <line x1="14" y1="11" x2="14" y2="17"></line>
          </svg>
        </button>
      </div>
    </div>
  )
}

export default TodoItem