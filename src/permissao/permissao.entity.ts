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
  Unique,
} from 'typeorm';

@Entity({ name: 'permissoes' })
export class PermissaoEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'nome', nullable: false })
  @Unique('nome', ['nome'])
  nome: string;

  @CreateDateColumn({ name: 'created_at', select: false })
  dataCriacao?: Date;

  @UpdateDateColumn({ name: 'updated_at', select: false })
  dataAtualizacao?: Date;

  @DeleteDateColumn({ name: 'deleted_at', select: false })
  dataExclusao?: Date;

  @ManyToMany(() => UsuarioEntity, (usuario) => usuario.permissoes)
  @JoinTable()
  usuarios?: UsuarioEntity[];
}
