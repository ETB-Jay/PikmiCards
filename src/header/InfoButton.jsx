import { useDisplay } from '../context/useContext'
import InfoOutlineIcon from '@mui/icons-material/InfoOutline'
import Information from './Information'

function InfoButton() {
    const { display, setDisplay } = useDisplay()
    return (
        <div
            className='cursor-pointer transition-opacity'
            onMouseEnter={() => setDisplay('info')}
            onMouseLeave={() => setDisplay('default')}
        >
            <InfoOutlineIcon className='hover:opacity-50 '/>
            {display === 'info' ? <Information />:<></>}
        </div>
    )
}

export default InfoButton
