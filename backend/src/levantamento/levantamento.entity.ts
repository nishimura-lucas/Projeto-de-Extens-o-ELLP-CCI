import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

// Vamos criar alguns Enums para as perguntas do formulário
export enum FaixaRenda {
  ATE_1_MINIMO = 'ate_1_minimo',
  DE_1_A_2_MINIMOS = 'de_1_a_2_minimos',
  DE_2_A_3_MINIMOS = 'de_2_a_3_minimos',
  MAIS_DE_3_MINIMOS = 'mais_de_3_minimos',
}

export enum TipoMoradia {
  PROPRIA = 'propria',
  ALUGADA = 'alugada',
  CEDIDA = 'cedida',
}

@Entity('levantamentos') // O nome da tabela
export class Levantamento {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'int' })
  numero_membros_familia: number;

  @Column({
    type: 'enum',
    enum: FaixaRenda,
  })
  faixa_renda: FaixaRenda;

  @Column({
    type: 'enum',
    enum: TipoMoradia,
  })
  tipo_moradia: TipoMoradia;

  @Column()
  bairro: string;

  @Column({ type: 'boolean', default: false })
  possui_acesso_internet: boolean;

  @Column({ type: 'text', nullable: true })
  observacoes: string;

  // Nota: Não há 'tutorId' ou 'userId' para garantir o anonimato

  @CreateDateColumn()
  createdAt: Date;
}