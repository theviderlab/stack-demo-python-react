from flask import Flask, jsonify, request
from flask_cors import CORS
from datetime import datetime
import os

app = Flask(__name__)

# Configurar CORS para permitir requests desde el frontend
# Lee la URL del frontend desde variable de entorno
frontend_url = os.getenv('FRONTEND_URL', '')
allowed_origins = [
    "http://localhost:5173",
    "http://localhost:3000"
]

# Agregar el dominio de producción si está configurado
if frontend_url:
    allowed_origins.append(frontend_url)

CORS(app, resources={
    r"/api/*": {
        "origins": allowed_origins,
        "methods": ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
        "allow_headers": ["Content-Type"]
    }
})

# Almacenamiento en memoria (se reinicia en cada deploy)
todos = [
    {"id": 1, "title": "Configurar backend en Render", "completed": True, "created_at": "2026-03-08T10:00:00"},
    {"id": 2, "title": "Configurar frontend en Vercel", "completed": True, "created_at": "2026-03-08T10:05:00"},
    {"id": 3, "title": "Probar deploy independiente", "completed": False, "created_at": "2026-03-08T10:10:00"},
]

next_id = 4


@app.route('/')
def home():
    """Endpoint raíz con información de la API"""
    return jsonify({
        "message": "API REST de TODOs - Python + Flask",
        "version": "1.0.0",
        "endpoints": {
            "health": "/api/health",
            "todos": "/api/todos",
            "create_todo": "POST /api/todos"
        }
    })


@app.route('/api/health')
def health():
    """Health check para monitoreo"""
    return jsonify({
        "status": "healthy",
        "timestamp": datetime.now().isoformat(),
        "service": "backend-python"
    })


@app.route('/api/todos', methods=['GET'])
def get_todos():
    """Obtener lista de todos"""
    return jsonify({
        "success": True,
        "data": todos,
        "count": len(todos)
    })


@app.route('/api/todos', methods=['POST'])
def create_todo():
    """Crear un nuevo todo"""
    global next_id
    
    data = request.get_json()
    
    if not data or 'title' not in data:
        return jsonify({
            "success": False,
            "error": "El campo 'title' es requerido"
        }), 400
    
    new_todo = {
        "id": next_id,
        "title": data['title'],
        "completed": data.get('completed', False),
        "created_at": datetime.now().isoformat()
    }
    
    todos.append(new_todo)
    next_id += 1
    
    return jsonify({
        "success": True,
        "data": new_todo
    }), 201


@app.route('/api/todos/<int:todo_id>', methods=['PUT'])
def update_todo(todo_id):
    """Actualizar un todo existente"""
    todo = next((t for t in todos if t['id'] == todo_id), None)
    
    if not todo:
        return jsonify({
            "success": False,
            "error": "Todo no encontrado"
        }), 404
    
    data = request.get_json()
    
    if 'title' in data:
        todo['title'] = data['title']
    if 'completed' in data:
        todo['completed'] = data['completed']
    
    return jsonify({
        "success": True,
        "data": todo
    })


@app.route('/api/todos/<int:todo_id>', methods=['DELETE'])
def delete_todo(todo_id):
    """Eliminar un todo"""
    global todos
    
    todo = next((t for t in todos if t['id'] == todo_id), None)
    
    if not todo:
        return jsonify({
            "success": False,
            "error": "Todo no encontrado"
        }), 404
    
    todos = [t for t in todos if t['id'] != todo_id]
    
    return jsonify({
        "success": True,
        "message": "Todo eliminado correctamente"
    })


if __name__ == '__main__':
    # Para desarrollo local
    app.run(debug=True, host='0.0.0.0', port=5000)
