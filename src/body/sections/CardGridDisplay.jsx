import { CustomerInfo } from '../components'
import { useOrderDisplay } from '../../context/useContext'
import { useMemo, memo } from 'react'

const MemoizedCustomerInfo = memo(CustomerInfo)

function CardGridDisplay() {
    const { orderDisplay } = useOrderDisplay()

    const boxOrders = useMemo(() => 
        orderDisplay?.slice(0, 21) || [],
        [orderDisplay]
    )

    return (
        <div className="grid grid-cols-3 gap-2 p-2 auto-rows-fr">
            {boxOrders.map((order) => (
                <MemoizedCustomerInfo 
                    key={order.orderNumber} 
                    order={order} 
                />
            ))}
        </div>
    )
}

export default memo(CardGridDisplay)
