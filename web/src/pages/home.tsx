import { useEffect, useState } from "react";
import Button from "../components/button";
import Header from "../components/head";
import { useNavigate } from 'react-router-dom'
import { fetchRecentGame } from "../components/api";
import { Game } from "../types";

export default function Home() {
    const navigate = useNavigate();
    const [recentGames, setRecentGames] = useState<Game[] | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchRecentGames = async () => {
            const response = await fetchRecentGame();

            setRecentGames(response);
            setLoading(false);
        };
        fetchRecentGames();
    }, []);

    return (
        <div>
            <div className="flex flex-col md:flex-row items-center justify-between">
                <Header title="Recent Games" />
                <Button onClick={() => navigate('/newgame')}>New game</Button>
            </div>
            {loading && <p className="text-center text-xl mt-10 text-primary">Loading...</p>}
            {!recentGames && !loading && <p className="text-center text-xs mt-10 text-primary md:text-base  ">No recent games</p>}
            {recentGames && recentGames.length > 0 && (
                <div className="mt-8">
                    <table className="table-auto w-full">
                        <thead>
                            <tr>
                                <th className="px-4 py-2 font-semibold md:text-lg lg:text-xl">Player 1</th>
                                <th className="px-4 py-2 font-semibold md:text-lg lg:text-xl">Player 2</th>
                            </tr>
                        </thead>
                        <tbody>
                            {recentGames.map((game: Game) => (
                                <tr key={game.id}>
                                    <td className="border px-4 py-2">
                                        <span className="text-base md:text-lg lg:text-xl">{game.player1.name} ({game.player1.repr})</span> -- <span className="text-primary text-xl">{game.result?.score.X}</span>
                                    </td>
                                    <td className="border px-4 py-2">
                                        <span className="text-primary text-xl">{game.result?.score.O}</span> -- <span className="text-base md:text-lg lg:text-xl">{game.player2.name} ({game.player2.repr})</span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    )
}
