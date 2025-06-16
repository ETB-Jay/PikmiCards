import RefreshIcon from '@mui/icons-material/Refresh'
import { Button, PromptText } from '../components'
import { useOrderDisplay, useOrders, useLocation } from '../../context/useContext'
import getOrders from '../../shopifyQuery'

function RefreshButton() {
    const { setOrders } = useOrders()
    const { setOrderDisplay } = useOrderDisplay()
    const { location } = useLocation()

    const refresh = async () => {
        try {
            setOrders(null)
            setOrderDisplay(null)
            const data = await getOrders()
            setOrders(data)
            const filteredOrders = data?.filter(order =>
                order.items?.some(item =>
                    item.itemLocation?.toLowerCase().includes(location.toLowerCase())
                )
            ) || []
            setOrderDisplay(filteredOrders)
        } catch (err) {
            console.error('Error loading orders:', err)
        }
    }

    return (
        <Button onClick={refresh}>
            <RefreshIcon />
            <PromptText label="Refresh" />
        </Button>
    )
}

export default RefreshButton
