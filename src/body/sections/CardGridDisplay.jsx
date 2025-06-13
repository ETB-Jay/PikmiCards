import { CustomerInfo } from '../components'
import { useOrders } from '../../context/useContext'

function CardGridDisplay() {
    const { orders } = useOrders()

    const boxOrders = orders.slice(0, 21)
    
    return (
        <div className="grid grid-cols-3 gap-2 p-2 auto-rows-fr">
            {boxOrders.map((order) => (
                <CustomerInfo key={order.orderNumber} order={order}/>
            ))}
        </div>
    )
}

export default CardGridDisplay
