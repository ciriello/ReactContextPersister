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