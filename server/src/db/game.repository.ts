import { MongoClient } from "mongodb";
import { v4 } from "uuid";
import dotenv from "dotenv";

dotenv.config();

const dbUrl = process.env.MONGO_URI as string;

type Record = {
  status: Player | "Draw";
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
  result?: Record[];
  createdAt: string;
};

export const GameFactory = (player1: Player, player2: Player): Game => {
  return {
    id: v4(),
    player1,
    player2,
    result: [],
    createdAt: new Date().toLocaleString(),
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

    return game;
  }

  public async recordGame(game: Game): Promise<any> {
    const collection = await this.connect();

    const record = await collection.insertOne(game);

    return record;
  }

  public async getRecent(): Promise<any> {
    const collection = await this.connect();

    const games = await collection
      .find<Game>({})
      .sort({ createdAt: -1 })
      .toArray();

    return games;
  }
}
