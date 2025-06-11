import { useDisplay, useLocation } from "../context/useContext"

const PromptContainer = ({position, children}) => {
    return (
        <div className={`absolute flex flex-col bg-orange-200 py-1 px-2 border-1 rounded shadow-xl z-100 ${position}`}>
            {children}
        </div>
    )
}

const LocationOption = ({newLocation}) => {
    const {location, setLocation} = useLocation()
    const { setDisplay } = useDisplay()
    return (
        <div 
            className="hover:bg-orange-300 px-1.5 rounded transition-colors cursor-pointer"
            onClick={() => {
                if (location !== newLocation) {
                    setLocation(newLocation)
                }
                setDisplay("default")
            }}
        >
        <PromptText label={newLocation} />
        </div>
    )
}

const PromptText = ({label}) => {
    return (
        <p className="font-bold text-xs">{label}</p>
    )
}

export { PromptContainer, LocationOption, PromptText }