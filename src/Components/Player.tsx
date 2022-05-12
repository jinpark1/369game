import { useEffect, useState } from 'react';

interface PlayerProps {
    playerName: string;
    counting: number | null;
    playerCount: number;
    myTurn: boolean;
}

const Player = (props: PlayerProps) => {
    const [count, setCount] = useState<number | null>(0);
    
    useEffect(() => {
        setCount(props.counting);
    }, [props.counting])

    const countingGame = () => {
        const check369 = new RegExp(/[369]/g);
        if (count !== null && check369.test(count.toString()))
            return 'CLAP'
        else
            return count;
    }

    return (
        <div className="player">
            <div className=''>{props.playerName}</div>
            { props.myTurn ? <div className=''>{ countingGame() }</div> : null}
        </div>
    )
}

export default Player;