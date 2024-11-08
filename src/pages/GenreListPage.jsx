import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { API_URL, API_KEY } from '../config/api';

export default function GenreListPage() {
    const [genres, setGenres] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Carrega os gêneros disponíveis na API
    useEffect(() => {
        const fetchGenres = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await fetch(`${API_URL}/genre/movie/list?api_key=${API_KEY}&language=pt-br`);
                const data = await response.json();
                setGenres(data.genres); // Armazena os gêneros
            } catch (error) {
                setError('Ocorreu um erro ao carregar os gêneros.');
            } finally {
                setLoading(false);
            }
        };

        fetchGenres();
    }, []);

    if (loading) {
        return (
            <div className="container mx-auto text-center px-4 py-8">
                <span className="text-xl">Carregando gêneros...</span>
            </div>
        );
    }

    if (error) {
        return (
            <div className="container mx-auto text-center px-4 py-8">
                <span className="text-red-600">{error}</span>
            </div>
        );
    }

    return (
        <div className="container mx-auto text-center px-4 py-8">
            <h1 className="text-2xl font-semibold mb-8">Escolha um Gênero</h1>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {genres.map((genre) => (
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
