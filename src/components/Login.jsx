export default function Login({ isLogged, handleLogin }) {


    return (
        <div className="flex gap-4 items-center">
            {isLogged && <p>Olá, usuário</p>}
            <button
                onClick={handleLogin}
                className={`
                    bg-yellow-700
                    text-purple-800 text-white px-4 py-1 rounded
                    hover:bg-yellow-500
                    hover:scale-105
                    active:scale-95
                    active:bg-yellow-700
                    transition-all duration-300
                 `}>
                {isLogged ? "Logout" : "Login"}
            </button>
        </div>
    )
}