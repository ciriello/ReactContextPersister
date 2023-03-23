/*
MIT License

Copyright (c) 2023 Enzo

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/

import React, { useContext, useState } from "react"
import PersistenceManager, { loadInitialState, resetInitialState } from "./ContextHelper"
 
/** Creating The Main Context */
export const MainContext = React.createContext()

/** Initialize default state */
const initialState = {
    triggerRefresh: false,
    firstName: "First",
    lastName: "Last",
    remoteData: {
        title: 'None'
    }
}

/** Creating the Main Context Provider */
const MainContextProvider = ({children}) => {
    
    /**
     * (re)-initialize Context State and setup TTL
     * ttl is set to 20 seconds
     */
    const ttl = 20
    const state = loadInitialState(initialState, ttl)

    /**
     * The Context State Variables
     */
    const [firstName, setFirstName] = useState(state.firstName)
    const [lastName, setLastName] = useState(state.lastName)
    const [remoteData, setRemoteData] = useState(state.remoteData)

    /**
     * The Context Callback functions and handlers
     */
    const fetchRemoteData = () => {
        fetch("https://dummyjson.com/products/2")
            .then(response => response.json())
            .then(data => {console.log(data); return data})
            .then(data => setRemoteData(data));
    }

    /**
     * The data that will be persisted
     */
    const contextData = {
        firstName,        // the first name
        lastName,         // the last name
        remoteData,       // dummy data fetched remotely (async)
    }

    /**
     * Callback handlers (will not be persisted)
     */
    const contextHandlers = {
        setFirstName,      // updates firstName
        setLastName,       // updates lastname
        fetchRemoteData,   // fetches some dummy data async
        resetInitialState  // clear state and reload browser
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