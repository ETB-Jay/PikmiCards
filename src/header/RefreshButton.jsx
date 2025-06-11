import RefreshIcon from '@mui/icons-material/Refresh'
import { Button } from '../components'

function RefreshButton() {
    return (
        <Button
            icon={<RefreshIcon />}
            label="Refresh"
        />
    )
}

export default RefreshButton
