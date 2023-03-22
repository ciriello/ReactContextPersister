import React, { useContext, useState } from "react"
import PersistenceManager, { loadInitialState, resetInitialState } from "./ContextHelper"
  
export const MainContext = React.createContext()

const initialState = {
    triggerRefresh: false,
    firstName: "First",
    lastName: "Last",
    remoteData: {
        title: 'None'
    }
}

const MainContextProvider = ({children}) => {
    
    // ttl in seconds
    const ttl = 20
    const state = loadInitialState(initialState, ttl)

    const [firstName, setFirstName] = useState(state.firstName)
    const [lastName, setLastName] = useState(state.lastName)
    const [remoteData, setRemoteData] = useState(state.remoteData)

    const fetchRemoteData = () => {
        fetch("https://dummyjson.com/products/2")
            .then(response => response.json())
            .then(data => {console.log(data); return data})
            .then(data => setRemoteData(data));
    }

    const contextData = {
        firstName,
        lastName,
        remoteData,
    }

    const contextHandlers = {
        setFirstName,
        setLastName,
        fetchRemoteData,
        resetInitialState
    }

    return (
        <MainContext.Provider value={{ ...contextData, ...contextHandlers }}>
            <PersistenceManager data={contextData} />
            {children}
        </MainContext.Provider>
    )
}

const useMainContext = () => useContext(MainContext)

export { useMainContext }
export default MainContextProvider