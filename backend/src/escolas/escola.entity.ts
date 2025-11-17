import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

// Enum para o tipo de instituição (conforme RF04)
export enum TipoInstituicao {
  ESCOLA_PUBLICA = 'escola_publica',
  ONG = 'ong',
  CRECHE = 'creche',
  OUTRO = 'outro',
}

// Enum para o status da parceria (conforme RF04)
export enum StatusParceria {
  PENDENTE = 'pendente',
  ATIVA = 'ativa',
  INATIVA = 'inativa',
}

@Entity('escolas') // O nome da tabela será 'escolas'
export class Escola {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  nome: string;

  @Column({
    type: 'enum',
    enum: TipoInstituicao,
  })
  tipo: TipoInstituicao;

  // Informações de Contato (opcionais)
  @Column({ nullable: true })
  contato_nome: string;

  @Column({ nullable: true })
  contato_email: string;

  @Column({ nullable: true })
  contato_telefone: string;

  @Column({
    type: 'enum',
    enum: StatusParceria,
    default: StatusParceria.PENDENTE,
  })
  status_parceria: StatusParceria;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}