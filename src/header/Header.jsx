import { useDisplay } from '../context/useContext'
import { DetermineLocation } from './DetermineLocation'
import InfoButton from './InfoButton'
import LocationButton from './LocationButton'
import RefreshButton from './RefreshButton'

function Header() {
    const { display } = useDisplay()

    return (
        <div className='flex flex-row justify-between items-center w-full'>
            <div className='flex flex-row gap-5'>
                <LocationButton />
                {display === "location" ? <DetermineLocation /> : <></>}
                <RefreshButton />
            </div>
            <InfoButton />
        </div>
    )
}

export default Header
