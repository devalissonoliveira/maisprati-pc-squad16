import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';

// import { Container } from './styles';

function featchApi() {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);

    const URI = "http://localhost:8080/"

    const fetchData = async () => {
        try{
            const response = await fetch('https://rotaBack.com/get');
            if (!response.ok) {
                throw new Error('Erro ao buscar dados');
            }
            const data = await response.json();
            setData(data);
            return data;

        }catch(Error){
            console.error("Error interno no servidor," + Error)
            setError({
                Error,
                'menseger': "Error interno no servidor," + Error.menseger
            })
            return error;
        }
    }

    useEffect(fetchData
    ,[])

}

export default utils;
