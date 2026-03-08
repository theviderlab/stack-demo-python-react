# 🚀 Stack Demo: Python + React Monorepo

Proyecto demo funcional con **Backend Python (Flask)** y **Frontend React (Vite)** en un único repositorio, diseñado para desplegar el backend en **Render** y el frontend en **Vercel** de forma independiente.

## 📋 Características

- ✅ **Monorepo**: Backend y frontend en un único repositorio
- ✅ **Deploy independiente**: Backend y frontend se despliegan por separado
- ✅ **API REST funcional**: CRUD completo de TODOs con Flask
- ✅ **Frontend moderno**: React 18 + Vite con interfaz responsive
- ✅ **Git workflow**: Estrategia de branches `main` (producción) + `develop` (desarrollo)
- ✅ **CORS configurado**: Comunicación entre dominios diferentes
- ✅ **Variables de entorno**: Configuración para dev/producción
- ✅ **Documentación completa**: Guías de setup, desarrollo y deployment

## 🏗️ Estructura del Proyecto

```
stack-demo-python-react/
│
├── backend/                    # Backend Python (Flask)
│   ├── app.py                  # API REST con endpoints CRUD
│   ├── requirements.txt        # Dependencias Python
│   ├── .env.example           # Ejemplo de variables de entorno
│   └── README.md              # Documentación del backend
│
├── frontend/                   # Frontend React (Vite)
│   ├── src/
│   │   ├── App.jsx            # Componente principal
│   │   ├── App.css            # Estilos
│   │   └── main.jsx           # Entry point
│   ├── package.json           # Dependencias Node.js
│   ├── vite.config.js         # Configuración Vite + Proxy
│   ├── vercel.json            # Configuración Vercel
│   ├── .env.example           # Ejemplo de variables de entorno
│   └── README.md              # Documentación del frontend
│
├── docs/                       # Documentación del proyecto
│   ├── DEPLOY.md              # Guía completa de deployment
│   └── GIT_WORKFLOW.md        # Workflow de Git y branches
│
├── .gitignore                 # Archivos ignorados por Git
└── README.md                  # Este archivo
```

## 🚀 Quick Start - Desarrollo Local

### Prerrequisitos

- **Python 3.11+** ([Descargar](https://www.python.org/downloads/))
- **Node.js 18+** ([Descargar](https://nodejs.org/))
- **Git** ([Descargar](https://git-scm.com/))

### 1. Clonar el Repositorio

```bash
git clone https://github.com/theviderlab/stack-demo-python-react.git
cd stack-demo-python-react
```

### 2. Configurar Backend

```bash
# Ir a la carpeta backend
cd backend

# Crear entorno virtual
python -m venv venv

# Activar entorno virtual
# Windows PowerShell:
.\venv\Scripts\Activate.ps1
# Windows CMD:
venv\Scripts\activate.bat
# macOS/Linux:
source venv/bin/activate

# Instalar dependencias
pip install -r requirements.txt

# Ejecutar servidor
python app.py
```

El backend estará en `http://localhost:5000`

### 3. Configurar Frontend (en otra terminal)

```bash
# Ir a la carpeta frontend
cd frontend

# Instalar dependencias
npm install

# Ejecutar servidor de desarrollo
npm run dev
```

El frontend estará en `http://localhost:5173`

### 4. Probar la Aplicación

Abre `http://localhost:5173` en tu navegador. Deberías ver:
- ✅ "Backend: Conectado" en verde
- Lista de TODOs precargados
- Poder agregar, completar y eliminar tareas

## 🌐 Deployment a Producción

### Backend → Render

1. Crea una cuenta en [Render](https://render.com)
2. Crea un **Web Service**
3. Configura:
   - **Root Directory**: `backend`
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `gunicorn app:app`
   - **Branch**: `main`

### Frontend → Vercel

1. Crea una cuenta en [Vercel](https://vercel.com)
2. Importa tu repositorio
3. Configura:
   - **Root Directory**: `frontend`
   - **Framework**: Vite (detectado automáticamente)
   - **Variable de entorno**: `VITE_API_URL` = URL de tu backend en Render

**Documentación completa**: Ver [docs/DEPLOY.md](docs/DEPLOY.md)

## 🌿 Git Workflow

Este proyecto usa la estrategia de branches `main` + `develop`:

- **`main`**: Branch de producción - se despliega automáticamente
- **`develop`**: Branch de desarrollo - para trabajo diario

### Desarrollo Diario

```bash
# Trabajar en develop
git checkout develop
git add .
git commit -m "feat: nueva característica"
git push origin develop
```

### Desplegar a Producción

```bash
# Mergear develop a main
git checkout main
git merge develop
git push origin main  # ⚡ Deploy automático en Render + Vercel
```

**Documentación completa**: Ver [docs/GIT_WORKFLOW.md](docs/GIT_WORKFLOW.md)

## 📡 API Endpoints

El backend expone los siguientes endpoints:

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/` | Información de la API |
| GET | `/api/health` | Health check |
| GET | `/api/todos` | Listar todos los TODOs |
| POST | `/api/todos` | Crear nuevo TODO |
| PUT | `/api/todos/:id` | Actualizar TODO |
| DELETE | `/api/todos/:id` | Eliminar TODO |

## 🛠️ Stack Tecnológico

### Backend
- **Flask 3.0**: Framework web minimalista
- **Flask-CORS**: Manejo de CORS
- **Gunicorn**: WSGI server para producción
- **Python 3.11+**: Lenguaje de programación

### Frontend
- **React 18**: Librería UI
- **Vite 6**: Build tool y dev server
- **CSS3**: Estilos nativos (sin frameworks)

### Deployment
- **Render**: Hosting del backend (plan gratuito)
- **Vercel**: Hosting del frontend (plan gratuito)
- **GitHub**: Control de versiones y CI/CD

## 📂 Documentación Adicional

- **[Backend README](backend/README.md)**: Documentación específica del backend
- **[Frontend README](frontend/README.md)**: Documentación específica del frontend
- **[Guía de Deployment](docs/DEPLOY.md)**: Paso a paso completo para deploy
- **[Git Workflow](docs/GIT_WORKFLOW.md)**: Estrategia de branches y comandos útiles

## 🔧 Configuración Avanzada

### Variables de Entorno

#### Backend Local
Crear `backend/.env`:
```env
FLASK_ENV=development
FLASK_DEBUG=True
PORT=5000
```

#### Frontend Local
Crear `frontend/.env.local`:
```env
VITE_API_URL=http://localhost:5000
```

#### Producción
- **Vercel**: Configurar `VITE_API_URL` en el dashboard
- **Render**: No requiere variables para este demo

### CORS en Producción

Edita `backend/app.py` línea ~11 para agregar tu dominio de Vercel:

```python
"origins": [
    "http://localhost:5173",
    "https://tu-app.vercel.app",  # ← Agregar tu dominio
],
```

## 🧪 Testing

### Backend
```bash
cd backend
# (Con venv activado)
python -m pytest  # Requiere instalar pytest
```

### Frontend
```bash
cd frontend
npm run test  # Requiere configurar Vitest
```

## 🤝 Contribuir

1. Fork el proyecto
2. Crea tu feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'feat: add some AmazingFeature'`)
4. Push a la branch (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request a `develop`

## 📝 Notas Importantes

- **Plan Free de Render**: El backend se "duerme" después de 15 minutos sin uso. Primera petición después toma ~30 segundos.
- **Almacenamiento en memoria**: Los TODOs se almacenan en memoria y se pierden al reiniciar. Para persistencia real, agregar PostgreSQL.
- **CORS**: Recuerda actualizar la lista de origins permitidos al cambiar dominios.

## 🚀 Próximos Pasos

Ideas para extender este proyecto:

- [ ] Agregar base de datos PostgreSQL
- [ ] Implementar autenticación (JWT)
- [ ] Agregar tests unitarios y de integración
- [ ] CI/CD con GitHub Actions
- [ ] Agregar TypeScript al frontend
- [ ] Implementar paginación en la API
- [ ] Agregar filtros y búsqueda
- [ ] Docker para desarrollo local

## 📄 Licencia

Este proyecto es open source y está disponible bajo la licencia MIT.

## 🙋 Soporte

Si tienes preguntas o problemas:

1. Revisa la [documentación de deployment](docs/DEPLOY.md)
2. Revisa la [guía de Git workflow](docs/GIT_WORKFLOW.md)
3. Abre un issue en GitHub

---

**Hecho con ❤️ como demo de stack Python + React con deploy independiente**
