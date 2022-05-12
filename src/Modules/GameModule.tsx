import { useState, useEffect } from 'react';
import Player from '../Components/Player';
import { useInterval } from '../Helper/useInterval';
import { getRandomInt } from '../Helper/getRandomInt';

const GameModule = () => {
    const [count, setCount] = useState<number>(1);
    const [gameInProgress, setGameInProgress] = useState<boolean>(false);
    const [playersArray, setPlayersArray] = useState<string[]>([]);
    const [playerNames, setPlayerNames] = useState<string>('');
    const [whoseTurn, setWhoseTurn] = useState<number>(0);
    const [losingPlayer, setLosingPlayer] = useState<string>('');
    
    useEffect(() => {
        const players = playerNames.split(',');
        setPlayersArray(players.filter(e => Boolean(e)));
    }, [playerNames])

    useInterval(() => {
        setCount(count + 1);
        
        if (didPlayerLose()) {
            let losingPlayerIndex = 0;
            if (whoseTurn === playersArray.length - 1) {
                losingPlayerIndex = 0;
            } else if (whoseTurn === 0) {
                losingPlayerIndex = 1;
            } else {
                losingPlayerIndex = whoseTurn + 1;
            }

            setLosingPlayer(playersArray[losingPlayerIndex]);
            setGameInProgress(false);
            resetCountAndTurn();
            return;
        }

        if (whoseTurn === playersArray.length - 1)
            setWhoseTurn(0);
        else
            setWhoseTurn(whoseTurn + 1);

    }, gameInProgress ? 1000 : null);

    const handleEndButtonClick = () => {
        setGameInProgress(false);
        resetCountAndTurn();
    }

    const handleReStartButtonClick = () => {
        setGameInProgress(true);
        resetCountAndTurn();
    }

    const handleStartButtonClick = () => {
        setLosingPlayer('');
        setGameInProgress(true);
    }

    const didPlayerLose = (): boolean => {
        const losingNumber = getRandomInt(0, 9);
        if (losingNumber === 0) {
            return true;
        } else 
            return false;
    }

    const checkMyTurn = (id: number) => {
        if (id === whoseTurn)
            return true;
        else 
            return false;
    }

    const resetCountAndTurn = () => {
        setCount(1);
        setWhoseTurn(0);
    }

    return (
        <div>
            <input onChange={event => setPlayerNames(event.target.value)} />
            {gameInProgress ? <button onClick={ handleReStartButtonClick }>재시작</button>
                : <button onClick={ handleStartButtonClick }>시작</button>
            }
            <button onClick={ handleEndButtonClick }>게임종료</button>
            <p>{losingPlayer ? `Player lost: ${losingPlayer}` : null}</p>
            <div className='container'>
                {playersArray.map((e, i) => {
                    return <Player
                            key={i}
                            playerName={e}
                            myTurn={ checkMyTurn(i) }
                            counting={ gameInProgress ? count : null }
                            playerCount={playersArray.length}
                            />
                })}
            </div>
        </div>
    )
}

export default GameModule;