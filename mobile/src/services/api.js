import axios from 'axios'

const api = axios.create({
    baseURL:'127.0.0.1:19000:3333'
})

export default api