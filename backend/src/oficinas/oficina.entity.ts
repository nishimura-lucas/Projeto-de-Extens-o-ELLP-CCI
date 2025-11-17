import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne, // 1. (IMPORTANTE) Vamos usar isto para a Relação
} from 'typeorm';
import { User } from '../auth/user.entity'; // 2. Vamos importar a Entidade User

@Entity('oficinas') // O nome da tabela será 'oficinas'
export class Oficina {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  tema: string; // Coluna "tema"

  @Column({ type: 'text' })
  descricao: string; // Coluna "descrição"

  @Column()
  publico_alvo: string; // Coluna "público-alvo"

  @Column({ type: 'timestamp' })
  data_inicio: Date; // Coluna "data" (início)

  @Column({ type: 'timestamp' })
  data_fim: Date; // Coluna "data" (fim)

  // 3. (A RELAÇÃO) Muitos-para-Um
  // Muitas oficinas podem pertencer a UM Utilizador (Professor/Tutor)
  @ManyToOne(() => User, (user) => user.oficinas, {
    onDelete: 'SET NULL', // Se o professor for apagado, a oficina fica sem tutor
  })
  tutor: User; // Esta coluna vai guardar o 'id' do professor

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}