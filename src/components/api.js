import axios from 'axios';

export default function api() {
    const api = axios.create({
        baseURL: '//'+window.location.hostname+':5000/api',
        origin: true,
        // withCredentials: true // with condition same host and same port
    })

    return api
}
