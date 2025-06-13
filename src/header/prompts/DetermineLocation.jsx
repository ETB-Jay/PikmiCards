import { PromptContainer, PromptText } from "../components"
import { useDisplay, useLocation } from "../../context/useContext"

function DetermineLocation() {
    const { location, setLocation } = useLocation()
    const { setDisplay } = useDisplay()

    const LocationOption = ({ newLocation }) => {
        return (
            <div
                className="hover:bg-silver-200 px-3 rounded transition-colors cursor-pointer"
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

    return (
        <PromptContainer position={"mt-7"}>
            <LocationOption newLocation={"Oakville"} />
            <LocationOption newLocation={"Newmarket"} />
        </PromptContainer>
    )
}

export { DetermineLocation };
