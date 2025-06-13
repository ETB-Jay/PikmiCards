import { useContext } from 'react'
import { LocationContext, DisplayContext, OrdersContext, FullscreenContext } from './Context'

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

const useOrders = () => {
    const context = useContext(OrdersContext)
    if (!context) {
        throw new Error("useOrders must be used in the OrdersProvider")
    }
    return context
}

const useFullscreen = () => {
    const context = useContext(FullscreenContext)
    if (!context) {
        throw new Error('useFullscreen must be used within a FullscreenProvider')
    }
    return context
} 

export { useLocation, useDisplay, useOrders, useFullscreen }
