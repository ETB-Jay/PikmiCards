

const PromptContainer = ({ position, children }) => {
    return (
        <div className={`absolute flex flex-col bg-silver-300 border-1 py-1 rounded z-100 ${position}`}>
            {children}
        </div>
    )
}

const PromptText = ({ label }) => {
    return (
        <p className="font-semibold text-sm">{label}</p>
    )
}

const Button = ({ children, onClick }) => {
    return (
        <button
            className="flex items-center px-1 gap-1 bg-green-smoke-300 rounded shadow-[-4px_2px_4.099999904632568px_2px_rgba(0,0,0,0.30)] border border-black hover:bg-green-smoke-400 transition-colors cursor-pointer"
            onClick={onClick}
        >
            <>{children}</>
        </button>
    )
}

export { PromptContainer, PromptText, Button }