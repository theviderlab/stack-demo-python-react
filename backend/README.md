# Backend - Python Flask API

API REST simple para gestión de TODOs construida con Flask.

## 🚀 Desarrollo Local

### Prerrequisitos
- Python 3.11 o superior
- pip (gestor de paquetes de Python)

### Instalación

1. Crear entorno virtual:
```bash
cd backend
python -m venv venv
```

2. Activar entorno virtual:

**Windows (PowerShell):**
```powershell
.\venv\Scripts\Activate.ps1
```

**Windows (CMD):**
```cmd
venv\Scripts\activate.bat
```

**macOS/Linux:**
```bash
source venv/bin/activate
```

3. Instalar dependencias:
```bash
pip install -r requirements.txt
```

4. Ejecutar servidor de desarrollo:
```bash
python app.py
```

El servidor estará disponible en `http://localhost:5000`

## 📡 Endpoints de la API

### Health Check
```
GET /api/health
```
Verifica que el servicio esté funcionando.

### Listar TODOs
```
GET /api/todos
```
Retorna la lista completa de TODOs.

### Crear TODO
```
POST /api/todos
Content-Type: application/json

{
  "title": "Nueva tarea",
  "completed": false
}
```

### Actualizar TODO
```
PUT /api/todos/:id
Content-Type: application/json

{
  "title": "Tarea actualizada",
  "completed": true
}
```

### Eliminar TODO
```
DELETE /api/todos/:id
```

## 🔧 Configuración para Producción

### Render

**Configuración del servicio:**
- **Environment**: Python 3
- **Build Command**: `pip install -r requirements.txt`
- **Start Command**: `gunicorn app:app`
- **Root Directory**: `backend`

**Variables de entorno:**
- `PYTHON_VERSION`: `3.11.0` (o superior)

**CORS en producción:**
Edita `app.py` línea 11 para agregar tu dominio de Vercel:
```python
"origins": ["http://localhost:5173", "https://tu-app.vercel.app"],
```

## 📦 Estructura

```
backend/
├── app.py              # Aplicación Flask principal
├── requirements.txt    # Dependencias Python
└── README.md          # Esta documentación
```

## 🧪 Testing

Puedes probar los endpoints con curl:

```bash
# Health check
curl http://localhost:5000/api/health

# Listar TODOs
curl http://localhost:5000/api/todos

# Crear TODO
curl -X POST http://localhost:5000/api/todos \
  -H "Content-Type: application/json" \
  -d '{"title":"Mi nueva tarea"}'
```

## 📝 Notas

- Los datos se almacenan en memoria (se pierden al reiniciar el servidor)
- Para persistencia real, considera agregar PostgreSQL (disponible en Render)
- CORS está configurado para permitir requests desde localhost y dominios de producción
