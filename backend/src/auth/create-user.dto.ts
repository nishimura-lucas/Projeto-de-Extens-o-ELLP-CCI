import { IsEmail, IsNotEmpty, IsString, MinLength, IsEnum } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty({ message: 'O nome não pode estar vazio.' })
  @IsString()
  name: string;

  @IsEmail({}, { message: 'Por favor, insira um email válido.' })
  email: string;

  @IsNotEmpty({ message: 'A palavra-passe não pode estar vazia.' })
  @MinLength(6, { message: 'A palavra-passe deve ter pelo menos 6 caracteres.' })
  password: string;

}