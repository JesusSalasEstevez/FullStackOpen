import axios from 'axios'
const dataUrl = 'http://localhost:3001/api/persons'

const getAll = () => {
    const request = axios.get(dataUrl)
    return request.then(response => response.data)
}

const create = newObject => {
    const request = axios.post(dataUrl, newObject)
    return request.then(response => response.data)
}

const erase = erasedObject => {
    const request = axios.delete(`${dataUrl}/${erasedObject.id}`, erasedObject)
    return request.then(response => {
        console.log(response.data)
        return response.data
    })
}

const update = newObject => {
    console.log(`${dataUrl}/${newObject.id}`)
    const request = axios.put(`${dataUrl}/${newObject.id}`, newObject)
    return request.then(response => response.data)
}

export default {create, getAll, erase, update}