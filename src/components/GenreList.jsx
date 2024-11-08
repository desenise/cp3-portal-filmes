import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { API_URL, API_KEY } from '../config/api';

export default function GenreList() {
    const [genders, setGenders] = useState([]);

    useEffect(() => {
        const fetchGenres = async () => {
            try {
                const response = await fetch(`${API_URL}/genre/movie/list?api_key=${API_KEY}&language=pt-br`);
                const data = await response.json();
                setGenders(data.genres);
            } catch (error) {
                console.error('Erro ao carregar os gêneros:', error);
            }
        };

        fetchGenres();
    }, []);

    return (
        <div className="container mx-auto text-center px-4 py-8">
            <h1 className="text-2xl font-semibold mb-8">Escolha um Gênero</h1>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {genders.map((genre) => (
                    <Link
                        key={genre.id}
                        to={`/genre/${genre.id}`}
                        className="block text-center py-2 px-4 bg-purple-600 text-white rounded-lg hover:bg-purple-500 transition duration-300"
                    >
                        {genre.name}
                    </Link>
                ))}
            </div>
        </div>
    );
}
