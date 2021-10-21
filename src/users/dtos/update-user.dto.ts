import { UserRole } from '../user-roles.enum';
import { IsString, IsEmail, IsOptional } from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  @IsEmail({}, { message: 'Informe um e-mail válido' })
  email: string;

  @IsOptional()
  @IsString({ message: 'Informe um nome de usuário válido' })
  username: string;

  @IsOptional()
  role: UserRole;

  @IsOptional()
  status: boolean;
}
