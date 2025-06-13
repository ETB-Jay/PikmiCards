import { useDisplay, useLocation } from '../../context/useContext'
import { Button, PromptText } from '../components'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'

function LocationButton() {
    const { display, setDisplay } = useDisplay()
    const { location } = useLocation()

    return (
        <Button
            onClick={() => {
                if (display !== "location") {
                    setDisplay("location")
                } else {
                    setDisplay("default")
                }
            }}
        >
        <KeyboardArrowDownIcon />
        <PromptText label={location}/>
        </Button>
    )
}

export default LocationButton
