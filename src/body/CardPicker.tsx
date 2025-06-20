import { Container } from "./components/Container";
import ToPick from "./sections/ToPick";
import QueuePile from "./sections/QueuePile";
import CardGridDisplay from "./sections/CardGridDisplay";

const CardPicker = () => {
    return (
        <div className="h-full grid lg:grid-cols-[45%_54%] xl:grid-cols-[30%_69%] lg:grid-rows-[81%_19%] gap-2 lg:gap-[1%]">
            <Container className="row-span-2 relative z-10 max-h-[70vh] lg:max-h-none">
                <ToPick />
            </Container>
            <Container>
                <CardGridDisplay />
            </Container>
            <Container className="p-2 relative z-10 rounded-2xl h-fit lg:h-full">
                <QueuePile />
            </Container>
        </div>
    );
};

CardPicker.displayName = "CardPicker";

export default CardPicker;