export const initialStore=()=>{
  return{
    message: null,
    characters: [],
    episodes: [],
    locations: [],
    favorites: [], 
    likes: []      
  }
}

export default function storeReducer(store, action = {}) {
  switch(action.type){
    case 'set_characters':
      return {
        ...store,
        characters: action.payload
      };
    case 'set_episodes':
      return {
        ...store,
        episodes: action.payload
      };
    case 'set_locations':
      return {
        ...store,
        locations: action.payload
      };
    case 'add_favorite':
      // Prevenir duplicados
      if (store.favorites.some(fav => fav.id === action.payload.id)) return store;
      return {
        ...store,
        favorites: [...store.favorites, action.payload]
      };
    case 'remove_favorite':
      return {
        ...store,
        favorites: store.favorites.filter(fav => fav.id !== action.payload.id)
      };
    case 'toggle_like':
        const existingLike = store.likes.find(l => l.id === action.payload.id);
        if (existingLike) {
            return {
                ...store,
                likes: store.likes.filter(l => l.id !== action.payload.id)
            };
        }
        return {
            ...store,
            likes: [...store.likes, action.payload]
        };
    case 'remove_like':
        return {
            ...store,
            likes: store.likes.filter(l => l.id !== action.payload.id)
        }
    default:
      throw Error('Unknown action.');
  }    
}
