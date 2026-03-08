# 🚀 Guía de Deployment

Esta guía te ayudará a desplegar el backend en Render y el frontend en Vercel desde un único repositorio.

## 📋 Prerrequisitos

- Cuenta en [Render](https://render.com) (gratis)
- Cuenta en [Vercel](https://vercel.com) (gratis)
- Repositorio en GitHub con el código del proyecto
- Git configurado localmente

## 🔧 Parte 1: Desplegar Backend en Render

### Paso 1: Crear Web Service en Render

1. Inicia sesión en [Render Dashboard](https://dashboard.render.com)
2. Click en **"New +"** → **"Web Service"**
3. Conecta tu repositorio de GitHub
4. Selecciona el repositorio `stack-demo-python-react`

### Paso 2: Configurar el Servicio

Completa los campos con los siguientes valores:

- **Name**: `stack-demo-backend` (o el nombre que prefieras)
- **Region**: Selecciona la más cercana a tu ubicación
- **Branch**: `main`
- **Root Directory**: `backend`
- **Runtime**: `Python 3`
- **Build Command**: `pip install -r requirements.txt`
- **Start Command**: `gunicorn app:app`

### Paso 3: Variables de Entorno

Por ahora, puedes dejar las variables de entorno por defecto:

- Click en **"Advanced"** (opcional)
- Puedes agregar (opcional):
  - `PYTHON_VERSION`: `3.11.0`

**Nota**: Más adelante (después de desplegar el frontend) regresaremos para agregar `FRONTEND_URL` para configurar CORS.

### Paso 4: Plan

- Selecciona el plan **Free** (suficiente para demos)
- Click en **"Create Web Service"**

### Paso 5: Esperar el Deploy

- Render comenzará a construir y desplegar tu aplicación
- El proceso toma 2-5 minutos
- Una vez completado, obtendrás una URL como: `https://stack-demo-backend.onrender.com`

### Paso 6: Verificar

Abre tu navegador y visita:
```
https://tu-backend.onrender.com/api/health
```

Deberías ver una respuesta JSON con `"status": "healthy"`.

### ⚠️ Nota sobre el Plan Free de Render

El plan gratuito tiene estas características:
- Se "duerme" después de 15 minutos de inactividad
- Se reactiva automáticamente al recibir una petición (toma ~30 segundos)
- 750 horas gratuitas por mes

---

## ⚛️ Parte 2: Desplegar Frontend en Vercel

### Paso 1: Importar Proyecto en Vercel

1. Inicia sesión en [Vercel](https://vercel.com)
2. Click en **"Add New..."** → **"Project"**
3. Importa tu repositorio de GitHub `stack-demo-python-react`

### Paso 2: Configurar el Proyecto

Completa la configuración:

- **Framework Preset**: `Vite` (debería detectarse automáticamente)
- **Root Directory**: Click en **"Edit"** → Selecciona `frontend`
- **Build Command**: `npm run build` (debería estar preconfigurado)
- **Output Directory**: `dist` (debería estar preconfigurado)
- **Install Command**: `npm install`

### Paso 3: Variables de Entorno

**MUY IMPORTANTE**: Configura la URL de tu backend.

1. En la sección **"Environment Variables"**
2. Agregar:
   - **Name**: `VITE_API_URL`
   - **Value**: `https://tu-backend.onrender.com` (reemplaza con tu URL de Render)
   - **Environments**: Marca `Production`, `Preview`, y `Development`

### Paso 4: Deploy

- Click en **"Deploy"**
- Vercel construirá y desplegará tu aplicación
- El proceso toma 1-3 minutos
- Obtendrás una URL como: `https://stack-demo-python-react.vercel.app`

### Paso 5: Configurar CORS en Backend

**IMPORTANTE**: Ahora que tienes tu URL de Vercel, debes actualizar la configuración del backend en Render.

1. Ve a tu servicio backend en el [Dashboard de Render](https://dashboard.render.com)
2. Ve a la sección **"Environment"** en el menú lateral
3. Click en **"Add Environment Variable"**
4. Agrega la siguiente variable:
   - **Key**: `FRONTEND_URL`
   - **Value**: Tu URL completa de Vercel (ejemplo: `https://tu-proyecto.vercel.app`)
5. Click en **"Save Changes"**

Render re-desplegará automáticamente el backend con la nueva configuración de CORS que permitirá las peticiones desde tu frontend en Vercel.

### Paso 6: Verificar

Abre tu URL de Vercel. Deberías ver:
- ✓ "Backend: Conectado" en verde
- La lista de TODOs precargados
- Poder agregar, marcar y eliminar tareas

---

## 🌿 Parte 3: Configurar Estrategia de Branches

### Crear Branch de Desarrollo

```bash
# Crear y cambiar a branch develop
git checkout -b develop

# Subir a GitHub
git push -u origin develop
```

### Configurar Deploy desde Branch Main

#### En Render:

1. Ve a tu servicio en Render
2. **Settings** → **Build & Deploy**
3. **Branch**: Asegúrate que esté en `main`
4. **Auto-Deploy**: `Yes`

Ahora Render solo desplegará cuando hagas push a `main`.

#### En Vercel:

1. Ve a tu proyecto en Vercel
2. **Settings** → **Git**
3. **Production Branch**: Asegúrate que sea `main`
4. ✅ **Automatic Deployments**: Habilitado solo para `main`

**Preview Deployments** (opcional pero recomendado):
- Vercel crea URLs de preview para cada branch/PR automáticamente
- Útil para probar cambios antes de mergear a `main`

### Workflow de Desarrollo

```bash
# 1. Trabajar en develop
git checkout develop
# ... hacer cambios ...
git add .
git commit -m "feat: nueva característica"
git push origin develop

# 2. Cuando esté listo para producción
git checkout main
git merge develop
git push origin main  # ← Esto dispara el deploy automático

# 3. Volver a develop
git checkout develop
```

---

## 🔄 Actualizaciones Futuras

### Actualizar Backend

```bash
git checkout develop
# ... editar archivos en backend/ ...
git add backend/
git commit -m "fix: corregir bug en API"
git push origin develop

# Cuando esté probado y listo:
git checkout main
git merge develop
git push origin main  # Deploy automático en Render
```

### Actualizar Frontend

```bash
git checkout develop
# ... editar archivos en frontend/ ...
git add frontend/
git commit -m "style: mejorar UI"
git push origin develop

# Cuando esté listo:
git checkout main
git merge develop
git push origin main  # Deploy automático en Vercel
```

### Actualizar Ambos

```bash
git checkout develop
# ... editar backend/ y frontend/ ...
git add .
git commit -m "feat: agregar autenticación"
git push origin develop

# Deploy a producción:
git checkout main
git merge develop
git push origin main  # Ambos se despliegan automáticamente
```

---

## 🎯 Resumen de URLs

Después del deploy completo, tendrás:

| Servicio | URL | Propósito |
|----------|-----|-----------|
| Backend (Render) | `https://tu-backend.onrender.com` | API REST |
| Frontend (Vercel) | `https://tu-app.vercel.app` | Aplicación web |
| Backend Local | `http://localhost:5000` | Desarrollo |
| Frontend Local | `http://localhost:5173` | Desarrollo |

---

## ✅ Checklist de Deployment

### Backend en Render
- [ ] Servicio creado con `Root Directory: backend`
- [ ] Branch configurado a `main`
- [ ] Build command: `pip install -r requirements.txt`
- [ ] Start command: `gunicorn app:app`
- [ ] Deploy exitoso
- [ ] `/api/health` responde correctamente

### Frontend en Vercel
- [ ] Proyecto importado con `Root Directory: frontend`
- [ ] Variable `VITE_API_URL` configurada
- [ ] Deploy exitoso
- [ ] Aplicación abre correctamente
- [ ] Backend conectado (indicador verde)

### CORS Configurado
- [ ] URL de Vercel agregada a CORS en `backend/app.py`
- [ ] Re-deployment de backend completado
- [ ] Frontend puede comunicarse con backend

### Git Workflow
- [ ] Branch `develop` creado
- [ ] Branch `main` como producción
- [ ] Auto-deploy configurado en ambos servicios

---

## 🆘 Troubleshooting

### Backend no responde en Render
1. Verifica los logs en Render Dashboard
2. Asegúrate que `requirements.txt` tenga todas las dependencias
3. Verifica que el Start Command sea `gunicorn app:app`

### Frontend no conecta con Backend
1. Verifica que `VITE_API_URL` esté configurado en Vercel
2. Revisa la consola del navegador (F12) para ver errores CORS
3. Asegúrate que la URL del backend en Vercel sea correcta

### Error de CORS
1. Verifica que el dominio de Vercel esté en `app.py` línea ~11
2. Haz commit y push para que Render re-despliegue
3. Espera 2-3 minutos para que el cambio se aplique

### Deploy no se dispara automáticamente
1. Verifica que estés haciendo push a `main`
2. Revisa la configuración de auto-deploy en Render/Vercel
3. Intenta hacer un re-deploy manual desde el dashboard

---

## 🎓 Próximos Pasos

Ahora que tienes todo funcionando, puedes:

1. **Agregar base de datos**: PostgreSQL en Render (gratis)
2. **Agregar autenticación**: JWT o Auth0
3. **Agregar tests**: pytest para backend, Vitest para frontend
4. **CI/CD avanzado**: GitHub Actions para tests automáticos
5. **Monitoreo**: Configurar alertas en Render/Vercel
6. **Dominio customizado**: Conectar tu propio dominio

¡Felicidades! Tu stack Python + React está completamente desplegado 🎉
