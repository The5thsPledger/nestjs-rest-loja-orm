import { UsuarioEntity } from 'src/usuario/usuario.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  UpdateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';

@Entity({ name: 'perfis' })
export class PerfilEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'nome', nullable: false })
  nome: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: string;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: string;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: string;

  @ManyToMany(() => UsuarioEntity, (usuario) => usuario.perfis)
  @JoinTable()
  usuarios: UsuarioEntity[];
}
