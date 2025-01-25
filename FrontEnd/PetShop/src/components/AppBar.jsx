import { useNavigate } from "react-router"

const AppBar = () => {
    const navigate = useNavigate();

    return (
        <div className="flex items-center justify-evenly sticky top-0 bg-black" style={{}}>
            <div className="text-lg font-bold">
                <a onClick={() => navigate("/")} className="hover:text-blue-700">
                    MinhaLogo
                </a>
            </div>
            <nav className="flex items-center justify-between gap-3 px-6 py-4 text-blue-950">
                {/* Links do lado esquerdo */}
                <a onClick={() => navigate("/")} className="hover:text-blue-700">
                    Home
                </a>
                <a onClick={() => navigate("/comofunciona")} className="hover:text-blue-700">
                    Como funciona
                </a>
                <a onClick={() => navigate("/plano")} className="hover:text-blue-700">
                    Plano
                </a>
                <a onClick={() => navigate("/contato")} className="hover:text-blue-700">
                    Contato
                </a>
                <a onClick={() => navigate("/login")} className="hover:text-blue-700">
                    Login
                </a>
            </nav>
        </div>

    )
}

export default AppBar