import GameRepository, {
  Game,
  GameFactory,
  Player,
  Record,
  ResultFactory,
} from "../db/game.repository";

export default class GameService {
  private readonly gameRepository: GameRepository =
    GameRepository.getInstance();

  public async getGame(id: string): Promise<Game> {
    const game = await this.gameRepository.getGame(id);

    return game;
  }

  public async getRecentGames(): Promise<Game> {
    const games = await this.gameRepository.getRecent();

    return games;
  }

  public async recordGame({
    player1,
    player2,
  }: {
    player1: Player;
    player2: Player;
  }): Promise<Game> {
    const game = GameFactory(player1, player2);

    const recordedGame = await this.gameRepository.recordGame(game);

    return recordedGame;
  }

  public async updateGameResult({
    id,
    result,
  }: {
    id: string;
    result: Record;
  }): Promise<Game> {
    const resultF = ResultFactory(result.status, result.score)

    const updatedGame = await this.gameRepository.updateGameResult(
      id,
      resultF
    );

    return updatedGame;
  }
}
