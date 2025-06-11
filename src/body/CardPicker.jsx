import CardGridDisplay from './components/CardGridDisplay'
import ToPick from './components/ToPick'
import { Container } from '../components'
import QueuePile from './components/QueuePile'

function CardPicker() {
    return (
        <div className="grid h-full grid-rows-[40%_20%_20%] grid-cols-[99%] md:grid-cols-[45%_54%] lg:grid-cols-[40%_59%] md:grid-rows-[69%_30%] gap-[1%]">
            <Container className={"row-start-1 row-end-3"}>
                <ToPick />
            </Container>
            <Container>
                <CardGridDisplay />
            </Container>
            <Container>
                <QueuePile />
            </Container>
        </div>  
    );
}

export default CardPicker