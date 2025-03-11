import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { ProdutoEntity } from 'src/produto/produto.entity';
import { UsuarioEntity } from 'src/usuario/usuario.entity';

@Entity({ name: 'fornecedores' })
export class FornecedorEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => UsuarioEntity, (usuario) => usuario.id, { nullable: false })
  usuario: UsuarioEntity;

  @Column({ name: 'nome', length: 100, nullable: false })
  nome: string;

  @Column({ name: 'valor', nullable: false })
  cnpj: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: string;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: string;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: string;

  @OneToMany(
    () => ProdutoEntity,
    (produtoEntity) => produtoEntity.fornecedor,
    { cascade: true, eager: true },
  )
  produtos: ProdutoEntity[];
}
