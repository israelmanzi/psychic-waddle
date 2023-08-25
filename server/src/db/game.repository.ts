import { MongoClient } from "mongodb";
import { v4 } from "uuid";
import dotenv from "dotenv";
import { InvalidInputError, NilReturnError } from "../utils/errorHandler";

dotenv.config();

const dbUrl = process.env.MONGO_URI as string;

export type Record = {
  status: "X" | "O" | "Draw";
  score: {
    X: number;
    O: number;
  };
};

export interface Player {
  name: string;
  repr: "X" | "O";
}

class PlayerFactory implements Player {
  name: string;
  repr: "X" | "O";

  constructor(name: string, repr: "X" | "O") {
    if (!name || !repr) {
      throw new InvalidInputError("Name and repr are required");
    }

    if (repr !== "X" && repr !== "O") {
      throw new InvalidInputError("Repr must be either X or O");
    }

    if (typeof name !== "string") {
      throw new InvalidInputError("Name must be a string");
    }

    this.name = name;
    this.repr = repr;
  }

  public getValues(): Player {
    return {
      name: this.name,
      repr: this.repr,
    };
  }
}

export type Game = {
  id: string;
  player1: Player;
  player2: Player;
  result?: Record;
  createdAt: string;
};

export const GameFactory = (player1: Player, player2: Player): Game => {
  player1 = new PlayerFactory(player1.name, player1.repr).getValues();
  player2 = new PlayerFactory(player2.name, player2.repr).getValues();

  if (player1.repr === player2.repr) {
    throw new InvalidInputError(
      "Players must have different different representations!"
    );
  }

  return {
    id: v4(),
    player1,
    player2,
    result: undefined,
    createdAt: new Date().toLocaleString(),
  };
};

export const ResultFactory = (
  status: string,
  score: {
    X: number;
    O: number;
  }
): Record => {
  if (status !== "X" && status !== "O" && status !== "Draw") {
    throw new InvalidInputError("Status must be either X, O or Draw");
  }

  if (typeof score.X !== "number" || typeof score.O !== "number") {
    throw new InvalidInputError("Score must be a number");
  }

  if (score.X < 0 || score.O < 0) {
    throw new InvalidInputError("Score must be a positive number");
  }

  if (status === "X" && score.X <= score.O) {
    throw new InvalidInputError("X must have a higher score than O");
  }

  if (status === "O" && score.O <= score.X) {
    throw new InvalidInputError("O must have a higher score than X");
  }

  if (status === "Draw" && score.X !== score.O) {
    throw new InvalidInputError("X and O must have the same score");
  }

  return {
    status,
    score,
  };
};

interface GameRepositoryPort {
  recordGame(game: Game): Promise<Game>;
  getRecent(): Promise<Game[]>;
}

export default class GameRepository implements GameRepositoryPort {
  private readonly URL: string;
  private readonly client: MongoClient;
  static instance: GameRepository;

  private constructor() {
    this.URL = dbUrl;
    this.client = new MongoClient(this.URL);
  }

  static getInstance(): GameRepository {
    if (!GameRepository.instance) {
      GameRepository.instance = new GameRepository();
    }

    return GameRepository.instance;
  }

  private async connect() {
    try {
      await this.client.connect();

      const db = this.client.db("tictactoe");
      const collection = db.collection("games");

      return collection;
    } catch (error: any) {
      await this.client.close();
      throw new Error(error.message);
    }
  }

  public async getGame(id: string): Promise<any> {
    const collection = await this.connect();

    const game = await collection.findOne<Game>({ id });

    if (!game) {
      throw new NilReturnError(`Game with id ${id} not found`);
    }

    return game;
  }

  public async recordGame(game: Game): Promise<any> {
    const collection = await this.connect();

    await collection.insertOne(game);

    return game;
  }

  public async getRecent(): Promise<any> {
    const collection = await this.connect();

    const games = await collection
      .find<Game>({})
      .sort({ createdAt: -1 })
      .toArray();

    if (!games || games.length === 0) {
      throw new NilReturnError("No recent games found");
    }

    return games;
  }

  public async updateGameResult(id: string, result: Record): Promise<any> {
    const collection = await this.connect();

    const updatedGame = await collection.findOneAndUpdate(
      { id },
      { $set: { result } },
      { returnDocument: "after" }
    );

    if (!updatedGame) {
      throw new NilReturnError(`Game with id ${id} not found`);
    }

    return updatedGame.value;
  }
}
