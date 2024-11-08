export default function CardContainer({ titulo, children }) {
    return (
        <div className="my-10">
            <h1 className="text-2xl font-semibold text-gray-800 mb-4 text-white">{titulo}</h1>
            <div className="flex justify-center space-x-4">
                {children}
            </div>
        </div>
    );
}
