import axios from 'axios';
import { useMemo } from 'react'

// Use '/api' como base URL em desenvolvimento
const BASE_URL = '/api'

export default function useApi(token = null) {
    const api = useMemo(() => axios.create({
        baseURL: BASE_URL,
        headers: {
            Authorization: token ? `Bearer ${token}` : undefined,
        }
    }), [token])
    
    return { api }
}