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
import { ProdutoImagemEntity } from './produto-imagem.entity';
import { ProdutoCaracteristicaEntity } from './produto-caracteristica.entity';
import { FornecedorEntity } from 'src/fornecedor/fornecedor.entity';
import { UsuarioEntity } from 'src/usuario/usuario.entity';

@Entity({ name: 'produtos' })
export class ProdutoEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() =>UsuarioEntity, (usuario) => usuario.produto, { nullable: false })
  usuario: UsuarioEntity;

  @Column({ name: 'nome', length: 100, nullable: false })
  nome: string;

  @Column({ name: 'valor', nullable: false })
  valor: number;

  @Column({ name: 'quantidade', nullable: false })
  quantidade: number;

  @Column({ name: 'descricao', length: 255, nullable: false })
  descricao: string;

  @Column({ name: 'categoria', length: 100, nullable: false })
  categoria: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: string;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: string;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: string;

  @OneToMany(
    () => ProdutoImagemEntity,
    (produtoImageEntity) => produtoImageEntity.produto,
    { cascade: true, eager: true },
  )
  imagens: ProdutoImagemEntity[];

  @OneToMany(
    () => ProdutoCaracteristicaEntity,
    (produtoCaracteristicaEntity) => produtoCaracteristicaEntity.produto,
    { cascade: true, eager: true },
  )
  caracteristicas: ProdutoCaracteristicaEntity[];

  @ManyToOne(
    () => FornecedorEntity, (fornecedor) => fornecedor.produtos, {
      orphanedRowAction: 'delete',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    }
  )
  fornecedor: FornecedorEntity;
}
