import React, { useMemo, useState, useCallback } from 'react'
import { LocationContext, DisplayContext, OrdersContext, FullscreenContext, OrderDisplayContext } from './Context'
import { FullscreenModal } from '../body/components'
import { Order, FullscreenModalProps } from '../types'

interface ProviderProps {
    children: React.ReactNode;
}

const LocationProvider: React.FC<ProviderProps> = ({ children }) => {
    const [location, setLocation] = useState("Oakville");
    const value = useMemo(() => ({ location, setLocation }), [location])
    return <LocationContext.Provider value={value}>{children}</LocationContext.Provider>
}

const DisplayProvider: React.FC<ProviderProps> = ({ children }) => {
    const [display, setDisplay] = useState<"default" | "location">("default");
    const value = useMemo(() => ({ display, setDisplay }), [display])
    return <DisplayContext.Provider value={value}>{children}</DisplayContext.Provider>
}

const OrdersProvider: React.FC<ProviderProps> = ({ children }) => {
    const [orders, setOrders] = useState<Order[] | null>(null);
    const value = useMemo(() => ({ orders, setOrders }), [orders])
    return <OrdersContext.Provider value={value}>{children}</OrdersContext.Provider>
}

const OrderDisplayProvider: React.FC<ProviderProps> = ({ children }) => {
    const [orderDisplay, setOrderDisplay] = useState<Order[] | null>(null);
    const value = useMemo(() => ({ orderDisplay, setOrderDisplay }), [orderDisplay])
    return <OrderDisplayContext.Provider value={value}>{children}</OrderDisplayContext.Provider>
}

const FullscreenProvider: React.FC<ProviderProps> = ({ children }) => {
    const [fullScreen, setFullScreen] = useState<string | null>(null)

    const openFullscreen = useCallback((imageUrl: string) => {
        setFullScreen(imageUrl)
    }, [])

    const closeFullscreen = useCallback(() => {
        setFullScreen(null)
    }, [])

    const modalProps: FullscreenModalProps = {
        image: fullScreen!,
        onClose: closeFullscreen
    }

    return (
        <FullscreenContext.Provider value={{ openFullscreen, closeFullscreen }}>
            {children}
            {fullScreen && <FullscreenModal {...modalProps} />}
        </FullscreenContext.Provider>
    )
}

const Providers: React.FC<ProviderProps> = ({ children }) => {
    return (
        <LocationProvider>
            <DisplayProvider>
                <OrdersProvider>
                    <OrderDisplayProvider>
                        <FullscreenProvider>
                            {children}
                        </FullscreenProvider>
                    </OrderDisplayProvider>
                </OrdersProvider>
            </DisplayProvider>
        </LocationProvider>
    )
}

export default Providers
