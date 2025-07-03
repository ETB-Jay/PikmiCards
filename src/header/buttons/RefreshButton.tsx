/**
 * RefreshButton component for reloading orders from the server.
 * Used in the header for manual refresh.
 *
 * @module RefreshButton
 */
import { useOrderDisplay, useOrders } from '../../context/useContext';
import { memo, useCallback } from 'react';
import RefreshIcon from '@mui/icons-material/Refresh';
import { Button } from '../../components/modal';

/**
 * RefreshButton displays a button to refresh the order list.
 * @returns {JSX.Element}
 */
const RefreshButton = memo(() => {
    const { fetchOrders } = useOrders();
    const { orderDisplay, setOrderDisplay } = useOrderDisplay();

    const refresh = useCallback(async () => {
        try {
            setOrderDisplay([]);
            await fetchOrders();
        } catch {
            console.error('Error');
        }
    }, [fetchOrders, setOrderDisplay]);

    return (
        <Button
            label="Refresh"
            icon={<RefreshIcon />}
            onClick={refresh}
            disabled={!orderDisplay}>
        </Button>
    );
});

RefreshButton.displayName = 'RefreshButton';

export default RefreshButton;