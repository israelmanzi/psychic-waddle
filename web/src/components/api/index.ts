import { Game, Player } from "../../types";

const API_URL = "https://psychic-api.onrender.com/api/v1";

export async function fetchRecentGame() {
  try {
    const response = await fetch(`${API_URL}/recent`);    

    if (response.status === 404) return null;

    return await response.json();
  } catch (error) {
    throw new Error(`Error fetching data: ${error}`);
  }
}

export async function fetchGame({ id }: { id: string | undefined }) {
  try {
    const response = await fetch(`${API_URL}/game/${id}`);

    if (response.status === 404) return null;

    return await response.json();
  } catch (error) {
    throw new Error(`Error fetching data: ${error}`);
  }
}

export async function saveRecord({
  id,
  result,
  game,
}: {
  id: string | undefined;
  result: Player | null;
  game: Game | null;
}) {
  try {
    const response = await fetch(`${API_URL}/result/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        status: result ? result?.repr : "Draw",
        score:
          result == game?.player1
            ? {
                X: 1,
                O: 0,
              }
            : {
                X: 0,
                O: 1,
              },
      }),
    });

    if (response.status !== 200) return null;

    return await response.json();
  } catch (error) {
    throw new Error(`Error fetching data: ${error}`);
  }
}

export async function recordGame({ player1, player2 }: {
  player1: Player;
  player2: Player;
}) {
  try {
    const response = await fetch(`${API_URL}/record`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        player1,
        player2,
      }),
    });

    console.log(response)
    if (response.status !== 201) throw new Error("Error creating game!");

    return await response.json();
  } catch (error) {
    throw new Error(`Error fetching data: ${error}`);
  }
}
