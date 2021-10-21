import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { Game } from './games.entity';
import { CreateGameDto } from './dtos/create-game.dto';
import { UserRole } from '../users/user-roles.enum';

@EntityRepository(Game)
export class GameRepository extends Repository<Game> {
  async createGame(
    createGameDto: CreateGameDto,
    role: UserRole,
  ): Promise<Game> {
    const { title, image_url, summary, genre, release_date } = createGameDto;
    const game = this.create();
    game.title = title;
    game.image_url = image_url;
    game.summary = summary;
    game.genre = genre;
    game.release_date = release_date;

    try {
      await game.save();
      return game;
    } catch (error) {
      if (error.code.toString() === '23505') {
        throw new ConflictException('Jogo já cadastrado!');
      } else {
        throw new InternalServerErrorException(
          'Erro ao salvar o jogo no banco de dados',
        );
      }
    }
  }
}
