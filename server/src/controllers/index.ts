import { Request, Response } from "express";
import { Player, Record } from "../db/game.repository";
import GameService from "../services";
import { log } from "console";

const gameService = new GameService();

export const gameController = {
  getGame: async (req: Request, res: Response) => {
    const { id } = req.params;

    const game = await gameService.getGame(id);

    res.status(200).json(game);
  },

  getRecentGames: async (req: Request, res: Response) => {
    const games = await gameService.getRecentGames();

    res.status(200).json(games);
  },

  recordGame: async (req: Request, res: Response) => {
    const { player1, player2 } = req.body as {
      player1: Player;
      player2: Player;
    };

    log(player1, player2);

    const game = await gameService.recordGame({ player1, player2 });

    res.status(201).json(game);
  },

  updateGameResult: async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = req.body as Record;

    const game = await gameService.updateGameResult({
      id,
      result,
    });

    res.status(200).json(game);
  },
};
