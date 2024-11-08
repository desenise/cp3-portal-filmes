import { useEffect, useState } from "react";
import MovieCarrosel from "../components/MovieCarrosel";
import { API_URL, API_KEY } from '../config/api.js';

export default function Home() {
    const [filmesPopulares, setFilmesPopulares] = useState([]);
    const [filmesTrending, setFilmesTrending] = useState([]);
    const [filmesUpcoming, setFilmesUpcoming] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Estado para controlar o índice dos filmes no carrossel
    const [currentPopulares, setCurrentPopulares] = useState(0);
    const [currentTrending, setCurrentTrending] = useState(0);
    const [currentUpcoming, setCurrentUpcoming] = useState(0);

    const fetchMovies = async () => {
        setLoading(true);
        setError(null);
        try {
            const [respostaPopulares, respostaTrending, respostaUpcoming] = await Promise.all(
                [
                    fetch(`${API_URL}/movie/popular?api_key=${API_KEY}&language=pt-br`),
                    fetch(`${API_URL}/trending/all/week?api_key=${API_KEY}&language=pt-br`),
                    fetch(`${API_URL}/movie/upcoming?api_key=${API_KEY}&language=pt-br`)
                ]
            );

            if (!respostaPopulares.ok || !respostaTrending.ok || !respostaUpcoming.ok) {
                throw new Error("Falha ao carregar filmes.");
            }

            const popularData = await respostaPopulares.json();
            const trendingData = await respostaTrending.json();
            const upcomingData = await respostaUpcoming.json();

            setFilmesPopulares(popularData.results);
            setFilmesTrending(trendingData.results);
            setFilmesUpcoming(upcomingData.results);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMovies();
    }, []);

    const handleNext = (category) => {
        if (category === 'populares') {
            setCurrentPopulares((prev) => (prev + 10 < filmesPopulares.length ? prev + 10 : prev));
        } else if (category === 'trending') {
            setCurrentTrending((prev) => (prev + 10 < filmesTrending.length ? prev + 10 : prev));
        } else if (category === 'upcoming') {
            setCurrentUpcoming((prev) => (prev + 10 < filmesUpcoming.length ? prev + 10 : prev));
        }
    };

    const handlePrev = (category) => {
        if (category === 'populares') {
            setCurrentPopulares((prev) => (prev - 10 >= 0 ? prev - 10 : prev));
        } else if (category === 'trending') {
            setCurrentTrending((prev) => (prev - 10 >= 0 ? prev - 10 : prev));
        } else if (category === 'upcoming') {
            setCurrentUpcoming((prev) => (prev - 10 >= 0 ? prev - 10 : prev));
        }
    };

    return (
        <div className="container mx-auto text-center px-4 py-8">
            {loading && (
                <div className="flex justify-center items-center py-10">
                    <span className="text-xl text-gray-600">Carregando filmes...</span>
                </div>
            )}
            {error && (
                <div className="text-center text-red-600 py-10">
                    <p>Ocorreu um erro ao carregar os filmes. Tente novamente mais tarde.</p>
                </div>
            )}

            {!loading && !error && (
                <>
                    <MovieCarrosel
                        titulo="Populares"
                        filmes={filmesPopulares}
                        currentIndex={currentPopulares}
                        handleNext={() => handleNext('populares')}
                        handlePrev={() => handlePrev('populares')}
                    />

                    <MovieCarrosel
                        titulo="Trending da Semana"
                        filmes={filmesTrending}
                        currentIndex={currentTrending}
                        handleNext={() => handleNext('trending')}
                        handlePrev={() => handlePrev('trending')}
                    />

                    <MovieCarrosel
                        titulo="Lançamentos Futuros"
                        filmes={filmesUpcoming}
                        currentIndex={currentUpcoming}
                        handleNext={() => handleNext('upcoming')}
                        handlePrev={() => handlePrev('upcoming')}
                    />
                </>
            )}
        </div>
    );
}
