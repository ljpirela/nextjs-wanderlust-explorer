# Wanderlust Explorer

Aplicación interactiva multipágina construida con **Next.js (App Router)**, **React**, **TypeScript** y **Tailwind CSS** para descubrir, buscar, filtrar y guardar experiencias alrededor del mundo.

## Funcionalidades principales

- **5 rutas con navegación del lado del cliente:**
  - `/` — Portada con sección hero, accesos rápidos por categoría y destinos destacados.
  - `/experiences` — Explorador con 100 experiencias locales, barra de búsqueda y filtros combinables.
  - `/experiences/[id]` — Vista de detalle dinámica por ID con actualización de `document.title` mediante `useEffect`.
  - `/favorites` — Listado de experiencias guardadas como favoritas.
  - `/profile` — Perfil simulado con resumen y contador de favoritos y destinos guardados.
- **Búsqueda y filtros sincronizados en la URL:** Uso de `useSearchParams` y `usePathname` para compartir enlaces prefiltrados como `/experiences?search=vela&category=adventure&destination=Croatia` y prerrellenar los inputs automáticamente al cargar.
- **Búsqueda por expresión regular:** Filtrado *case-insensitive* por título (`new RegExp(term, "i")`) combinable de forma independiente con categoría y destino.
- **Estado nativo de React:** Gestión de favoritos únicamente con `useState` (sin librerías externas de estado), propagado hacia los componentes de tarjeta mediante props.
- **Arquitectura modular:** Separación clara por responsabilidades en `src/app`, `src/components`, `src/hooks`, `src/lib`, `src/types` y `src/data`.

## Design References

Antes de construir los componentes, se analizaron dos plataformas reales de descubrimiento de actividades para estructurar la jerarquía visual, el sistema de tarjetas y el flujo de búsqueda, adaptándolos a una estética minimalista en **modo oscuro**:

1. **Airbnb Experiences** — [https://www.airbnb.com/s/experiences](https://www.airbnb.com/s/experiences)
   - **Qué se tomó como referencia:** Cuadrícula limpia de tarjetas con relación de aspecto uniforme, botón flotante de corazón en la esquina superior derecha de cada imagen, badge de categoría en la esquina superior izquierda, calificación con estrella y precio claro por participante.
2. **GetYourGuide** — [https://www.getyourguide.com](https://www.getyourguide.com)
   - **Qué se tomó como referencia:** Sección hero centrada con mensaje directo («Experiencias por las que vale la pena viajar»), barra de búsqueda redondeada protagonista y tarjetas visuales de destinos destacados para aterrizar en vistas prefiltradas.

## Estructura del proyecto

```text
src/
├── app/
│   ├── experiences/
│   │   ├── [id]/page.tsx
│   │   └── page.tsx
│   ├── favorites/page.tsx
│   ├── profile/page.tsx
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── ExperienceCard.tsx
│   ├── ExperienceDetail.tsx
│   ├── ExperiencesExplorer.tsx
│   ├── FavoritesProvider.tsx
│   ├── FilterBar.tsx
│   ├── Navbar.tsx
│   ├── SearchBar.tsx
│   └── SectionWrapper.tsx
├── data/
│   └── experiences.ts
├── hooks/
│   ├── useExperiences.ts
│   └── useFavorites.ts
├── lib/
│   ├── escapeRegExp.ts
│   └── formatPrice.ts
└── types/
    └── Experience.ts