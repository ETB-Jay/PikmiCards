import { useOrderDisplay } from "../context/useContext";
import { Container } from "./components/Container";
import ToPick from "./sections/ToPick";
import QueuePile from "./sections/QueuePile";
import CardGridDisplay from "./sections/CardGridDisplay";
import { memo } from "react";

const LoadingSpinner = memo(() => (
    <div className="relative col-span-full row-span-full flex items-center justify-center rounded-2xl">
        <div className="flex flex-col items-center gap-4">
            <div className="w-16 h-16 border-4 border-teal-200 border-t-transparent rounded-full animate-[spin_1s_linear_infinite]"></div>
            <p className="text-teal-100 font-semibold">Loading Orders...</p>
        </div>
    </div>
));

LoadingSpinner.displayName = "LoadingSpinner";

const CardPicker = () => {
    const { orderDisplay } = useOrderDisplay();
    return (
        <div className="h-full grid lg:grid-cols-[45%_54%] xl:grid-cols-[30%_69%] lg:grid-rows-[81%_19%] gap-2 lg:gap-[1%]">
            {!orderDisplay ?
                <LoadingSpinner /> :
                <>
                    <Container className="row-span-2 relative z-10 max-h-[70vh] lg:max-h-none">
                        <ToPick />
                    </Container>
                    <Container>
                        <CardGridDisplay />
                    </Container>
                    <Container className="p-2 relative z-10 rounded-2xl h-fit lg:h-full">
                        <QueuePile />
                    </Container>
                </>
            }
        </div>
    );
};

CardPicker.displayName = "CardPicker";

export default CardPicker;