import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

// Este é o "molde" dos dados que esperamos receber do frontend
// para fazer o login
export class LoginDto {
  @IsEmail({}, { message: 'Por favor, insira um email válido.' })
  @IsString()
  @IsNotEmpty({ message: 'O email não pode estar vazio.' })
  email: string;

  @IsString()
  @IsNotEmpty({ message: 'A palavra-passe não pode estar vazia.' })
  @MinLength(6, {
    message: 'A palavra-passe deve ter pelo menos 6 caracteres.',
  })
  password: string;
}