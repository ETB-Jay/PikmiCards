import Header from './header/Header'
import CardPicker from './body/CardPicker'
import handleShopifyQuery from './server/getQuery'
import { useEffect } from 'react'

function App() {

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await handleShopifyQuery();
        console.log(data)
      } catch (err) {
        console.log(err)
      }
    }
    loadData();
  }, []);


  return (
    <div className="flex flex-col h-screen w-screen bg-amber-100 dark:bg-blue-100 p-5 gap-5 select-none">
      <Header />
      <CardPicker />
    </div>
  )
}

export default App