import {
  IsString,
  IsNotEmpty,
  IsEnum,
  IsOptional,
  IsNumber,
  IsBoolean,
  Min,
} from 'class-validator';
import { FaixaRenda, TipoMoradia } from './levantamento.entity';

export class CreateLevantamentoDto {
  @IsNumber({}, { message: 'Número de membros deve ser um número.' })
  @Min(1, { message: 'Deve ter pelo menos 1 membro na família.' })
  numero_membros_familia: number;

  @IsEnum(FaixaRenda, { message: 'Faixa de renda inválida.' })
  @IsNotEmpty({ message: 'A faixa de renda não pode estar vazia.' })
  faixa_renda: FaixaRenda;

  @IsEnum(TipoMoradia, { message: 'Tipo de moradia inválido.' })
  @IsNotEmpty({ message: 'O tipo de moradia não pode estar vazio.' })
  tipo_moradia: TipoMoradia;

  @IsString()
  @IsNotEmpty({ message: 'O bairro não pode estar vazio.' })
  bairro: string;

  @IsBoolean({ message: 'Deve indicar se possui acesso à internet.' })
  possui_acesso_internet: boolean;

  @IsString()
  @IsOptional()
  observacoes?: string;
}