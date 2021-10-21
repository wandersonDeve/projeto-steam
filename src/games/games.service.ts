import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GameRepository } from './games.repository';
import { UserRole } from '../users/user-roles.enum';
import { CreateGameDto } from './dtos/create-game.dto';
import { Game } from './games.entity';
import { UpdateGameDto } from './dtos/update-game.dto';

@Injectable()
export class GamesService {
  constructor(
    @InjectRepository(GameRepository)
    private gameRepository: GameRepository,
  ) {}

  async createGame(createGameDto: CreateGameDto): Promise<Game> {
    return this.gameRepository.createGame(createGameDto, UserRole.ADMIN);
  }

  async findGames(): Promise<Game[]> {
    return Game.find();
  }

  async findGameById(gameId: string): Promise<Game> {
    const game = await this.gameRepository.findOne(gameId, {
      select: ['title', 'genre', 'release_date', 'id'],
    });

    if (!game) throw new NotFoundException('Jogo não encontrado');

    return game;
  }

  async updateGame(updateGameDto: UpdateGameDto, id: string): Promise<Game> {
    const game = await this.findGameById(id);
    const { title, image_url, summary, genre, release_date } = updateGameDto;
    game.title = title ? title : game.title;
    game.image_url = image_url ? image_url : game.image_url;
    game.summary = summary ? summary : game.summary;
    game.genre = genre ? genre : game.genre;
    game.release_date = release_date ? release_date : game.release_date;

    try {
      await game.save();
      return game;
    } catch (error) {
      throw new InternalServerErrorException(
        'Erro ao atualizar os dados no banco de dados',
      );
    }
  }

  async deleteUser(gameId: string) {
    const result = await this.gameRepository.delete({ id: gameId });
    if (result.affected === 0) {
      throw new NotFoundException(
        'Não foi encontrado um jogo com o ID informado',
      );
    }
  }
}
