import { useContext } from 'react'
import { LocationContext, DisplayContext } from './Context'

const useLocation = () => {
    const context = useContext(LocationContext)
    if (!context) {
        throw new Error("useLocation must be used in the LocationProvider")
    }
    return context
}

const useDisplay = () => {
    const context = useContext(DisplayContext)
    if (!context) {
        throw new Error("useDisplay must be used in the DisplayProvider")
    }
    return context
}

export { useLocation, useDisplay }
