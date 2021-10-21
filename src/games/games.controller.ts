import {
  Controller,
  Post,
  Body,
  ValidationPipe,
  UseGuards,
  Delete,
  Param,
  Get,
  Patch,
  ForbiddenException,
} from '@nestjs/common';
import { CreateGameDto } from './dtos/create-game.dto';
import { ReturnGameDto } from './dtos/return-game.dto';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../auth/roles.guard';
import { Role } from '../auth/role.decorator';
import { UserRole } from '../users/user-roles.enum';
import { GamesService } from './games.service';
import { UpdateGameDto } from './dtos/update-game.dto';
import { GetUser } from '../auth/get-user.decorator';
import { User } from '../users/users.entity';

@Controller('games')
@UseGuards(AuthGuard(), RolesGuard)
export class GamesController {
  constructor(private gamesService: GamesService) {}

  @Post()
  @Role(UserRole.ADMIN)
  async createGame(
    @Body(ValidationPipe) createGameDto: CreateGameDto,
  ): Promise<ReturnGameDto> {
    const game = await this.gamesService.createGame(createGameDto);
    return {
      game,
      message: 'Jogo cadastrado com sucesso',
    };
  }

  @Get()
  async findGames() {
    return this.gamesService.findGames();
  }

  @Get('/:id')
  @Role(UserRole.ADMIN)
  async findGameById(@Param('id') id: string): Promise<ReturnGameDto> {
    const game = await this.gamesService.findGameById(id);
    return {
      game,
      message: 'Jogo encontrado',
    };
  }

  @Patch('/:id')
  async updateGame(
    @Body(ValidationPipe) updateGameDto: UpdateGameDto,
    @GetUser() user: User,
    @Param('id') id: string,
  ) {
    if (user.role != UserRole.ADMIN)
      throw new ForbiddenException(
        'Você não tem autorização para acessar esse recurso',
      );
    else {
      return this.gamesService.updateGame(updateGameDto, id);
    }
  }

  @Delete('/:id')
  @Role(UserRole.ADMIN)
  async deleteUser(@Param('id') id: string) {
    await this.gamesService.deleteUser(id);
    return { message: 'Jogo excluído com sucesso' };
  }
}
