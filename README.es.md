# Blog de Los Simpsons 🍩

Aplicación web para explorar personajes, episodios y ubicaciones del universo de Los Simpsons.

## 🚀 Inicio Rápido

```bash
# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev
```

La aplicación estará disponible en `http://localhost:3000/`

---

## 📁 Estructura del Proyecto

```
src/
├── components/          # Componentes reutilizables
│   ├── Navbar.jsx       # Navegación con búsqueda, favoritos y likes
│   └── CharacterCard.jsx # Tarjeta de personaje
├── pages/               # Páginas de la aplicación
│   ├── Home.jsx         # Lista de personajes
│   ├── Single.jsx       # Detalle de personaje
│   ├── Episodes.jsx     # Lista de episodios
│   ├── Locations.jsx    # Lista de ubicaciones
│   └── Layout.jsx       # Layout principal
├── services/            # Servicios de API
│   └── simpsonsServices.js
├── hooks/               # Hooks personalizados
│   └── useGlobalReducer.jsx
├── store.js             # Estado global
└── routes.jsx           # Configuración de rutas
```

---

## 🗂️ Estado Global (Store)

El estado centralizado se gestiona con `useReducer` + Context API.

### Propiedades del Store

| Propiedad     | Tipo   | Descripción                        |
| ------------- | ------ | ---------------------------------- |
| `characters`  | Array  | Lista de personajes cargados       |
| `episodes`    | Array  | Lista de episodios                 |
| `locations`   | Array  | Lista de ubicaciones               |
| `favorites`   | Array  | Personajes marcados como favoritos |
| `likes`       | Array  | Personajes con "me gusta"          |
| `searchQuery` | String | Texto actual del campo de búsqueda |

### Acciones Disponibles

| Acción            | Payload      | Descripción                           |
| ----------------- | ------------ | ------------------------------------- |
| `set_characters`  | `Array`      | Establece lista de personajes         |
| `set_episodes`    | `Array`      | Establece lista de episodios          |
| `set_locations`   | `Array`      | Establece lista de ubicaciones        |
| `add_favorite`    | `{id, name}` | Añade personaje a favoritos           |
| `remove_favorite` | `{id}`       | Elimina personaje de favoritos        |
| `toggle_like`     | `{id, name}` | Añade/quita "me gusta" a un personaje |
| `remove_like`     | `{id}`       | Elimina "me gusta" de un personaje    |
| `set_search`      | `String`     | Actualiza texto de búsqueda           |

### Ejemplo de Uso

```jsx
import useGlobalReducer from "../hooks/useGlobalReducer";

const MiComponente = () => {
  const { store, dispatch } = useGlobalReducer();

  const agregarFavorito = (personaje) => {
    dispatch({
      type: "add_favorite",
      payload: { id: personaje.id, name: personaje.character },
    });
  };

  return <div>{store.characters.length} personajes cargados</div>;
};
```

---

## 🔍 Barra de Búsqueda

La Navbar incluye una barra de búsqueda con sugerencias en tiempo real.

### Funcionamiento

1. El usuario escribe en el input
2. Se dispara `set_search` actualizando `searchQuery` en el store
3. Se filtran los personajes que coincidan (máximo 5 sugerencias)
4. Al hacer clic en una sugerencia, navega al detalle y limpia la búsqueda

### Lógica de Filtrado

```jsx
const suggestions =
  searchQuery.length > 0
    ? characters
        .filter((c) =>
          c.character.toLowerCase().startsWith(searchQuery.toLowerCase())
        )
        .slice(0, 5)
    : [];
```

---

## 🌐 API

Se consume la API de Los Simpsons: `https://thesimpsonsapi.com/api`

### Servicios (`simpsonsServices.js`)

| Función         | Endpoint               | Retorna              |
| --------------- | ---------------------- | -------------------- |
| `getCharacters` | `/characters?limit=50` | Array de personajes  |
| `getEpisodes`   | `/episodes?limit=50`   | Array de episodios   |
| `getLocations`  | `/locations?limit=50`  | Array de ubicaciones |

### Imágenes CDN

```
Personajes: https://cdn.thesimpsonsapi.com/500/character/{id}.webp
Episodios:  https://cdn.thesimpsonsapi.com/200/episode/{id}.webp
Ubicaciones: https://cdn.thesimpsonsapi.com/500/location/{id}.webp
```

---

## 🛣️ Rutas

| Ruta                | Componente  | Descripción          |
| ------------------- | ----------- | -------------------- |
| `/`                 | `Home`      | Lista de personajes  |
| `/character/:theId` | `Single`    | Detalle de personaje |
| `/episodes`         | `Episodes`  | Lista de episodios   |
| `/locations`        | `Locations` | Lista de ubicaciones |

---

## 🚀 Despliegue en Vercel

```bash
# Instalar Vercel CLI e iniciar sesión
npm i vercel -g && vercel login

# Desplegar a producción
vercel --prod
```

---

## 🛠️ Tecnologías

- React 18
- React Router DOM 6
- Vite 4
- Bootstrap 5
- Font Awesome
