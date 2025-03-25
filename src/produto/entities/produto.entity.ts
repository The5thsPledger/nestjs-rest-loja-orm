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
import { Min } from 'class-validator';

@Entity({ name: 'produtos' })
export class ProdutoEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'nome', length: 100, nullable: false })
  nome: string;
  
  @Column({ 
    name: 'valor', type: 'decimal', 
    precision: 10, scale: 2, default: 99999999.99, nullable: false
  })
  @Min(0.01, { message: 'O valor precisa ser maior que zero' })
  valor: number;
  
  @Column({ name: 'quantidade', nullable: false })
  quantidade: number;
  
  @Column({ name: 'descricao', length: 255, nullable: false })
  descricao: string;
  
  @Column({ name: 'categoria', length: 100, nullable: false })
  categoria: string;
  
  @CreateDateColumn({ name: 'created_at', select: false })
  dataCriacao?: Date;

  @UpdateDateColumn({ name: 'updated_at', select: false })
  dataAtualizacao?: Date;

  @DeleteDateColumn({ name: 'deleted_at', select: false })
  dataExclusao?: Date;

  @ManyToOne(() => UsuarioEntity, (usuario) => usuario.produtos, {
    nullable: false,
  })
  usuario?: UsuarioEntity;

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

  @ManyToOne(() => FornecedorEntity, (fornecedor) => fornecedor.produtos, {
    orphanedRowAction: 'delete',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  fornecedor: FornecedorEntity;

  constructor(partial: Partial<ProdutoEntity> = {}) {
    Object.assign(this, partial);
  }
}
