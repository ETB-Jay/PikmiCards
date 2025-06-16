import Header from './header/Header'
import CardPicker from './body/CardPicker'
import { useEffect } from 'react'
import getOrders from './shopifyQuery'
import { useLocation, useOrders, useOrderDisplay } from './context/useContext'

function App() {
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
    <div className="flex flex-col md:h-[88vh] h-full w-full dark:bg-blue-100 gap-4 select-none">
      <Header />
      <CardPicker />
    </div>
  )
}

export default App
