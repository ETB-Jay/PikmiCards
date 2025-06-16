import Header from './header/Header'
import CardPicker from './body/CardPicker'
import { useEffect } from 'react'
import getOrders from './shopifyQuery'
import { useLocation, useOrders, useOrderDisplay } from './context/useContext'

const App: React.FC = () => {
  const { orders, setOrders } = useOrders()
  const { location } = useLocation()
  const { setOrderDisplay } = useOrderDisplay()

  // Initial load of orders
  useEffect(() => {
    const loadOrders = async () => {
      try {
        const data = await getOrders()
        setOrders(data)
      } catch (err) {
        console.error('Error loading orders:', err)
      }
    }
    loadOrders()
  }, [setOrders]);

  // Filter orders when location changes
  useEffect(() => {
    if (!orders) return;

    const filteredOrders = orders.filter(order =>
      order.items?.some(item =>
        item.itemLocation?.toLowerCase().includes(location.toLowerCase())
      )
    ) || []
    setOrderDisplay(filteredOrders)
  }, [location, orders, setOrderDisplay]);

  return (
    <div className='min-h-screen bg-gradient-to-br from-teal-600 via-cyan-500 to-sky-400'>
      <div className="flex flex-col p-5 md:h-[calc(100vh-2.5rem)] w-full gap-4 select-none">
        <Header />
        <CardPicker />
      </div>
    </div>
  )
}

export default App
