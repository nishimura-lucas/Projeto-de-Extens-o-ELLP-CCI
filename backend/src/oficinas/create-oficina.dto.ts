import { IsString, IsNotEmpty, IsDateString } from 'class-validator';

export class CreateOficinaDto {
  @IsString()
  @IsNotEmpty({ message: 'O tema não pode estar vazio.' })
  tema: string;

  @IsString()
  @IsNotEmpty({ message: 'A descrição não pode estar vazia.' })
  descricao: string;

  @IsString()
  @IsNotEmpty({ message: 'O público-alvo não pode estar vazio.' })
  publico_alvo: string;

  @IsDateString({}, { message: 'A data de início deve ser uma data válida.' })
  data_inicio: Date;

  @IsDateString({}, { message: 'A data de fim deve ser uma data válida.' })
  data_fim: Date;

  // Note: Não pedimos o 'tutor' aqui,
  // porque vamos pegá-lo do utilizador que está LOGADO.
}