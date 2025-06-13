import { useMemo, useState, useCallback } from 'react'
import { LocationContext, DisplayContext, OrdersContext, FullscreenContext } from './Context'
import { FullscreenModal } from '../body/components'

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

const OrdersProvider = ({ children }) => {
    const [orders, setOrders] = useState(null);
    const value = useMemo(() => ({ orders, setOrders }), [orders])
    return <OrdersContext.Provider value={value}>{children}</OrdersContext.Provider>
}

const FullscreenProvider = ({ children }) => {
    const [fullScreen, setFullScreen] = useState(null)

    const openFullscreen = useCallback((imageUrl) => {
        setFullScreen(imageUrl)
    }, [])

    const closeFullscreen = useCallback(() => {
        setFullScreen(null)
    }, [])

    return (
        <FullscreenContext.Provider value={{ openFullscreen, closeFullscreen }}>
            {children}
            {fullScreen && (
                <FullscreenModal
                    image={fullScreen}
                    onClose={closeFullscreen}
                />
            )}
        </FullscreenContext.Provider>
    )
}

const Providers = ({ children }) => {
    return (
        <LocationProvider>
            <DisplayProvider>
                <OrdersProvider>
                    <FullscreenProvider>
                        {children}
                    </FullscreenProvider>
                </OrdersProvider>
            </DisplayProvider>
        </LocationProvider>
    )
}

export default Providers
