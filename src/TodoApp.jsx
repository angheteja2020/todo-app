import { useState, useEffect, useRef } from 'react'
import TodoItem from './TodoItem'

/**
 * TodoApp.jsx - Main Todo Application Component
 * 
 * Purpose: This component manages the todo list application logic and state.
 * It's the container component that orchestrates the todo functionality.
 * 
 * Responsibilities:
 * - Maintain the list of tasks in state
 * - Persist tasks to localStorage
 * - Load tasks from localStorage on mount
 * - Handle adding new tasks
 * - Handle toggling task completion status
 * - Handle editing tasks
 * - Handle deleting tasks
 * - Render the input form and task list
 * - Pass data and callbacks to TodoItem components
 * 
 * State Structure:
 * - tasks: Array of task objects with { id, text, completed, category, dueDate } structure
 * - newTask: String for controlled input field
 * - editingTaskId: Number or null for tracking which task is being edited
 * - editTaskText: String for edit input field
 * - selectedCategory: String for category selection
 * - dueDate: String for due date selection
 * - activeFilter: String for current filter selection
 */

function TodoApp() {
  // State for managing the list of tasks
  const [tasks, setTasks] = useState([])
  
  // State for managing the new task input field value
  const [newTask, setNewTask] = useState('')
  
  // State for tracking which task is being edited (null if none)
  const [editingTaskId, setEditingTaskId] = useState(null)
  
  // State for the edit input value
  const [editTaskText, setEditTaskText] = useState('')

  // State for the edit due date
  const [editDueDate, setEditDueDate] = useState('')

  // State for the edit due time
  const [editDueTime, setEditDueTime] = useState('')

  // State for managing the category selection
  const [selectedCategory, setSelectedCategory] = useState('Personal')

  // State for managing the due date
  const [dueDate, setDueDate] = useState('')

  // State for managing the due time
  const [dueTime, setDueTime] = useState('')

  // State for managing the active filter
  const [activeFilter, setActiveFilter] = useState('All')

  // Ref to track if this is the first render
  const isFirstRender = useRef(true)

  /**
   * useEffect: Load tasks from localStorage on component mount
   * 
   * This effect runs once when the component first mounts (empty dependency array)
   * It checks if there are saved tasks in localStorage and loads them into state
   */
  useEffect(() => {
    const savedTasks = localStorage.getItem('tasks')
    if (savedTasks) {
      try {
        const parsedTasks = JSON.parse(savedTasks)
        setTasks(parsedTasks)
      } catch (error) {
        console.error('Error loading tasks from localStorage:', error)
      }
    }
  }, []) // Empty dependency array - runs only once on mount

  /**
   * useEffect: Save tasks to localStorage whenever tasks state changes
   * 
   * This effect runs every time the tasks array changes
   * It automatically persists the current tasks to localStorage
   * IMPORTANT: Skips the first render to prevent overwriting loaded tasks
   */
  useEffect(() => {
    // Skip saving on the first render (when component mounts with empty array)
    if (isFirstRender.current) {
      isFirstRender.current = false
      return
    }
    
    // Save tasks to localStorage on subsequent renders
    localStorage.setItem('tasks', JSON.stringify(tasks))
  }, [tasks]) // Dependency on tasks - runs whenever tasks changes

  /**
   * Adds a new task to the list
   * Creates a task object with unique id, text, completed status, category, due date, and due time
   * 
   * Implementation details:
   * 1. Validates that input is not empty (after trimming whitespace)
   * 2. Creates a new task object with:
   *    - id: unique timestamp-based identifier
   *    - text: the task description from newTask state
   *    - completed: false (new tasks start incomplete)
   *    - category: the selected category from dropdown
   *    - dueDate: optional due date from date picker
   *    - dueTime: optional due time from time picker
   * 3. Updates tasks state by spreading existing tasks and adding new one
   * 4. Clears the input field by resetting newTask to empty string
   * 5. Resets category to default "Personal" and clears due date and time
   */
  const addTask = () => {
    // Prevent adding empty tasks
    if (newTask.trim() === '') return
    
    // Create new task object
    const taskToAdd = {
      id: Date.now(), // Simple unique ID using timestamp
      text: newTask,
      completed: false,
      category: selectedCategory,
      dueDate: dueDate || null,
      dueTime: dueTime || null
    }
    
    // Add to tasks array using spread operator to maintain immutability
    setTasks([...tasks, taskToAdd])
    
    // Clear input field, reset category, and clear due date and time
    setNewTask('')
    setSelectedCategory('Personal')
    setDueDate('')
    setDueTime('')
  }

  /**
   * Toggles the completed status of a task
   * @param {number} id - The unique identifier of the task to toggle
   * 
   * Implementation:
   * - Maps through all tasks
   * - Finds the task matching the id
   * - Flips its completed boolean value
   * - Returns new array with updated task
   */
  const toggleTask = (id) => {
    setTasks(tasks.map(task =>
      task.id === id 
        ? { ...task, completed: !task.completed } // Toggle the matching task
        : task // Keep other tasks unchanged
    ))
  }

  /**
   * Deletes a task from the list
   * @param {number} id - The unique identifier of the task to delete
   * 
   * Implementation:
   * - Filters out the task with matching id
   * - Returns new array without the deleted task
   */
  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id))
  }

  /**
   * Starts editing a task
   * @param {number} id - The unique identifier of the task to edit
   * @param {string} currentText - The current text of the task
   * @param {string} currentDueDate - The current due date of the task
   * @param {string} currentDueTime - The current due time of the task
   */
  const startEditTask = (id, currentText, currentDueDate, currentDueTime) => {
    setEditingTaskId(id)
    setEditTaskText(currentText)
    setEditDueDate(currentDueDate || '')
    setEditDueTime(currentDueTime || '')
  }

  /**
   * Updates a task with new text, due date, and/or due time
   * @param {number} id - The unique identifier of the task to update
   */
  const updateTask = (id) => {
    if (editTaskText.trim() === '') return
    
    setTasks(tasks.map(task =>
      task.id === id ? { 
        ...task, 
        text: editTaskText, 
        dueDate: editDueDate || null,
        dueTime: editDueTime || null
      } : task
    ))
    
    // Exit edit mode
    setEditingTaskId(null)
    setEditTaskText('')
    setEditDueDate('')
    setEditDueTime('')
  }

  /**
   * Cancels editing and returns to normal view
   */
  const cancelEdit = () => {
    setEditingTaskId(null)
    setEditTaskText('')
    setEditDueDate('')
    setEditDueTime('')
  }

  /**
   * Handles Enter key press in the input field
   */
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      addTask()
    }
  }

  /**
   * Handles Enter key press in the edit input field
   */
  const handleEditKeyPress = (e, id) => {
    if (e.key === 'Enter') {
      updateTask(id)
    } else if (e.key === 'Escape') {
      cancelEdit()
    }
  }

  /**
   * Filters tasks based on the active filter
   * Returns all tasks or only tasks matching the selected category
   */
  const getFilteredTasks = () => {
    if (activeFilter === 'All') {
      return tasks
    }
    return tasks.filter(task => task.category === activeFilter)
  }

  // Get the filtered tasks to display
  const filteredTasks = getFilteredTasks()

  return (
    <div className="todo-app">
      <h1>Todo App</h1>
      
      {/* Input section for adding new tasks */}
      <div className="todo-input" style={{ flexWrap: 'wrap' }}>
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Enter a new task..."
          style={{ minWidth: '200px' }}
        />
        <select 
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          style={{
            padding: '12px 16px',
            border: '2px solid #e0e0e0',
            borderRadius: '8px',
            fontSize: '16px',
            backgroundColor: 'white',
            cursor: 'pointer',
            transition: 'border-color 0.3s'
          }}
        >
          <option value="Personal">Personal</option>
          <option value="Work">Work</option>
          <option value="Shopping">Shopping</option>
          <option value="Health">Health</option>
          <option value="Finance">Finance</option>
          <option value="Other">Other</option>
        </select>
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          style={{
            padding: '12px 16px',
            border: '2px solid #e0e0e0',
            borderRadius: '8px',
            fontSize: '16px',
            backgroundColor: 'white',
            cursor: 'pointer',
            transition: 'border-color 0.3s',
            colorScheme: 'light'
          }}
        />
        <input
          type="time"
          value={dueTime}
          onChange={(e) => setDueTime(e.target.value)}
          style={{
            padding: '12px 16px',
            border: '2px solid #e0e0e0',
            borderRadius: '8px',
            fontSize: '16px',
            backgroundColor: 'white',
            cursor: 'pointer',
            transition: 'border-color 0.3s',
            colorScheme: 'light'
          }}
        />
        <button onClick={addTask}>Add</button>
      </div>

      {/* Filter buttons */}
      <div style={{
        display: 'flex',
        gap: '8px',
        marginBottom: '20px',
        flexWrap: 'wrap',
        justifyContent: 'center'
      }}>
        {['All', 'Personal', 'Work', 'Shopping', 'Health', 'Finance', 'Other'].map(filter => (
          <button
            key={filter}
            onClick={() => setActiveFilter(filter)}
            style={{
              padding: '8px 16px',
              border: '2px solid #6f42c1',
              borderRadius: '20px',
              fontSize: '14px',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.3s',
              backgroundColor: activeFilter === filter ? '#6f42c1' : 'white',
              color: activeFilter === filter ? 'white' : '#6f42c1',
              boxShadow: activeFilter === filter ? '0 2px 8px rgba(111, 66, 193, 0.3)' : 'none'
            }}
          >
            {filter}
            {filter !== 'All' && (
              <span style={{
                marginLeft: '6px',
                backgroundColor: activeFilter === filter ? 'rgba(255,255,255,0.3)' : 'rgba(111, 66, 193, 0.1)',
                padding: '2px 6px',
                borderRadius: '10px',
                fontSize: '12px'
              }}>
                {tasks.filter(t => t.category === filter).length}
              </span>
            )}
            {filter === 'All' && (
              <span style={{
                marginLeft: '6px',
                backgroundColor: activeFilter === filter ? 'rgba(255,255,255,0.3)' : 'rgba(111, 66, 193, 0.1)',
                padding: '2px 6px',
                borderRadius: '10px',
                fontSize: '12px'
              }}>
                {tasks.length}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* List of tasks - Renders all tasks or shows empty state */}
      <div className="todo-list">
        {filteredTasks.length === 0 ? (
          // Empty state when no tasks exist
          <p className="empty-message">
            {tasks.length === 0 
              ? "No tasks yet. Add one to get started!" 
              : `No tasks in ${activeFilter} category.`}
          </p>
        ) : (
          // Map through filtered tasks array and render a TodoItem for each
          // Each TodoItem is a reusable component that receives:
          // - task: the task object with id, text, completed, category
          // - onToggle: callback function to toggle completion
          // - onDelete: callback function to delete the task
          // - onEdit: callback function to start editing the task
          // Key prop uses unique task.id for React's reconciliation
          filteredTasks.map(task => (
            // Check if this task is being edited
            editingTaskId === task.id ? (
              // Show edit form instead of TodoItem
              <div key={task.id} className="todo-input" style={{ marginBottom: '8px', flexWrap: 'wrap' }}>
                <input
                  type="text"
                  value={editTaskText}
                  onChange={(e) => setEditTaskText(e.target.value)}
                  onKeyPress={(e) => handleEditKeyPress(e, task.id)}
                  placeholder="Update task..."
                  autoFocus
                  style={{ minWidth: '200px' }}
                />
                <input
                  type="date"
                  value={editDueDate}
                  onChange={(e) => setEditDueDate(e.target.value)}
                  style={{
                    padding: '12px 16px',
                    border: '2px solid #e0e0e0',
                    borderRadius: '8px',
                    fontSize: '16px',
                    backgroundColor: 'white',
                    cursor: 'pointer',
                    transition: 'border-color 0.3s',
                    colorScheme: 'light'
                  }}
                />
                <input
                  type="time"
                  value={editDueTime}
                  onChange={(e) => setEditDueTime(e.target.value)}
                  style={{
                    padding: '12px 16px',
                    border: '2px solid #e0e0e0',
                    borderRadius: '8px',
                    fontSize: '16px',
                    backgroundColor: 'white',
                    cursor: 'pointer',
                    transition: 'border-color 0.3s',
                    colorScheme: 'light'
                  }}
                />
                <button onClick={() => updateTask(task.id)}>Update</button>
                <button 
                  onClick={cancelEdit}
                  style={{
                    padding: '12px 16px',
                    backgroundColor: '#6c757d',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    fontSize: '16px',
                    fontWeight: '600',
                    cursor: 'pointer'
                  }}
                >
                  Cancel
                </button>
              </div>
            ) : (
              // Show normal TodoItem
              <TodoItem
                key={task.id}
                task={task}
                onToggle={toggleTask}
                onDelete={deleteTask}
                onEdit={startEditTask}
              />
            )
          ))
        )}
      </div>

      {/* Stats footer */}
      {tasks.length > 0 && (
        <div className="todo-stats">
          <p>
            {tasks.filter(t => !t.completed).length} of {tasks.length} tasks remaining
            {activeFilter !== 'All' && ` • Showing ${filteredTasks.length} ${activeFilter} task${filteredTasks.length !== 1 ? 's' : ''}`}
          </p>
        </div>
      )}
    </div>
  )
}

export default TodoApp