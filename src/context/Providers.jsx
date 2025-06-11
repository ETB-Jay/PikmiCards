import { useMemo, useState } from 'react'
import { LocationContext, DisplayContext } from './Context'

const LocationProvider = ({ children }) => {
    const [location, setLocation] = useState("Oakville");
    const value = useMemo(() => ({ location, setLocation }), [location])
    return <LocationContext.Provider value={value}>{children}</LocationContext.Provider>
}

const DisplayProvider = ({ children }) => {
    const [display, setDisplay] = useState("default");
    const value = useMemo(() => ({ display, setDisplay }), [display])
    return <DisplayContext.Provider value={value}>{children}</DisplayContext.Provider>
}

const Providers = ({ children }) => {
    return (
        <LocationProvider>
            <DisplayProvider>
                {children}
            </DisplayProvider>
        </LocationProvider>
    )
}

export default Providers
