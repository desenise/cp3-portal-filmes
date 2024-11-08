import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { API_URL, API_KEY } from '../config/api.js';

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [trailer, setTrailer] = useState(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const movieResponse = await fetch(
          `${API_URL}/movie/${id}?api_key=${API_KEY}&language=pt-BR`
        );
        const movieData = await movieResponse.json();
        setMovie(movieData);

        const videoResponse = await fetch(
          `${API_URL}/movie/${id}/videos?api_key=${API_KEY}&language=pt-BR`
        );
        const videoData = await videoResponse.json();
        const officialTrailer = videoData.results.find(
          (video) => video.type === 'Trailer' && video.site === 'YouTube'
        );
        setTrailer(officialTrailer);

      } catch (error) {
        console.error('Erro ao buscar detalhes do filme:', error);
      }
    };

    fetchMovieDetails();
  }, [id]);

  if (!movie) {
    return <div className="text-center py-10 text-lg">Carregando...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center text-gray-900 mb-6">{movie.title}</h1>

      <p className="text-lg text-gray-700 mb-4">
        <strong>Sinopse:</strong> {movie.overview || 'Sem sinopse disponível.'}
      </p>

      <div className="mb-4">
        <p className="text-lg text-gray-800">
          <strong>Avaliação:</strong> {movie.vote_average} / 10
        </p>
        <p className="text-lg text-gray-800">
          <strong>Data de Lançamento:</strong> {movie.release_date}
        </p>
      </div>

      <div className="mb-6">
        <h3 className="text-2xl font-semibold text-gray-900">Elenco</h3>
        <ul className="list-disc pl-5 space-y-2">
          {movie.cast?.map((actor) => (
            <li key={actor.id} className="text-lg text-gray-700">
              <strong>{actor.name}</strong> como {actor.character}
            </li>
          ))}
        </ul>
      </div>

      {trailer && (
        <div className="mt-8">
          <h3 className="text-2xl font-semibold text-gray-900 mb-4">Trailer Oficial</h3>
          <div className="aspect-w-16 aspect-h-9">
            <iframe
              width="100%"
              height="100%"
              src={`https://www.youtube.com/embed/${trailer.key}`}
              title="Trailer"
              frameBorder="0"
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="rounded-lg shadow-lg"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default MovieDetails;
