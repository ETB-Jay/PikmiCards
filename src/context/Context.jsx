import { createContext } from 'react'

/**
 * @description Context for the current location. This is used to control 
 * the current orders and allows the website to be used dynamically for both locations.
 * 
 * The context is an object that contains two fields: location, and background color. This 
 * allows different color schemes to be added for each location for better visual responses. 
 * 
 * There are currently 2 available locations:
 * - Oakville
 * - Newmarket
 */
const LocationContext = createContext()
LocationContext.displayName = "LocationContext"

/**
 * @description Context for the display on the website. This is used to control what prompts are displayed on the website
 * 
 * These are the currently displays
 * - default
 * - location
 */
const DisplayContext = createContext()
DisplayContext.displayName = "DisplayContext"

export {
    LocationContext, 
    DisplayContext
}
