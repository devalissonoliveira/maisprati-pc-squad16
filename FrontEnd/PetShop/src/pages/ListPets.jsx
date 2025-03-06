import { useCallback, useEffect, useState } from "react";
import { useAuthenticatedApi } from "../context/AuthContext";
export const petTagTranslation = (key) => {
    const terms = {
        'DOG': 'Cachorro',
        'OTHERS': 'Outros',
        'CAT': 'Gato',
        'PARROT': 'Papagaio',
        'HAMSTER': 'Hamster'
    }
    if (key in terms) {
        return terms[key]
    }
    return key;
}
export default function ListPets() {
    const { api } = useAuthenticatedApi();
    const [pets, setPets] = useState([]);

    useEffect(() => {
        api.get('/pets')
            .then(({ data }) => {
                setPets(data)
            })
    }, []);
    return (
        <div className="flex flex-col my-4">
            <div className="-m-1.5 overflow-x-auto">
                <div className="p-1.5 min-w-full inline-block align-middle">
                    <div className="overflow-hidden">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead>
                                <tr>
                                    <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">Nome</th>
                                    <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">Idade</th>
                                    <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">Espécie</th>
                                    <th scope="col" className="px-6 py-3 text-end text-xs font-medium text-gray-500 uppercase"></th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {pets.map((pet) => (
                                    <tr key={pet.petId}>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">{pet.name}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{pet.age}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{petTagTranslation(pet.species)}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-end text-sm font-medium">
                                            <button
                                                type="button"
                                                className="inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-blue-600 hover:text-blue-800 focus:outline-none focus:text-blue-800 disabled:opacity-50 disabled:pointer-events-none"
                                            >
                                                Editar
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}