# Frontend - React + Vite

Aplicación web de TODOs construida con React y Vite que consume una API REST de Flask.

## 🚀 Desarrollo Local

### Prerrequisitos
- Node.js 18 o superior
- npm (incluido con Node.js)
- Backend ejecutándose en `http://localhost:5000`

### Instalación

1. Instalar dependencias:
```bash
cd frontend
npm install
```

2. Configurar variables de entorno (opcional para desarrollo):
```bash
cp .env.example .env.local
```

En desarrollo local, el proxy de Vite redirige automáticamente las peticiones `/api` al backend.

3. Ejecutar servidor de desarrollo:
```bash
npm run dev
```

La aplicación estará disponible en `http://localhost:5173`

## 🏗️ Build de Producción

```bash
npm run build
```

Los archivos optimizados se generan en la carpeta `dist/`.

Para preview local del build:
```bash
npm run preview
```

## 🔧 Configuración para Vercel

### Deploy Automático

1. **Conectar repositorio en Vercel:**
   - Ve a [vercel.com](https://vercel.com)
   - Importa tu repositorio de GitHub
   - **Root Directory**: `frontend`
   - **Framework Preset**: Vite (detectado automáticamente)

2. **Configurar Variables de Entorno:**
   - En el dashboard de Vercel → Settings → Environment Variables
   - Agregar: `VITE_API_URL` = `https://tu-backend.onrender.com`

3. **Deploy:**
   - Cada push a `main` despliega automáticamente
   - Preview deployments para otras branches

### Configuración Manual

El archivo `vercel.json` ya está configurado con:
- Framework: Vite
- Build command: `npm run build`
- Output directory: `dist`

## 📂 Estructura del Proyecto

```
frontend/
├── public/             # Archivos estáticos
├── src/
│   ├── App.jsx         # Componente principal
│   ├── App.css         # Estilos del componente
│   ├── main.jsx        # Punto de entrada
│   └── index.css       # Estilos globales
├── index.html          # HTML base
├── package.json        # Dependencias
├── vite.config.js      # Configuración Vite + Proxy
├── vercel.json         # Configuración Vercel
└── README.md           # Esta documentación
```

## 🌐 Variables de Entorno

### Desarrollo Local
No necesitas configurar `VITE_API_URL` porque el proxy de Vite redirige automáticamente a `http://localhost:5000`.

### Producción (Vercel)
Configura en el dashboard de Vercel:
```
VITE_API_URL=https://tu-backend.onrender.com
```

## 🎨 Características

- ✅ Interfaz moderna y responsive
- ✅ Estado de conexión con el backend
- ✅ Crear, leer, actualizar y eliminar TODOs
- ✅ Manejo de errores y estados de carga
- ✅ Proxy para desarrollo local
- ✅ Build optimizado para producción

## 🔗 Consumo de la API

El componente `App.jsx` consume estos endpoints del backend:

- `GET /api/health` - Verificar estado del backend
- `GET /api/todos` - Obtener lista de TODOs
- `POST /api/todos` - Crear nuevo TODO
- `PUT /api/todos/:id` - Actualizar TODO
- `DELETE /api/todos/:id` - Eliminar TODO

## 🐛 Troubleshooting

### Error de CORS en desarrollo
Verifica que el backend tenga configurado CORS para `http://localhost:5173`.

### No se conecta al backend en producción
1. Verifica que `VITE_API_URL` esté configurado en Vercel
2. Verifica que el backend en Render esté corriendo
3. Verifica que CORS en el backend incluya tu dominio de Vercel

### Build falla en Vercel
Verifica que el `Root Directory` esté configurado como `frontend`.

## 📝 Scripts Disponibles

- `npm run dev` - Servidor de desarrollo
- `npm run build` - Build de producción
- `npm run preview` - Preview del build local
