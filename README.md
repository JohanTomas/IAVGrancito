# Valle Grancito - IA Chatbot

Una aplicación de chatbot inteligente construida con Angular 17, diseñada para ser completamente responsiva y adaptarse a cualquier dispositivo.

## 🚀 Características

### Funcionalidades Principales
- **Chat con IA**: Interfaz de chat intuitiva con respuestas inteligentes
- **Sistema de Autenticación**: Login y registro de usuarios
- **Gestión de Chats**: Crear, eliminar y gestionar conversaciones
- **Perfil de Usuario**: Editar información personal y avatar
- **Interfaz Moderna**: Diseño inspirado en ChatGPT con tema oscuro

## 🎨 Diseño Responsivo

### Características Principales
- **Móvil First**: Optimizado para dispositivos móviles
- **Sidebar Adaptativo**: Menú lateral que se oculta en móvil con botón hamburguesa
- **Grid Responsivo**: Tarjetas de ayuda que se adaptan al tamaño de pantalla
- **Tipografía Escalable**: Textos que se ajustan automáticamente
- **Botones Táctiles**: Tamaños optimizados para interacción táctil
- **Navegación Intuitiva**: Menús desplegables adaptados para móvil
- **100% Tailwind CSS**: Sin CSS personalizado, solo utilidades de Tailwind

### 📱 Breakpoints Implementados
- **Móvil**: < 640px (sm)
- **Tablet**: 640px - 1024px (md, lg)
- **Desktop**: > 1024px (xl, 2xl)

### 🎯 Clases Responsivas Utilizadas

#### Tipografía Responsiva
```html
<!-- Texto que escala automáticamente -->
<h1 class="text-xl sm:text-2xl lg:text-3xl xl:text-4xl">Título</h1>
<p class="text-sm sm:text-base lg:text-lg">Párrafo</p>
```

#### Espaciado Responsivo
```html
<!-- Padding y márgenes que se ajustan -->
<div class="p-3 sm:p-4 lg:p-6">Contenido</div>
<div class="space-y-4 sm:space-y-6 lg:space-y-8">Elementos</div>
```

#### Layout Responsivo
```html
<!-- Grid que cambia de columnas -->
<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
  <!-- Tarjetas -->
</div>

<!-- Flexbox adaptativo -->
<div class="flex flex-col lg:flex-row">
  <!-- Contenido -->
</div>
```

#### Componentes Responsivos
```html
<!-- Botones que cambian de tamaño -->
<button class="px-2 sm:px-3 lg:px-4 py-1 sm:py-1.5 lg:py-2">
  Acción
</button>

<!-- Inputs adaptativos -->
<input class="w-full px-3 sm:px-4 lg:px-6 py-2 sm:py-2.5 lg:py-3">
```

## 🎨 Componentes Responsivos

### ChatbotComponent
- **Sidebar móvil**: `lg:hidden` para botón hamburguesa, `lg:relative` para desktop
- **Navegación adaptativa**: Menús que cambian de tamaño según pantalla
- **Área de chat**: Contenedores que se expanden en pantallas grandes
- **Tarjetas de ayuda**: Grid de 1 columna en móvil, 4 en desktop

### LoginComponent
- **Formularios centrados**: `max-w-sm sm:max-w-md lg:max-w-lg`
- **Inputs escalables**: Padding y texto que crecen con la pantalla
- **Botones táctiles**: Tamaños mínimos para interacción móvil
- **Espaciado progresivo**: `space-y-4 sm:space-y-6 lg:space-y-8`

### ProfileComponent
- **Avatar responsivo**: `w-20 h-20 sm:w-24 sm:h-24 lg:w-32 lg:h-32`
- **Campos adaptativos**: Labels y inputs que escalan
- **Botones de acción**: Tamaños táctiles con focus rings
- **Layout centrado**: Contenedor que se ajusta al contenido

### ChatViewComponent
- **Contenedor escalable**: `max-h-80 sm:max-h-96 lg:max-h-[32rem]`
- **Texto responsivo**: Tamaños que crecen con la pantalla
- **Botones de acción**: Espaciado y tamaños adaptativos
- **Scroll suave**: Optimizado para dispositivos táctiles

## 🔧 Configuración de Tailwind

El proyecto utiliza **únicamente** Tailwind CSS para la responsividad:

```javascript
// tailwind.config.js
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        primary: { /* colores personalizados */ }
      },
      fontSize: { /* tamaños de fuente personalizados */ },
      borderRadius: { /* bordes redondeados personalizados */ }
    }
  },
  plugins: [],
  important: "#webcrumbs"
}
```

### Clases Responsivas Principales

#### Breakpoints
- `sm:` - 640px y superior
- `md:` - 768px y superior  
- `lg:` - 1024px y superior
- `xl:` - 1280px y superior
- `2xl:` - 1536px y superior

#### Patrones Comunes
```html
<!-- Contenedor responsivo -->
<div class="max-w-sm sm:max-w-md lg:max-w-lg xl:max-w-xl">

<!-- Espaciado progresivo -->
<div class="p-3 sm:p-4 lg:p-6 xl:p-8">

<!-- Tipografía escalable -->
<h1 class="text-xl sm:text-2xl lg:text-3xl xl:text-4xl">

<!-- Grid adaptativo -->
<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

<!-- Flexbox responsivo -->
<div class="flex flex-col lg:flex-row">

<!-- Visibilidad condicional -->
<button class="lg:hidden">Menú móvil</button>
<div class="hidden lg:block">Contenido desktop</div>
```

## 📱 Optimizaciones Móviles

### Performance
- **Lazy Loading**: Carga diferida de componentes
- **Optimización de Imágenes**: Avatares y logos optimizados
- **Scroll Suave**: `-webkit-overflow-scrolling: touch`

### Accesibilidad
- **Focus Visible**: Contornos de foco claros con `focus:ring-2`
- **Tamaños Mínimos**: Botones de 44px mínimo para táctil
- **Contraste**: Colores con buen contraste
- **Screen Reader**: Textos alternativos para iconos

### UX/UI
- **Feedback Táctil**: Estados activos en dispositivos táctiles
- **Gestos**: Swipe para cerrar sidebar (futuro)
- **Notificaciones**: SweetAlert2 para confirmaciones
- **Loading States**: Indicadores de carga

### Ventajas de Usar Solo Tailwind CSS

#### ✅ **Consistencia**
- Todas las clases siguen el mismo sistema de diseño
- No hay conflictos entre CSS personalizado y utilidades
- Mantenimiento más fácil

#### ✅ **Performance**
- CSS optimizado y purgado automáticamente
- Sin reglas CSS duplicadas o innecesarias
- Tamaño de bundle reducido

#### ✅ **Desarrollo Rápido**
- Clases predefinidas para todos los casos de uso
- No necesidad de escribir CSS personalizado
- Prototipado más rápido

#### ✅ **Responsividad Nativa**
- Breakpoints consistentes en toda la aplicación
- Clases responsivas integradas
- Menos código para mantener

#### ✅ **Mantenibilidad**
- Un solo sistema de diseño
- Fácil de entender para nuevos desarrolladores
- Refactoring más sencillo

## 🛠️ Tecnologías Utilizadas

- **Angular 17**: Framework principal
- **Tailwind CSS**: Framework de estilos con clases responsivas
- **TypeScript**: Lenguaje de programación
- **Material Symbols**: Iconografía
- **Bootstrap Icons**: Iconos adicionales
- **SweetAlert2**: Notificaciones y confirmaciones

## 📦 Instalación

1. **Clonar el repositorio**
```bash
git clone <url-del-repositorio>
cd IACBCLlamma
```

2. **Instalar dependencias**
```bash
npm install
```

3. **Ejecutar en modo desarrollo**
```bash
npm start
```

4. **Abrir en el navegador**
```
http://localhost:4200
```

## 🎯 Características de Responsividad

### Sidebar Móvil
- **Botón Hamburguesa**: Acceso al menú lateral en dispositivos móviles
- **Overlay**: Fondo oscuro que se puede tocar para cerrar el sidebar
- **Animaciones Suaves**: Transiciones fluidas al abrir/cerrar
- **Cierre Automático**: Se cierra al seleccionar un chat o cambiar el tamaño de ventana

### Formularios Adaptativos
- **Inputs Optimizados**: Tamaño de fuente de 16px para evitar zoom en iOS
- **Espaciado Responsivo**: Padding y márgenes que se ajustan al dispositivo
- **Botones Táctiles**: Tamaño mínimo de 44px para facilitar la interacción

### Grid y Layout
- **Flexbox Responsivo**: Layouts que se adaptan automáticamente
- **Grid Adaptativo**: Tarjetas que cambian de columnas según el ancho
- **Contenedores Fluidos**: Anchos máximos que se ajustan al contenido

### Tipografía y Espaciado
- **Clases Responsivas**: `text-sm sm:text-base`, `p-3 lg:p-4`
- **Escalado Automático**: Tamaños de fuente que crecen con la pantalla
- **Espaciado Consistente**: Márgenes y padding proporcionales

## 🎯 Próximas Mejoras

- [ ] **PWA**: Aplicación web progresiva
- [ ] **Modo Offline**: Funcionalidad sin conexión
- [ ] **Gestos**: Swipe para navegación
- [ ] **Tema Claro/Oscuro**: Toggle de tema
- [ ] **Notificaciones Push**: Alertas en tiempo real
- [ ] **Voz**: Comandos de voz
- [ ] **Accesibilidad Avanzada**: Soporte completo para lectores de pantalla

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE.md](LICENSE.md) para detalles.

## 👥 Autores

- **Valle Grancito** - *Desarrollo inicial* - [GitHub](https://github.com/vallegrancito)

## 🙏 Agradecimientos

- Angular Team por el framework
- Tailwind CSS por el sistema de diseño
- Material Design por la iconografía
- Comunidad de desarrolladores por las librerías utilizadas
