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

@Entity({ name: 'permissao' })
export class PermissaoEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'nome', nullable: false })
  nome: string;

  @CreateDateColumn({ name: 'created_at' })
  dataCriacao: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  dataAtualizacao: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  dataExclusao: Date;

  @ManyToMany(() => UsuarioEntity, (usuario) => usuario.permissoes)
  @JoinTable()
  usuarios: UsuarioEntity[];
}
