import { useDisplay } from '../context/useContext'
import { DetermineLocation } from './prompts/DetermineLocation'
import LocationButton from './buttons/LocationButton'
import RefreshButton from './buttons/RefreshButton'
import icon from '../assets/pikmicard.png'

function Header() {
    const { display } = useDisplay()

    return (
        <div className='flex flex-row justify-between items-center w-full h-8'>
            <div className='flex flex-row gap-5'>
                <LocationButton />
                {display === "location" ? <DetermineLocation /> : <></>}
                <RefreshButton />
            </div>
            <img className={"relative h-full"} src={icon} alt="pikmicard"></img>
        </div>
    )
}

export default Header
