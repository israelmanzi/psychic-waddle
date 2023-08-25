import { Game } from "../types";

export default function HistoryGame({ player1, player2, result }: Game) {
    const player1Score = result?.filter(item => item.status === player1).length;
    const player2Score = result?.filter(item => item.status === player2).length;
    return (
        <div className="px-4 py-3 rounded-lg bg-neutral-900 grid grid-cols-2 gap-6">
            <div className="flex items-center gap-4 justify-end">
                <span>{player1.name} </span>
                <span className="border border-white/30 bg-white/10 w-7 h-7 flex items-center justify-center text-center rounded-md">{player1Score}</span>
            </div>
            <div className="flex items-center gap-4 justify-start  ">
                <span className="border border-white/30 bg-white/10 w-7 h-7 flex items-center justify-center text-center rounded-md">{player2Score}</span>
                <span>{player2.name}</span>
            </div>

        </div>
    )
}