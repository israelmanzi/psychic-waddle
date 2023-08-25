import Button from '../components/button';
import Header from '../components/head';
import { BackIcon } from '../components/icons';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { recordGame } from '../components/api';
import { Player } from '../types';

export default function NewGame() {
    const navigate = useNavigate();
    const [player1Name, setPlayer1Name] = useState<string>('');
    const [player2Name, setPlayer2Name] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>('');

    const handleBack = () => {
        history.back();
    };

    const handleStartGame = async () => {
        if (!player1Name || !player2Name) {
            setError('Please enter both player names');
            return;
        }

        const data = {
            player1: {
                name: player1Name,
                repr: 'X' as Player['repr'],
            },
            player2: {
                name: player2Name,
                repr: 'O' as Player['repr'],
            },
        }

        try {
            setLoading(true);
            const response = await recordGame({ player1: data.player1, player2: data.player2 });

            navigate(`/game/${response.id}`);
        } catch (error) {
            setError('Oops! Something went wrong. Please try again.' + error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <div className="flex items-center gap-2">
                <button onClick={handleBack}>
                    <BackIcon />
                </button>
                <Header title="New Game" />
            </div>
            <div className="grid grid-cols-2 gap-3 my-4">
                {error && (
                    <div className="col-span-2 text-center text-red-500">
                        {error}
                    </div>
                )}
                <div>
                    <label htmlFor="player1">Player 1</label> <br />
                    <input
                        type="text"
                        className="px-4 py-3 text-center bg-white/10 w-full"
                        placeholder="Name"
                        value={player1Name}
                        onChange={(e) => setPlayer1Name(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="player2">Player 2</label> <br />
                    <input
                        type="text"
                        className="px-4 py-3 text-center bg-white/10 w-full"
                        placeholder="Name"
                        value={player2Name}
                        onChange={(e) => setPlayer2Name(e.target.value)}
                    />
                </div>
            </div>
            <div className="w-fit mx-auto">
                {loading ? (
                    <div className="flex justify-center">
                        <div className="w-6 h-6 border-2 border-t-2 border-gray-200 rounded-full animate-spin"></div>
                    </div>
                ) : (
                    <Button onClick={handleStartGame}>Start Game</Button>
                )}
            </div>
        </div>
    );
}
