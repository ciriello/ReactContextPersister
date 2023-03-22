
const KEY_CONTEXT = 'mainContext'
const KEY_CONTEXT_TTL = 'mainContextTTL'

const resetInitialState = ()  => {
    window.localStorage.clear()
    window.location.reload()
}

const loadInitialState = (initialState, ttl) => {
    const currentTime = new Date().getTime()
    const ms = ttl * 1000
    const contextTTL = window.localStorage.getItem(KEY_CONTEXT_TTL) || 0
    if (currentTime - contextTTL > ms) {
        return {
            ...initialState
        }
    }
    const storedContext = window.localStorage.getItem(KEY_CONTEXT) || JSON.stringify(initialState)
    const parsedContext = JSON.parse(storedContext)
    return {
        ...parsedContext
    }
}

const PersistenceManager = ({ data }) => {
    const dataToString = JSON.stringify(data)
    window.localStorage.setItem(KEY_CONTEXT, dataToString)
    window.localStorage.setItem(KEY_CONTEXT_TTL, new Date().getTime())
    return (
        <></>
    )
}

export { KEY_CONTEXT, resetInitialState, loadInitialState }
export default PersistenceManager