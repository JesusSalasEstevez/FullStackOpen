import axios from 'axios'
const dataUrl = 'http://localhost:3001/persons'

const getAll = () => {
    const request = axios.get(dataUrl)
    return request.then(response => response.data)
}

const create = newObject => {
    const request = axios.put(dataUrl, newObject)
    return request.then(response => response.data)
}

export default {create, getAll}