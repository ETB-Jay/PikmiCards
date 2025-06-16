import { createContext } from 'react'
import { 
    LocationContextType, 
    DisplayContextType, 
    OrdersContextType, 
    OrderDisplayContextType, 
    FullscreenContextType 
} from '../types'

/**
 * @description Context for the current location. This is used to control 
 * the current orders and allows the website to be used dynamically for both locations.
 * 
 * The context is an object that contains two fields: location, and background color. This 
 * allows different color schemes to be added for each location for better visual responses. 
 */
const LocationContext = createContext<LocationContextType>({ location: "Oakville", setLocation: () => {} })
LocationContext.displayName = "LocationContext"


/**
 * @description Context for the display on the website. This is used to control what prompts are displayed on the website
 * 
 * These are the current displays
 * - default
 * - location
 */
const DisplayContext = createContext<DisplayContextType>({ display: "default", setDisplay: () => {} })
DisplayContext.displayName = "DisplayContext"

/**
 * @description Context for storing order data on the website. 
 */
const OrdersContext = createContext<OrdersContextType>({ orders: null, setOrders: () => {} })
OrdersContext.displayName = "OrdersContext"


/**
 * @description Context for storing order data for a specific location
 */
const OrderDisplayContext = createContext<OrderDisplayContextType>({ orderDisplay: null, setOrderDisplay: () => {} })
OrderDisplayContext.displayName = "OrderDisplayContext"


/**
 * @description Context for a fullscreened image
 */
const FullscreenContext = createContext<FullscreenContextType>({ openFullscreen: () => {}, closeFullscreen: () => {} })
FullscreenContext.displayName = "FullscreenContext"

export {
    LocationContext, 
    DisplayContext,
    OrdersContext,
    FullscreenContext,
    OrderDisplayContext
}
