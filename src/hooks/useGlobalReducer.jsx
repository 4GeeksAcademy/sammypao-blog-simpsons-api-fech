import { useContext, useReducer, createContext } from "react";
import storeReducer, { initialStore } from "../store"

const StoreContext = createContext()

/**
 * Proveedor del estado global de la aplicación.
 */
export function StoreProvider({ children }) {
    const [store, dispatch] = useReducer(storeReducer, initialStore())
    return <StoreContext.Provider value={{ store, dispatch }}>
        {children}
    </StoreContext.Provider>
}

/**
 * Hook para acceder al estado global y dispatch.
 */
export default function useGlobalReducer() {
    const { dispatch, store } = useContext(StoreContext)
    return { dispatch, store };
}