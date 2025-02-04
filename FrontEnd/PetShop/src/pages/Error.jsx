import React from 'react'
import { useNavigate } from 'react-router'

const Error = () => {
    const navigate = useNavigate();
    return (
        <div>
            <div class="sm:mx-auto sm:w-full sm:max-w-sm">
                <h2 class="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
                    Algum erro ocorreu
                </h2>
            </div>
        </div>
    )
}

export default Error