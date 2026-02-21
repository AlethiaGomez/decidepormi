# 💭 Decide por mí - Decision Maker App

Una aplicación web minimalista y moderna para tomar decisiones de forma divertida y visual. Construida con React, Vite y Tailwind CSS.

## 🌟 Características

- ✨ **Interfaz minimalista y moderna** - Diseño limpio con gradientes y animaciones suaves
- 🎯 **Gestor de opciones** - Añade, visualiza y elimina opciones fácilmente
- 🎲 **Decisión aleatoria** - Botón central "Decidir por mí" con animación de selección rápida
- 🎉 **Confeti animado** - Celebración visual con animación de confeti al seleccionar
- 📱 **Responsive** - Totalmente compatible con dispositivos móviles
- 📦 **PWA Ready** - Instalable como aplicación web progresiva en móviles y escritorios
- ⚡ **Rápido** - Construido con Vite para carga instantánea
- 🌐 **Offline Ready** - Service worker para funcionalidad offline

## 🚀 Inicio Rápido

### Requisitos
- Node.js 16+ instalado

### Instalación

1. Navega al directorio del proyecto:
```bash
cd Decidepormi
```

2. Instala las dependencias (ya completado):
```bash
npm install
```

### Desarrollo

Inicia el servidor de desarrollo:
```bash
npm run dev
```

La aplicación estará disponible en `http://localhost:5173/`

### Compilación para Producción

Crea una compilación optimizada:
```bash
npm run build
```

Usa la vista previa de la compilación:
```bash
npm run preview
```

## 📁 Estructura del Proyecto

```
Decidepormi/
├── public/
│   ├── manifest.json      # Configuración PWA
│   └── sw.js              # Service Worker
├── src/
│   ├── App.jsx            # Componente principal
│   ├── index.css          # Estilos Tailwind
│   └── main.jsx           # Punto de entrada React
├── index.html             # HTML principal
├── package.json           # Dependencias
├── vite.config.js         # Configuración Vite
├── tailwind.config.js     # Configuración Tailwind CSS
└── postcss.config.js      # Configuración PostCSS
```

## 🛠️ Tecnologías Utilizadas

- **React 18** - Librería UI
- **Vite** - Herramienta de compilación rápida
- **Tailwind CSS** - Framework CSS utilitario
- **Canvas Confetti** - Librería de animación de confeti
- **Service Workers** - Para funcionalidad PWA

## 🎨 Características de Diseño

### Componentes Principales

1. **Input de opciones** - Campo de texto para añadir nuevas opciones
2. **Lista de opciones** - Visualización limpia de todas las opciones
3. **Botón Decidir** - Botón central grande con animación
4. **Resultado** - Muestra la opción elegida con transición suave

### Animaciones

- Pulsación suave en el botón principal
- Transición rápida en la selección de opciones
- Animación de confeti en la celebración
- Bounce infinito en el resultado final

## 📱 PWA - Progressive Web App

Esta aplicación es totalmente compatible con PWA:

- **Instalable** - Añade el acceso directo a tu pantalla de inicio
- **Offline** - Service worker cachea recursos para usar offline
- **Responsive** - Se adapta a cualquier tamaño de pantalla
- **App-like** - Se ejecuta como una aplicación nativa

### Instalar en móvil/escritorio

1. Abre la aplicación en tu navegador
2. Busca el icono "Instalar" o "Añadir a pantalla de inicio"
3. ¡Disfruta de tu app!

## 🎯 Cómo Usar

1. **Añade opciones** - Escribe una opción y presiona Enter o haz clic en el botón +
2. **Visualiza** - Todas tus opciones aparecen en una lista limpia
3. **Decide** - Haz clic en "Decidir por mí"
4. **Celebra** - ¡Confeti y tu decisión elegida!
5. **Modifica** - Elimina opciones haciendo clic en la X

## 🔧 Configuración Personalizada

### Cambiar colores

Edita `tailwind.config.js` para personalizar los colores:

```javascript
theme: {
  extend: {
    colors: {
      primary: '#tu-color',
    }
  }
}
```

### Ajustar animaciones

Modifica las clases Tailwind en `src/index.css` para cambiar duraciones y efectos.

## 📄 Licencia

Este proyecto es de código abierto y está disponible bajo la Licencia MIT.

## 👨‍💻 Desarrollo

El proyecto está completamente configurado para desarrollo rápido:

- **HMR (Hot Module Replacement)** - Cambios instantáneos en tiempo real
- **ESLint** - Linting automático de código
- **Fast Refresh** - Actualización rápida sin perder estado

## 🐛 Troubleshooting

### El servidor no inicia
```bash
# Limpia node_modules e instala nuevamente
rm -rf node_modules package-lock.json
npm install
npm run dev
```

### Errores de Tailwind
```bash
# Reconstruye el cache de Tailwind
npm run build
```

### PWA no funciona offline
Verifica que el navegador sea compatible con Service Workers. Algunos navegadores requieren HTTPS.

---

¡Diviértete tomando decisiones! 🎯✨
