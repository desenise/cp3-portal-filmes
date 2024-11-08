import MovieCard from "./MovieCard";
import CardContainer from "./CardContainer";
import CarrosselButton from "./CarroselButton"

export default function MovieCarrosel({
    titulo,
    filmes,
    currentIndex,
    handleNext,
    handlePrev
}) {
    return (
        <CardContainer titulo={titulo}>
            <CarrosselButton direction="prev" onClick={handlePrev} />
            {filmes
                .slice(currentIndex, currentIndex + 10)
                .map((filme) => (
                    <MovieCard key={filme.id} {...filme} />
                ))}
           <CarrosselButton direction="next" onClick={handleNext} />
        </CardContainer>
    );
}
