# Nuna Online

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-ES2023-F7DF1E?style=for-the-badge&logo=javascript&logoColor=1a1a1a)
![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-CDN-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-2ea44f?style=for-the-badge)

Plataforma web multipágina para e-commerce de productos andinos sostenibles.
Construida con **HTML5 + CSS3 + JavaScript modular (ES Modules)**, enfocada en una base limpia, escalable y mantenible.

---

## Tabla de contenidos

1. [Características clave](#características-clave)
2. [Arquitectura y stack](#arquitectura-y-stack)
3. [Rutas del sitio](#rutas-del-sitio)
4. [Comenzar](#comenzar)
5. [Scripts y ejecución local](#scripts-y-ejecución-local)
6. [Estructura del proyecto](#estructura-del-proyecto)
7. [Buenas prácticas implementadas](#buenas-prácticas-implementadas)
8. [Checklist de calidad](#checklist-de-calidad)
9. [Contribución](#contribución)
10. [Licencia](#licencia)

---

## Características clave

- Arquitectura **multipágina real**: Home, Catálogo, Carrito, Nosotros, Sostenibilidad y Contacto.
- Catálogo dinámico renderizado desde `products.js`.
- Carrito persistente con `localStorage`.
- Interacciones desacopladas por módulos (estado, utilidades, managers, componentes).
- Sistema visual consistente con diseño andino contemporáneo.
- Navegación responsive para escritorio y móvil.

## Arquitectura y stack

| Capa | Tecnologías | Responsabilidad |
| --- | --- | --- |
| Estructura | HTML5 | Páginas independientes y semánticas por sección del negocio. |
| Estilos | CSS3 + Tailwind CSS (CDN) | Sistema visual, layout, componentes y utilidades. |
| Lógica UI | JavaScript moderno (ES Modules) | Render de productos, interacción de carrito, menú móvil y notificaciones. |
| Estado | `localStorage` + `CartStore` | Persistencia del carrito entre páginas y sesiones. |
| Datos | `assets/js/data/products.js` | Fuente central de productos para catálogo y home. |

## Rutas del sitio

- `public/index.html` -> Home
- `pages/catalogo.html` -> Catálogo
- `pages/carrito.html` -> Carrito
- `pages/nosotros.html` -> Nuestra historia
- `pages/sostenibilidad.html` -> Sostenibilidad
- `pages/contacto.html` -> Contacto

## Comenzar

### Requisitos

- Navegador moderno (Chrome, Edge, Firefox, Safari)
- Node.js 18+ (opcional, para servidor local con `npx serve`)

### Instalación

```bash
git clone https://github.com/EzerZuniga/Nuna-online.git
cd Nuna-online
```

## Scripts y ejecución local

Este proyecto no requiere build step ni framework runtime.
Solo necesitas servir archivos estáticos.

### Opción 1: Node (recomendada)

```bash
npx serve .
```

### Opción 2: Python

```bash
python -m http.server 3000
```

Luego abre la URL local mostrada en consola (por ejemplo: `http://localhost:3000/public/index.html`).

## Estructura del proyecto

```text
Nuna-online/
├── public/
│   └── index.html
├── pages/
│   ├── catalogo.html
│   ├── carrito.html
│   ├── nosotros.html
│   ├── sostenibilidad.html
│   └── contacto.html
├── assets/
│   ├── css/
│   │   ├── base.css
│   │   ├── layout.css
│   │   ├── components.css
│   │   ├── utilities.css
│   │   └── main.css
│   └── js/
│       ├── app.js
│       ├── config.js
│       ├── data/
│       │   └── products.js
│       ├── state/
│       │   └── cart-store.js
│       ├── components/
│       │   └── product-card.js
│       ├── managers/
│       │   ├── mobile-menu.js
│       │   ├── notifications.js
│       │   └── scroll-ui.js
│       └── utils/
│           ├── dom.js
│           └── formatters.js
├── LICENSE
└── README.md
```

## Buenas prácticas implementadas

- Separación de responsabilidades por módulos.
- Eventos desacoplados por `data-*` y delegación.
- Configuración centralizada (`config.js`).
- Acceso seguro al DOM mediante utilidades reutilizables.
- Estado de carrito encapsulado y persistente.
- Escalabilidad preparada para nuevas páginas y componentes.

## Checklist de calidad

Antes de publicar cambios, valida:

- Navegación completa entre todas las páginas.
- Flujo de carrito (agregar, quitar, actualizar, vaciar, checkout).
- Persistencia del carrito tras recarga.
- Responsive en mobile y desktop.
- No romper rutas relativas entre `public/`, `pages/` y `assets/`.

## Contribución

1. Crea una rama desde `main` (`feature/...` o `fix/...`).
2. Mantén cambios pequeños y con responsabilidad clara.
3. Verifica funcionamiento de rutas y carrito antes de abrir PR.
4. Documenta en el PR impacto técnico y visual.

## Licencia

Este proyecto se distribuye bajo licencia **MIT**.
Consulta [LICENSE](./LICENSE) para más detalles.
