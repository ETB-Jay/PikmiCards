import icon from '../../assets/placeholder.jpeg'
import { useState } from 'react'
import { FullscreenModal } from './components'
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';

function ToPick() {
    const [fullScreen, setFullScreen] = useState(null)

    const Card = ({ card, box, order }) => {
        return (
            <div className='flex flex-row gap-2 items-start bg-black/10 shadow-[0px_0px_3px_2px_rgba(0,0,0,0.25)] p-2 rounded'>
                <div className='relative h-25'>
                    <img
                        className="h-full cursor-pointer rounded-sm hover:brightness-50 transition-all"
                        src={card}
                        onClick={() => setFullScreen(card)}
                    />
                    <div className='absolute z-10 bottom-2 left-2 rounded bg-black/80 px-1 py-0.5 text-xs text-white'>{order.quantity}</div>
                    <div className='absolute z-10 bottom-2 right-2 rounded bg-black/80 px-1 py-0.5 text-xs text-white'>{order.condition}</div>
                </div>
                <div className='flex flex-col justify-between h-full max-w-[calc(100%-6.5rem)]'>
                    <p className="font-bold text-wrap break-words whitespace-normal">
                        {order.name}<br></br>
                        <span className='bg-gray-400/50 text-wrap rounded-2xl px-2'>{order.set}</span>
                    </p>
                    <p className="bg-gray-400/50 w-fit px-2 py-1 rounded font-semibold break-words whitespace-normal text-lg">Box {box}</p>
                </div>
            </div>
        )
    }

    return (
        <div className='flex flex-col h-full overflow-y-scroll rounded container-snap'>
            {fullScreen && (
                <FullscreenModal
                    image={fullScreen}
                    onClose={() => setFullScreen(null)}
                />
            )}
            <div className='flex flex-row justify-between items-center'>
                <h1 className="sticky top-0 font-bold rounded-sm px-2 bg-gray-300 dark:bg-zinc-100 drop-shadow-2xl z-20">Cards to Pick From Set</h1>
                <CheckBoxOutlineBlankIcon />
            </div>
            <div className="flex flex-col gap-2">
                <div className="flex flex-col gap-4 p-2 h-10">
                    <Card card={icon} box={1} order={{
                        name: "Whimsicott V",
                        set: "Sword & Shield: Brilliant Stars",
                        quantity: 50,
                        condition: "NM"
                    }} />
                </div>
            </div>
        </div>
    )
}

export default ToPick