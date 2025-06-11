import { LocationOption, PromptContainer } from "./components"

function DetermineLocation() {
    return (
        <PromptContainer position={"mt-7"}>
            <LocationOption newLocation={"Oakville"} />
            <LocationOption newLocation={"Newmarket"} />
        </PromptContainer>
    )
}

export { DetermineLocation };
