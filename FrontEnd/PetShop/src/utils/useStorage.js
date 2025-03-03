import { useCallback } from "react";

export default function useStorage()
{
    const getObjectByKey = useCallback( (key) => {
        let raw = localStorage.getItem(key);
        if(raw == null) return null;
        try {
            return JSON.parse(raw);
        }catch(e){
            return raw;
        }
    } ,[]) 
    const setByKey = useCallback((key, object) => {
        const storable = typeof object == 'object' ? JSON.stringify(object) : object;
        localStorage.setItem(key, storable) 
    }, [])
    const removeByKey = useCallback((key) => {
        localStorage.removeItem(key);
    }, [])
    return {
        getObjectByKey,
        setByKey,
        removeByKey
    }
}