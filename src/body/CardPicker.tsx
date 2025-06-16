import CardGridDisplay from './sections/CardGridDisplay'
import ToPick from './sections/ToPick'
import { Container } from './components'
import QueuePile from './sections/QueuePile'
import { useOrderDisplay } from '../context/useContext'

function CardPicker() {
    const { orderDisplay } = useOrderDisplay()

    return (
        <div className="flex flex-col h-full md:grid md:grid-cols-[40%_59%] lg:grid-cols-[30%_69%] md:grid-rows-[79%_20%] gap-5 md:gap-[1%]">
            {!orderDisplay ?
                <div className="col-span-full row-span-full flex items-center justify-center py-10 h-full rounded-2xl">
                    <div className="flex flex-col items-center gap-4">
                        <div className="w-16 h-16 border-4 border-teal-200 border-t-transparent rounded-full animate-[spin_1s_linear_infinite]"></div>
                        <p className="text-teal-100 font-semibold">Loading Orders...</p>
                    </div>
                </div>
                :
                <>
                    <Container className="row-span-2 relative z-10 max-h-[70vh] md:max-h-none overflow-y-scroll">
                        <ToPick />
                    </Container>
                    <div className="relative z-10 overflow-y-scroll">
                        <CardGridDisplay />
                    </div>
                    <Container className="p-2 relative z-10 rounded-2xl h-full overflow-x-scroll">
                        <QueuePile />
                    </Container>
                </>
            }
        </div>
    );
}

export default CardPicker