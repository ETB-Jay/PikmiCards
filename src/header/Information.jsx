import { PromptContainer, PromptText } from "./components"

function Information() {
    return (
        <PromptContainer position={"right-10 top-10"}>
            <PromptText label={"NM: Near Mint"}/>
            <PromptText label={"LP: Lightly Played"}/>
            <PromptText label={"MP: Moderately Played"}/>
            <PromptText label={"HP: Heavily Played"}/>
            <PromptText label={"D: Damaged"}/>
            <PromptText label={"-F indicates a Foiled Card"} />
        </PromptContainer>
    )
}

export default Information