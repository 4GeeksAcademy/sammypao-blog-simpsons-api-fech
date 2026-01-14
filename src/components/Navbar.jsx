import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";

/**
 * Navbar con enlaces de navegación y desplegables de Favoritos y Me Gusta.
 */
export const Navbar = () => {
    const { store, dispatch } = useGlobalReducer();
    const { favorites, likes } = store;

    return (
        <nav className="navbar navbar-light bg-light mb-3 px-4">
            <Link to="/">
                <span className="navbar-brand mb-0 h1">Blog de Los Simpsons</span>
            </Link>
            <div className="ml-auto d-flex align-items-center">
                <Link to="/episodes" className="btn btn-outline-primary mx-2">Episodios</Link>
                <Link to="/locations" className="btn btn-outline-success mx-2">Ubicaciones</Link>
                
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