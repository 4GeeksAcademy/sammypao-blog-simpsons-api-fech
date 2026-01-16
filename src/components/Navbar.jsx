import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";

/**
 * Navbar con enlaces de navegación y desplegables de Favoritos y Me Gusta.
 */
export const Navbar = () => {
    const { store, dispatch } = useGlobalReducer();
    const { favorites, likes, searchQuery, characters } = store;

    /** Filtra personajes cuyo nombre empiece con la búsqueda (máximo 5 sugerencias). */
    const suggestions = searchQuery.length > 0
        ? characters.filter(c => 
            c.character.toLowerCase().startsWith(searchQuery.toLowerCase())
          ).slice(0, 5)
        : [];

    return (
        <nav className="navbar navbar-light bg-light mb-3 px-4">
            <Link to="/">
                <span className="navbar-brand mb-0 h1">Blog de Los Simpsons</span>
            </Link>
            <div className="ml-auto d-flex align-items-center">
                <Link to="/episodes" className="btn btn-outline-primary mx-2">Episodios</Link>
                <Link to="/locations" className="btn btn-outline-success mx-2">Ubicaciones</Link>
                
                <div className="position-relative mx-3">
                    <form className="d-flex" role="search" onSubmit={(e) => e.preventDefault()}>
                        <input 
                            className="form-control me-2" 
                            type="search" 
                            placeholder="Buscar personaje..." 
                            aria-label="Search"
                            value={searchQuery}
                            onChange={(e) => dispatch({ type: 'set_search', payload: e.target.value })}
                        />
                        <button className="btn btn-warning" type="submit">Buscar</button>
                    </form>
                    {suggestions.length > 0 && (
                        <ul className="list-group position-absolute w-100 mt-1" style={{ zIndex: 1000 }}>
                            {suggestions.map(char => (
                                <Link 
                                    key={char.id} 
                                    to={`/character/${char.id}`} 
                                    className="list-group-item list-group-item-action"
                                    onClick={() => dispatch({ type: 'set_search', payload: '' })}
                                >
                                    {char.character}
                                </Link>
                            ))}
                        </ul>
                    )}
                </div>

                <div className="btn-group mx-2">
                    <button type="button" className="btn btn-primary dropdown-toggle" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        Favoritos <span className="badge text-bg-light">{favorites.length}</span>
                    </button>
                    <div className="dropdown-menu dropdown-menu-end">
                        {favorites.length === 0 ? (
                            <span className="dropdown-item">Vacío</span>
                        ) : (
                            favorites.map((fav, index) => (
                                <div key={index} className="d-flex align-items-center justify-content-between px-2">
                                    <Link to={`/character/${fav.id}`} className="dropdown-item">
                                        {fav.name}
                                    </Link>
                                    <i 
                                        className="fas fa-trash-alt text-danger" 
                                        style={{cursor: 'pointer'}}
                                        onClick={() => dispatch({ type: 'remove_favorite', payload: fav })}
                                    ></i>
                                </div>
                            ))
                        )}
                    </div>
                </div>

                <div className="btn-group mx-2">
                    <button type="button" className="btn btn-success dropdown-toggle" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        Me Gusta <span className="badge text-bg-light">{likes.length}</span>
                    </button>
                    <div className="dropdown-menu dropdown-menu-end">
                        {likes.length === 0 ? (
                            <span className="dropdown-item">Vacío</span>
                        ) : (
                            likes.map((like, index) => (
                                <div key={index} className="d-flex align-items-center justify-content-between px-2">
                                    <Link to={`/character/${like.id}`} className="dropdown-item">
                                        {like.name}
                                    </Link>
                                    <i 
                                        className="fas fa-trash-alt text-danger" 
                                        style={{cursor: 'pointer'}}
                                        onClick={() => dispatch({ type: 'remove_like', payload: like })}
                                    ></i>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};