import CardGridDisplay from './sections/CardGridDisplay'
import ToPick from './sections/ToPick'
import { Container } from './components'
import QueuePile from './sections/QueuePile'
import { useOrders } from '../context/useContext'

function CardPicker() {
    const { orders } = useOrders()

    return (
        <div className="flex flex-col h-full md:grid md:grid-cols-[45%_54%] lg:grid-cols-[40%_59%] md:grid-rows-[79%_20%] gap-5 md:gap-[1%] p-2
                      bg-brown-900 rounded-2xl border-2 border-brown-950 shadow-brown-950 shadow-sm">
            {!orders ?
                <div className="col-span-full row-span-full flex items-center justify-center">
                    <div className="flex flex-col items-center gap-4">
                        <div className="w-16 h-16 border-4 border-silver-300 border-t-transparent rounded-full animate-[spin_1s_linear_infinite]"></div>
                        <p className="text-silver-300 font-semibold">Loading Orders...</p>
                    </div>
                </div>
                :
                <>
                    <Container className="row-span-2 relative z-10 max-h-[70vh] md:max-h-none overflow-y-scroll">
                        <ToPick />
                    </Container>
                    <Container className="relative z-10 overflow-y-scroll">
                        <CardGridDisplay />
                    </Container>
                    <Container className="relative z-10 rounded-2xl h-fit overflow-x-scroll">
                        <QueuePile />
                    </Container>
                </>
            }
        </div>
    );
}

export default CardPicker