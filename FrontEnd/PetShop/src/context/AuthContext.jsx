import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import useApi from '../utils/api';
import { isAxiosError } from 'axios';
import useStorage from '../utils/useStorage';
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
    const { api } = useApi(token);
    const loadProfile = useCallback(async () => {
        try {
            const { data } = await api.get('/profile')
            setByKey('profile', data)
        } catch (e) {
            if (isAxiosError(e)) {
                if (e.response?.status == 401) {
                    alert('Sua sessão expirou, faça login novamente')
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
        loadProfile().then(() => setToken(token))
        return token;
    }
    const logout = () => {
        setToken(null)
        removeByKey('token')
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
    api.interceptors.response.use((response) => response, (e) => {
        if (e.response.status == 401) {
            alert('Sua sessão expirou, faça login novamente')
            logout()
        }
        return Promise.reject(e);
    });
    return { api };
}
export const useAuthentication = () => useContext(AuthContext);