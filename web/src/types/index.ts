export type Record = {
  status: "X" | "O" | "Draw";
  score: {
    X: number;
    O: number;
  };
};

export type Player = {
  name: string;
  repr: "X" | "O";
};

export type Game = {
  id: string;
  player1: Player;
  player2: Player;
  result?: Record;
  createdAt: string;
};
