# CRUD Frontend con Next.js y HeroUI

Este es un **frontend CRUD** construido con **Next.js 15**, **HeroUI**, **TailwindCSS**, y **TypeScript**.

## 🚀 Instalación

### 1️⃣ Clonar el repositorio
```bash
git clone <URL_DEL_REPO>
cd my-app
```

### 2️⃣ Instalar dependencias
```bash
npm install
```

### 🛠️ Configuración
Si el backend requiere un API_URL, puedes crear un archivo `.env.local` en la raíz con la URL del backend:

```env
NEXT_PUBLIC_API_URL=http://localhost:3001
```

### 🚀 Ejecutar el servidor

#### En desarrollo
```bash
npm run dev
```
Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

#### En producción
```bash
npm run build
npm run start
```

## 📂 Estructura del Proyecto
```plaintext
my-app/
│── public/        # Archivos estáticos
│── app/
│   ├── actions/    # Para las peticiones REST
│   ├── product/    # Rutas de la app (CRUD)
│   ├── error.tsx   # Manejo de errores 
│   ├── not-found.tsx     # Para 404 error
|── components/     # Manejo de componentes
│── .eslintrc.js    # Configuración de ESLint
│── tailwind.config.js # Configuración de Tailwind CSS
│── tsconfig.json   # Configuración de TypeScript
│── package.json    # Dependencias y scripts
│── README.md       # Documentación del proyecto
```

## 🔧 Comandos Útiles

| Comando         | Descripción                                    |
|----------------|--------------------------------|
| `npm run dev`  | Inicia el servidor en modo desarrollo |
| `npm run build` | Compila la aplicación para producción |
| `npm run start` | Inicia la aplicación en producción |
| `npm run lint`  | Ejecuta ESLint para corregir errores de código |
| `npm run format` | Formatea el código con Prettier |
