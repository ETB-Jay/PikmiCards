import { useDisplay, useLocation } from '../context/useContext'
import { Button } from '../components'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'

function LocationButton() {
    const { display, setDisplay } = useDisplay()
    const { location } = useLocation()

    return (
        <Button
            label={location}
            icon={<KeyboardArrowDownIcon />}
            onClick={() => {
                if (display !== "location") {
                    setDisplay("location")
                } else {
                    setDisplay("default")
                }
            }}
        />
    )
}

export default LocationButton
