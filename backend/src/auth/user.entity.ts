import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';

import { Oficina } from '../oficinas/oficina.entity';
    export enum UserStatus {
      PENDING = 'pending',
      APPROVED = 'approved',
      REJECTED = 'rejected',
    }
    export enum UserRole {
      ADMIN = 'admin',
      PROFESSOR = 'professor',
      VOLUNTEER = 'volunteer',
    }
    
    @Entity({ name: 'users' })
    export class User {
      @PrimaryGeneratedColumn('uuid')
      id: string;
    
      @Column({ unique: true })
      email: string;
    
      @Column()
      name: string;
    
      @Column()
      password: string;
    
      @Column({
        type: 'enum',
        enum: UserRole,
        default: UserRole.VOLUNTEER,
      })
      role: UserRole;

      @Column({
        type: 'enum',
        enum: UserStatus,
        default: UserStatus.PENDING, // 3. IMPORTANTE: Todo o novo registo será 'pendente'
      })
      status: UserStatus;
    
      @CreateDateColumn()
      createdAt: Date;
    
      @UpdateDateColumn()
      updatedAt: Date;

      @OneToMany(() => Oficina, (oficina) => oficina.tutor)
      oficinas: Oficina[];
    }

