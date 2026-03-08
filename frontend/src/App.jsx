import { useState, useEffect } from 'react'
import './App.css'

// URL de la API - usa variable de entorno en producción, proxy en desarrollo
const API_URL = import.meta.env.VITE_API_URL || '';

function App() {
  const [todos, setTodos] = useState([])
  const [newTodo, setNewTodo] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [apiHealth, setApiHealth] = useState(null)

  // Verificar estado de la API
  useEffect(() => {
    fetch(`${API_URL}/api/health`)
      .then(res => res.json())
      .then(data => setApiHealth(data))
      .catch(() => setApiHealth({ status: 'error' }))
  }, [])

  // Cargar TODOs al montar el componente
  useEffect(() => {
    fetchTodos()
  }, [])

  const fetchTodos = async () => {
    try {
      setLoading(true)
      const response = await fetch(`${API_URL}/api/todos`)
      const data = await response.json()
      
      if (data.success) {
        setTodos(data.data)
        setError(null)
      } else {
        setError('Error al cargar las tareas')
      }
    } catch (err) {
      setError('No se pudo conectar con el backend')
      console.error('Error fetching todos:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleAddTodo = async (e) => {
    e.preventDefault()
    
    if (!newTodo.trim()) return

    try {
      const response = await fetch(`${API_URL}/api/todos`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title: newTodo }),
      })
      
      const data = await response.json()
      
      if (data.success) {
        setTodos([...todos, data.data])
        setNewTodo('')
        setError(null)
      }
    } catch (err) {
      setError('Error al crear la tarea')
      console.error('Error creating todo:', err)
    }
  }

  const handleToggleTodo = async (id) => {
    const todo = todos.find(t => t.id === id)
    
    try {
      const response = await fetch(`${API_URL}/api/todos/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ completed: !todo.completed }),
      })
      
      const data = await response.json()
      
      if (data.success) {
        setTodos(todos.map(t => t.id === id ? data.data : t))
        setError(null)
      }
    } catch (err) {
      setError('Error al actualizar la tarea')
      console.error('Error updating todo:', err)
    }
  }

  const handleDeleteTodo = async (id) => {
    try {
      const response = await fetch(`${API_URL}/api/todos/${id}`, {
        method: 'DELETE',
      })
      
      const data = await response.json()
      
      if (data.success) {
        setTodos(todos.filter(t => t.id !== id))
        setError(null)
      }
    } catch (err) {
      setError('Error al eliminar la tarea')
      console.error('Error deleting todo:', err)
    }
  }

  return (
    <div className="app">
      <div className="container">
        <header className="header">
          <h1>📝 TODO App</h1>
          <p className="subtitle">Python Flask + React + Vite</p>
          <div className={`api-status ${apiHealth?.status === 'healthy' ? 'healthy' : 'error'}`}>
            Backend: {apiHealth?.status === 'healthy' ? '✓ Conectado' : '✗ Desconectado'}
          </div>
        </header>

        <form onSubmit={handleAddTodo} className="todo-form">
          <input
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            placeholder="Agregar nueva tarea..."
            className="todo-input"
          />
          <button type="submit" className="add-button">
            Agregar
          </button>
        </form>

        {error && (
          <div className="error-message">
            ⚠️ {error}
          </div>
        )}

        {loading ? (
          <div className="loading">Cargando tareas...</div>
        ) : (
          <ul className="todo-list">
            {todos.length === 0 ? (
              <li className="empty-state">
                No hay tareas. ¡Agrega una para comenzar!
              </li>
            ) : (
              todos.map((todo) => (
                <li key={todo.id} className="todo-item">
                  <div className="todo-content">
                    <input
                      type="checkbox"
                      checked={todo.completed}
                      onChange={() => handleToggleTodo(todo.id)}
                      className="todo-checkbox"
                    />
                    <span className={todo.completed ? 'completed' : ''}>
                      {todo.title}
                    </span>
                  </div>
                  <button
                    onClick={() => handleDeleteTodo(todo.id)}
                    className="delete-button"
                    aria-label="Eliminar tarea"
                  >
                    🗑️
                  </button>
                </li>
              ))
            )}
          </ul>
        )}

        <footer className="footer">
          <p>
            Total: {todos.length} tarea{todos.length !== 1 ? 's' : ''} | 
            Completadas: {todos.filter(t => t.completed).length}
          </p>
        </footer>
      </div>
    </div>
  )
}

export default App
