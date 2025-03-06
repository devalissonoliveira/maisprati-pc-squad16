import axios from 'axios';
import { useMemo } from 'react' 
const BASE_URL_PRODUCTION = 'https://api.yuresamarone.shop'
const BASE_URL = 'http://localhost:8080'
export default function useApi(token = null)
{
    const api = useMemo( () => axios.create({
        baseURL: BASE_URL_PRODUCTION,
        headers: {
            Authorization: token ? `Bearer ${token}` : undefined,
        }
    }) , [token])
    return { api }
}