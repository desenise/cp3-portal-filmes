export default function CarrosselButton({ direction, onClick }) {
    return (
        <button
            onClick={onClick}
            className={`px-4 self-center py-2 h-20 bg-purple-600 text-white rounded-lg hover:bg-purple-500 transition duration-300 ${
                direction === 'prev' ? 'mr-4' : 'ml-4'
            }`}
        >
            {direction === 'prev' ? 'Anterior' : 'Próximo'}
        </button>
    );
}

