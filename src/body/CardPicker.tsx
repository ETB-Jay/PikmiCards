import { useOrderDisplay } from "../context/useContext";
import { Container } from "./components/Container";
import ToPick from "./sections/ToPick";
import QueuePile from "./sections/QueuePile";
import CardGridDisplay from "./sections/CardGridDisplay";
import { memo, useMemo } from "react";

const LoadingSpinner = memo(() => (
    <div className="col-span-full row-span-full flex items-center justify-center py-10 h-full rounded-2xl">
        <div className="flex flex-col items-center gap-4">
            <div className="w-16 h-16 border-4 border-teal-200 border-t-transparent rounded-full animate-[spin_1s_linear_infinite]"></div>
            <p className="text-teal-100 font-semibold">Loading Orders...</p>
        </div>
    </div>
));

LoadingSpinner.displayName = "LoadingSpinner";

const CardPicker = () => {
    const { orderDisplay } = useOrderDisplay();

    const content = useMemo(() => {
        if (!orderDisplay) {
            return <LoadingSpinner />;
        }

        return (
            <div className="h-full grid md:grid-cols-[40%_59%] lg:grid-cols-[30%_69%] md:grid-rows-[81%_19%] gap-2 md:gap-[1%]">
                <Container className="row-span-2 relative z-10 max-h-[70vh] md:max-h-none">
                    <ToPick />
                </Container>
                <div className="relative z-10 bg-gradient-to-br from-white/10 via-white/55 to-white/40 backdrop-blur-md rounded-2xl p-3">
                    <CardGridDisplay />
                </div>
                <Container className="p-2 relative z-10 rounded-2xl h-fit md:h-full">
                    <QueuePile />
                </Container>
            </div>
        );
    }, [orderDisplay]);

    return content;
};

CardPicker.displayName = "CardPicker";

export default CardPicker;