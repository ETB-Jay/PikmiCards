import CardGridDisplay from './sections/CardGridDisplay'
import ToPick from './sections/ToPick'
import { Container, LoadingSpinner } from './components'
import QueuePile from './sections/QueuePile'
import { useOrderDisplay } from '../context/useContext'

function CardPicker() {
    const { orderDisplay } = useOrderDisplay()

    return (
        <div className="flex flex-col h-full md:grid md:grid-cols-[45%_53%] md:grid-rows-[78%_20%] gap-5 md:gap-[2%] p-2
                      bg-brown-900 rounded-2xl border-2 border-brown-950 shadow-brown-950 shadow-sm">
            {!orderDisplay ?
                <div className="col-span-full row-span-full flex items-center justify-center py-10">
                    <LoadingSpinner />
                </div>
                :
                <>
                    <Container className="row-span-2 relative z-10 max-h-[70vh] md:max-h-none overflow-y-scroll">
                        <ToPick />
                    </Container>
                    <Container className="relative z-10 overflow-y-scroll">
                        <CardGridDisplay />
                    </Container>
                    <Container className="relative z-10 rounded-2xl h-full overflow-x-scroll">
                        <QueuePile />
                    </Container>
                </>
            }
        </div>
    );
}

export default CardPicker