import Header from './header/Header'
import CardPicker from './body/CardPicker'
import { useEffect } from 'react'
import getOrders from './shopifyQuery'
import { useOrders } from './context/useContext'

function App() {
  const { setOrders } = useOrders()



  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await getOrders()
        console.log(data)
        setOrders(data)
      } catch (err) {
        console.error('Error loading orders:', err)
      }
    }
    loadData();
  }, []);

  return (
    <div className="flex flex-col md:h-[88vh] h-full w-full dark:bg-blue-100 gap-4 select-none">
      <Header />
      <CardPicker />
    </div>
  )
}

export default App
