import { useNavigate } from "react-router";

const Home = () => {
    const navigate = useNavigate();
    return (
        <div class="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
            <a onClick={() => navigate("/register")} className="hover:text-blue-700">
                Registrar
            </a>
        </div>
    )
}

export default Home