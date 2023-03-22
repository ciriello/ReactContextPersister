import { useMainContext } from "../context/MainContext"

const MainComponent = () => {
    
    const {firstName, lastName, fetchRemoteData, remoteData, resetInitialState} = useMainContext()

    return (
        <div>
            <h1>Main</h1>
            <h2>name: {firstName} {lastName}</h2>
            <h2>remoteData: {remoteData.title}</h2>
            <div>
                <button onClick={fetchRemoteData}>Fetch</button>
                <button onClick={resetInitialState}>Clear</button>
            </div>
        </div>
    )
}

export default MainComponent