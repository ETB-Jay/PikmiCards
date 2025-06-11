const Button = ({ label, icon, onClick }) => {
    return (
        <button className="flex items-center px-1 gap-1 bg-zinc-300 dark:bg-zinc-100 shadow-[-4px_2px_4.099999904632568px_2px_rgba(0,0,0,0.30)] border border-black hover:bg-zinc-400 transition-colors cursor-pointer" onClick={onClick}>
            <div>{icon}</div>
            <div>{label}</div>
        </button>
    )
}

const Container = ({ className, children }) => {
    return (
        <div className={`bg-zinc-300 dark:bg-blue-200 shadow-[-4px_2px_4.01px_2px_rgba(0,0,0,0.30)] border border-black p-2 overflow-y-hidden ${className}`}>
            {children}
        </div>
    )
}

export { Button, Container }



