import {
  IsString,
  IsNotEmpty,
  IsEnum,
  IsOptional,
  IsEmail,
} from 'class-validator';
import { TipoInstituicao, StatusParceria } from './escola.entity';

export class CreateEscolaDto {
  @IsString()
  @IsNotEmpty({ message: 'O nome não pode estar vazio.' })
  nome: string;

  @IsEnum(TipoInstituicao, { message: 'Tipo de instituição inválido.' })
  @IsNotEmpty({ message: 'O tipo não pode estar vazio.' })
  tipo: TipoInstituicao;

  // Opcionais
  @IsString()
  @IsOptional()
  contato_nome?: string;

  @IsEmail({}, { message: 'Email de contato inválido.' })
  @IsOptional()
  contato_email?: string;

  @IsString()
  @IsOptional()
  contato_telefone?: string;

  // O status da parceria será PENDENTE por defeito (definido na Entidade),
  // mas podemos permitir que um Coordenador defina um status diferente na criação.
  @IsEnum(StatusParceria, { message: 'Status de parceria inválido.' })
  @IsOptional()
  status_parceria?: StatusParceria;
}