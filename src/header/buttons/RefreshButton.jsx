import RefreshIcon from '@mui/icons-material/Refresh'
import { Button, PromptText } from '../components'
import { useOrders } from '../../context/useContext'
import getOrders from '../../shopifyQuery'

function RefreshButton() {

    const { setOrders } = useOrders()

    const refresh = async () => {
        try {
            setOrders(null)
            const data = await getOrders()
            console.log(data)
            setOrders(data)
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
