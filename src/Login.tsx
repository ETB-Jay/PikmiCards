import { MainContainer } from "./components"
import logo from "./assets/pikmicard.png"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

const InputField = ({ label, type = "text", value, onChange }: { label: string, type?: string, value: string, onChange: (e: React.ChangeEvent<HTMLInputElement>) => void }) => {
    return (
        <input
            className="bg-white/80 border border-green-smoke-200 rounded-xl px-4 py-2 text-base text-stone-800 placeholder:text-stone-600 focus:outline-none focus:ring-2 focus:ring-green-smoke-400 transition-all shadow-sm"
            placeholder={label}
            type={type}
            autoComplete={type === "password" ? "current-password" : "username"}
            value={value}
            onChange={onChange}
        />
    )
}

function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        if (!username.trim() || !password.trim()) {
            setError("Username and password are required.");
            return;
        }
        if (username !== "ETBETB" && password !== "ETBETB") {
            setError("Invalid Username/Password")
            return;
        }
        setError("");
        navigate("/");
    }

    return (
        <MainContainer>
            <div className="flex flex-col items-center justify-center w-full max-w-2xl">
                <img src={logo} alt="Pikmi" className="absolute top-15 h-20 w-auto mb-4 drop-shadow" />
                <form onSubmit={handleLogin} className="flex flex-col gap-6 max-w-2xl w-[90vw] backdrop-blur-md rounded-2xl p-10 z-10 shadow-xl bg-green-smoke-400/50 ring-2 ring-green-smoke-600">
                    <h1 className="text-2xl font-bold text-black text-center mb-2 tracking-wide drop-shadow">Login</h1>
                    <InputField label="Username" value={username} onChange={e => setUsername(e.target.value)} />
                    <InputField label="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} />
                    {error && <div className="text-red-900 text-center font-semibold">{error}</div>}
                    <button
                        className="mt-2 bg-green-smoke-600 hover:bg-green-smoke-700 text-white font-bold py-2 rounded-xl shadow transition-all text-lg tracking-wide focus:outline-none focus:ring-2 focus:ring-green-smoke-800 cursor-pointer"
                        type="submit"
                    >
                        Login
                    </button>
                </form>
            </div>
        </MainContainer>
    )
}

export default Login