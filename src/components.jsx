const MainContainer = ({ children }) => {
    return (
        <div className="min-h-screen min-w-screen flex items-center justify-center relative overflow-y-hidden select-none">
            <div className="absolute flex content-center inset-0 w-full h-full bg-water-flow z-0" />
            {children}
        </div>
    )
}

export { MainContainer }
