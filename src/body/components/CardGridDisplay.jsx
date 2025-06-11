import { CustomerInfo } from './components'

function CardGridDisplay() {
    return (
        <div className="grid grid-cols-2 gap-3 h-full overflow-y-scroll container-snap">
            {(() => {
                let info = []
                for (let i = 1; i <= 10; ++i) {
                    info.push(<CustomerInfo index={i} />)
                }
                return info
            })()}
        </div>
    )
}

export default CardGridDisplay
