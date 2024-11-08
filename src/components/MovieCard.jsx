import { Link } from "react-router-dom";

export default function MovieCard({ id, title, poster_path, backdrop_path }) {
    return (
        <div className="ml-10">
            <img src={`https://image.tmdb.org/t/p/w154${poster_path}`} />
            <Link 
                    to={`/movies/${id}`} 
                    className="
                        inline-block mt-2 px-4 py-2 rounded-lg text-white
                        bg-purple-600
                        hover:bg-purple-500
                        hover:scale-105
                        active:scale-95
                        active:bg-purple-700
                        transition-all duration-300
                    "
                >
                    Saber mais
                </Link>
        </div>
    )

}