import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import MovieCard from '../components/MovieCard';
import { API_URL, API_KEY } from '../config/api';

export default function MoviesByGenrePage() {
    const { id } = useParams(); // Captura o id do gênero da URL
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchMoviesByGenre = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await fetch(
                    `${API_URL}/discover/movie?api_key=${API_KEY}&with_genres=${id}&language=pt-br`
                );
                const data = await response.json();
                setMovies(data.results); // Armazena os filmes
            } catch (error) {
                setError('Ocorreu um erro ao carregar os filmes.');
            } finally {
                setLoading(false);
            }
        };

        fetchMoviesByGenre();
    }, [id]); // O efeito é disparado sempre que o id do gênero é alterado

    if (loading) {
        return (
            <div className="container mx-auto text-center px-4 py-8">
                <span className="text-xl">Carregando filmes...</span>
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
            <h1 className="text-2xl font-semibold mb-8">Filmes do Gênero</h1>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mt-8">
                {movies.map((movie) => (
                    <MovieCard key={movie.id} {...movie} />
                ))}
            </div>
        </div>
    );
}
