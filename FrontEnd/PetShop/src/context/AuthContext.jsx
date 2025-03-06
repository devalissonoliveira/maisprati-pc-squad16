import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import useApi from '../utils/api';
import { isAxiosError } from 'axios';
import useStorage from '../utils/useStorage';
import { useAlert } from './AlertContext';
const httpStatusAction = {
    '401': (content) => {
        alert('Senha ou email incorretos')
        console.log(`deu certo`)
    },
    '403': (content) => {
        alert('Senha ou email incorretos')
    }
}
export const AuthContext = createContext({
    token: null,
    login: async (email, password) => { },
    logout: () => { },
    profile: null
})

export function AuthProvider(props) {
    const { getObjectByKey, setByKey, removeByKey } = useStorage();
    const [token, setToken] = useState(() => getObjectByKey('token'));
    const profile = useMemo(() => getObjectByKey('profile'), [token])
    const { showAlert } = useAlert()
    const { api } = useApi();
    const loadProfile = useCallback(async () => {
        const token = getObjectByKey('token');
        try {
            const { data } = await api.get('/profile', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            setByKey('profile', data)
        } catch (e) {
            if (isAxiosError(e)) {
                if (e.response?.status == 401) {
                    showAlert('Sua sessão expirou, faça login novamente', 'error')
                    logout()
                }
            }
        }
    }, [token]);



    const login = async (email, password) => {
        const { data } = await api.post('/login', {
            email, password
        })
        const token = data.accessToken;
        setByKey('token', token);
        setToken(token)
        loadProfile()
        return token;
    }
    const logout = () => {
        removeByKey('token')
        removeByKey('profile')
        setToken(null)

    }
    return (
        <AuthContext.Provider value={{ login, token, logout, profile }}>
            {props.children}
        </AuthContext.Provider>
    )
}

export const useAuthenticatedApi = () => {
    const { token, logout } = useContext(AuthContext);
    const { api } = useApi(token);
    const { showAlert } = useAlert()
    useEffect( () => {
        //Adicionar listener para o redirecionamento 
        const id = api.interceptors.response.use((response) => response, (e) => {
            if (e.response.status == 401) {
                showAlert('Sua sessão expirou, faça login novamente', 'error')
                logout()
            }
            return Promise.reject(e);
        });
        return () => api.interceptors.response.eject(id)
    } , [])

    return { api };
}
export const useAuthentication = () => useContext(AuthContext);