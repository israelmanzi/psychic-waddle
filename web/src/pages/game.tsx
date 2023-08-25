import { useEffect, useState } from 'react'
import { Game, Player } from '../types'
import ConfettiExplosion from 'react-confetti-explosion';
import Button from '../components/button';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchGame, saveRecord } from '../components/api';

const checkWinner = (board: number[][]) => {
    for (let i = 0; i < board.length; i++) {
        if (board[i][0] != -1 && board[i].every((cell: number) => cell === board[i][0])) return board[i][0]
    }
    for (let i = 0; i < board.length; i++) {
        if (board[0][i] != -1 && board.every((row: number[]) => row[i] === board[0][i])) return board[0][i]
    }

    if (board[0][0] != -1 && board[0][0] == board[1][1] && board[1][1] == board[2][2]) {
        return board[0][0]
    }
    if (board[0][2] != -1 && board[0][2] == board[1][1] && board[1][1] == board[2][0]) {
        return board[0][2]
    }
    return -1
}

export default function GameComponent() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [game, setGame] = useState<Game | null>(null);
    const [board, setBoard] = useState<number[][]>(new Array(3).fill(new Array(3).fill(-1)));
    const [currentPlayer, setCurrentPlayer] = useState<'X' | 'O'>('X');
    const [winner, setWinner] = useState<Player | null>(null);
    const [saveLoad, setSaveLoad] = useState<boolean>(false);

    useEffect(() => {
        const fetchPlayersById = async () => {
            const response = await fetchGame({ id });

            setGame(response)
        };
        fetchPlayersById();
    }, [id]);

    const transformPlayer = (winner: number) => {
        if (winner == 0)
            return game?.player1
        if (winner == 1)
            return game?.player2
        return null
    }

    const handlePlay = (row: number, col: number) => {
        if (board[row][col] != -1) return
        const newBoard = JSON.parse(JSON.stringify(board))
        newBoard[row][col] = currentPlayer == 'X' ? 0 : 1
        setBoard(newBoard)
        const roundWinner = checkWinner(newBoard)
        const winner = transformPlayer(roundWinner)
        if (winner) {
            setWinner(winner)
        }
        setCurrentPlayer(currentPlayer == 'X' ? 'O' : 'X')
    }

    const saveGame = async () => {
        try {
            setSaveLoad(true);
            
            await saveRecord({ id, result: winner, game });

            setSaveLoad(false);
            navigate('/');
        } catch (error) {
            console.error('An error occurred:', error);
        }
    }

    return (
        <div>
            {winner != null && <ConfettiExplosion />}
            {
                winner != null && <div className='w-[80%] bg-[#222222] flex items-center justify-center rounded-lg bg-opacity-40 backdrop-blur-xl absolute h-full'>
                    <div className='mx-auto w-fit'>

                        <h1 className='text-6xl text-white text-center py-4'>🎆</h1>
                        <h1 className='text-4xl text-white text-center py-4'>Winner is {winner.name}</h1>
                        <div className='w-fit flex items-center gap-6 mx-auto'>
                            {saveLoad ? <Button>Saving ...</Button> : <Button onClick={saveGame}>End Game</Button>}
                            <Button onClick={() => window.location.reload()}>Restart</Button>
                        </div>
                    </div>
                </div>
            }
            <div className='py-4'>
                {winner == null && <h1> Current player is {currentPlayer}</h1>}
            </div>
            <div className='grid grid-cols-3  h-[400px] gap-4 mx-auto'>
                {
                    board.map((row: number[], rowIndex) => (
                        row.map((col, colIndex: number) => (
                            <div
                                key={colIndex}
                                className='bg-white/10 hover:bg-white/20 rounded-md w-full h-full flex   items-center justify-center text-center text-white text-4xl font-bold'
                                onClick={() => handlePlay(rowIndex, colIndex)}>
                                {col == -1 ? '' : col == 0 ? 'X' : 'O'}
                            </div>
                        ))
                    ))
                }
            </div>
        </div>
    )
}





