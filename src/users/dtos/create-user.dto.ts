import {
  IsString,
  IsEmail,
  IsNotEmpty,
  MaxLength,
  MinLength,
  IsNumber,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty({ message: 'Informe um endereço de e-mail' })
  @IsEmail({}, { message: 'Informe um e-mail válido' })
  @MaxLength(200, { message: 'O e-mail deve ter menos de 200 caracteres' })
  email: string;

  @IsString()
  @IsNotEmpty({ message: 'Informe um endereço de e-mail' })
  @IsEmail({}, { message: 'Informe um e-mail válido' })
  @MaxLength(200, { message: 'O e-mail deve ter menos de 200 caracteres' })
  emailConfirmation: string;

  @IsString()
  @IsNotEmpty({ message: 'Informe o seu país' })
  @MaxLength(60, {
    message: 'O país deve ter menos de 60 caracteres',
  })
  country: string;

  @IsNumber()
  @IsNotEmpty({ message: 'Informe a sua idade' })
  age: number;

  @IsString()
  @IsNotEmpty({ message: 'Informe um nome de usuário' })
  @MaxLength(200, { message: 'O nome deve ter menos de 200 caracteres' })
  username: string;

  @IsString()
  @IsNotEmpty({ message: 'Informe uma senha' })
  @MinLength(8, { message: 'A senha deve ter pelo menos 8 caracteres' })
  password: string;

  @IsString()
  @IsNotEmpty({ message: 'Informe a confirmação da senha' })
  @MinLength(8, {
    message: 'A confirmação da senha deve ter pelo menos 8 caracteres',
  })
  passwordConfirmation: string;
}