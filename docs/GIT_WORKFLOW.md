# 🌿 Git Workflow

Estrategia de trabajo con Git para desarrollo y deployment.

## 📊 Estructura de Branches

```
main (producción)
  ├── Se despliega automáticamente en Render + Vercel
  ├── Solo recibe merges desde develop
  └── Código estable y probado

develop (desarrollo)
  ├── Branch principal de desarrollo
  ├── Se pueden hacer commits directos
  ├── Se pueden crear feature branches desde aquí
  └── Se mergea a main cuando está listo para producción

feature/* (opcional)
  ├── Branches específicos para features
  ├── Se crean desde develop
  └── Se mergean de vuelta a develop
```

## 🔄 Flujo de Trabajo Diario

### 1. Comenzar a Trabajar

```bash
# Asegúrate de estar en develop
git checkout develop

# Actualiza con los últimos cambios
git pull origin develop
```

### 2. Desarrollar Features

#### Opción A: Trabajar directo en develop (proyectos pequeños)

```bash
# Ya estás en develop
git checkout develop

# Hacer cambios en el código...

# Commit de cambios
git add .
git commit -m "feat: descripción del cambio"

# Subir a GitHub
git push origin develop
```

#### Opción B: Crear feature branch (proyectos más grandes)

```bash
# Crear feature branch desde develop
git checkout develop
git checkout -b feature/nombre-descriptivo

# Hacer cambios...

# Commit
git add .
git commit -m "feat: implementar feature X"

# Subir feature branch
git push -u origin feature/nombre-descriptivo

# Cuando esté listo, mergear a develop
git checkout develop
git merge feature/nombre-descriptivo
git push origin develop

# (Opcional) Eliminar feature branch
git branch -d feature/nombre-descriptivo
git push origin --delete feature/nombre-descriptivo
```

### 3. Desplegar a Producción

```bash
# Cuando develop esté probado y listo
git checkout main
git pull origin main  # Sincronizar

# Mergear develop a main
git merge develop

# Verificar que todo está bien
git log --oneline -5

# Desplegar (push a main)
git push origin main

# ⚡ Esto dispara:
# - Deploy automático en Render (backend)
# - Deploy automático en Vercel (frontend)

# Volver a develop
git checkout develop
```

## 📝 Convenciones de Commits

Usa prefijos descriptivos para tus commits:

```bash
git commit -m "feat: agregar endpoint de usuarios"      # Nueva feature
git commit -m "fix: corregir bug en login"              # Corrección
git commit -m "style: mejorar estilos del header"       # Estilos/UI
git commit -m "refactor: reorganizar componentes"       # Refactorización
git commit -m "docs: actualizar README"                 # Documentación
git commit -m "test: agregar tests unitarios"           # Tests
git commit -m "chore: actualizar dependencias"          # Mantenimiento
```

## 🚨 Situaciones Comunes

### Commitear cambio que NO está listo para producción

```bash
# Trabajar en develop
git checkout develop
git add .
git commit -m "WIP: experimentando con nueva API"
git push origin develop

# Este cambio NO va a producción hasta que lo mergees a main
```

### Necesitas hotfix urgente en producción

```bash
# Opción 1: Fix rápido directo en main (no recomendado pero rápido)
git checkout main
# ... hacer el fix ...
git add .
git commit -m "fix: hotfix crítico"
git push origin main  # Deploy inmediato

# Sincronizar develop con el fix
git checkout develop
git merge main

# Opción 2: Fix en develop y deploy (recomendado)
git checkout develop
# ... hacer el fix ...
git add .
git commit -m "fix: corregir bug crítico"
git push origin develop

# Deploy inmediato
git checkout main
git merge develop
git push origin main
```

### Deshacer cambios antes de commit

```bash
# Ver cambios
git status

# Deshacer cambios en un archivo específico
git checkout -- archivo.js

# Deshacer todos los cambios no commiteados
git reset --hard HEAD
```

### Deshacer último commit (no pusheado)

```bash
# Deshacer commit pero mantener cambios
git reset --soft HEAD~1

# Deshacer commit y cambios
git reset --hard HEAD~1
```

### Ver diferencias antes de commit

```bash
# Ver cambios en working directory
git diff

# Ver cambios staged
git diff --staged

# Ver cambios en un archivo específico
git diff archivo.js
```

## 🎯 Comandos Útiles

### Estado del Repositorio

```bash
# Ver estado actual
git status

# Ver historial de commits
git log --oneline -10

# Ver branches
git branch -a

# Ver branch actual
git branch --show-current
```

### Sincronización

```bash
# Traer cambios de GitHub sin mergear
git fetch origin

# Traer y mergear cambios
git pull origin develop

# Ver diferencias con remoto
git diff origin/develop
```

### Limpieza

```bash
# Ver branches locales
git branch

# Eliminar branch local
git branch -d nombre-branch

# Eliminar branch remoto
git push origin --delete nombre-branch

# Ver branches remotos que ya no existen
git remote prune origin --dry-run

# Eliminar references a branches remotos eliminados
git remote prune origin
```

## ⚙️ Configuración Recomendada

### Configurar Git

```bash
# Tu información
git config --global user.name "Tu Nombre"
git config --global user.email "tu@email.com"

# Editor por defecto
git config --global core.editor "code --wait"

# Alias útiles
git config --global alias.st status
git config --global alias.co checkout
git config --global alias.br branch
git config --global alias.cm commit
git config --global alias.lg "log --oneline --graph --all"
```

### Archivo .gitignore

Ya está configurado, pero puedes revisarlo:

```bash
cat .gitignore
```

## 🔒 Protección de Main (Configuración en GitHub)

Para equipos más grandes, considera configurar en GitHub:

1. Ve a tu repo → **Settings** → **Branches**
2. Click en **Add rule**
3. Branch name pattern: `main`
4. Configurar:
   - ✅ Require pull request reviews before merging
   - ✅ Require status checks to pass
   - ✅ Include administrators (opcional)

Esto obliga a hacer Pull Requests en vez de pushes directos a `main`.

## 📊 Workflow Visual

```
Local                    GitHub                  Deploy

develop                  develop                 
  ├─ commit 1              ├─ push               
  ├─ commit 2              │                     
  └─ commit 3              │                     
      │                    │                     
      └─ merge to main     └─ push               
           │                   │                 
         main               main ────► Render + Vercel
```

## 🎓 Mejores Prácticas

1. **Commits frecuentes**: Commitea cambios pequeños y frecuentes en develop
2. **Mensajes descriptivos**: Usa el formato `tipo: descripción`
3. **Pull antes de push**: Siempre `git pull` antes de `git push`
4. **Develop estable**: Mantén develop funcional, usa feature branches para experimentos
5. **Main sagrado**: Solo mergea a main código probado y funcional
6. **Sync regular**: Mergea develop a main regularmente (diario o semanal)

## 🆘 Ayuda

Si algo sale mal:

```bash
# Ver el estado
git status

# Ver qué branch estás
git branch --show-current

# Si te perdiste, volver a estado limpio
git checkout develop
git reset --hard origin/develop

# Pedir ayuda
git help <comando>
```

---

¡Recuerda! `develop` para desarrollo, `main` para producción 🚀
