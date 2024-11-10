import axios from 'axios'
const dataUrl = 'https://studies.cs.helsinki.fi/restcountries/'

const get = () => {
    const request = axios.get(`${dataUrl}api/all`)
    return request.then(response => response.data)
}

export default {get}