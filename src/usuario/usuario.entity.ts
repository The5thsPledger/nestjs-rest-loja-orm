import { PermissaoEntity } from 'src/permissao/permissao.entity';
import { ProdutoEntity } from 'src/produto/entities/produto.entity';
import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
  ManyToMany,
  OneToMany,
  Unique,
} from 'typeorm';

@Entity({ name: 'usuarios' })
export class UsuarioEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'nome', length: 100, nullable: false })
  nome: string;

  @Column({ name: 'email', length: 70, nullable: false })
  @Unique('email', ['email'])
  email: string;

  @Column({ name: 'senha', length: 255, nullable: false, select: false })
  senha?: string;

  @CreateDateColumn({ name: 'created_at', select: false })
  dataCriacao?: Date;

  @UpdateDateColumn({ name: 'updated_at', select: false })
  dataAtualizacao?: Date;

  @DeleteDateColumn({ name: 'deleted_at', select: false })
  dataExclusao?: Date;

  @ManyToMany(() => PermissaoEntity, (perfil) => perfil.usuarios, { eager: true })
  permissoes: PermissaoEntity[];

  @OneToMany(() => ProdutoEntity, (produto) => produto.usuario, {
    nullable: true,
  })
  produtos?: ProdutoEntity[];

  constructor(partial: Partial<UsuarioEntity> = {}) {
    Object.assign(this, partial);
  }
}