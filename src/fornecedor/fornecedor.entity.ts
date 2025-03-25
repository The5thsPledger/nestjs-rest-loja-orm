import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne,
  Unique,
} from 'typeorm';
import { ProdutoEntity } from 'src/produto/entities/produto.entity';
import { UsuarioEntity } from 'src/usuario/usuario.entity';

@Entity({ name: 'fornecedores' })
export class FornecedorEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  
  @Column({ name: 'nome', length: 100, nullable: false })
  nome: string;

  @Column()
  @Unique('cnpj', ['cnpj'])
  cnpj: number;
  
  @Column()
  endereco: string;
  
  @Column()
  telefone: number;

  @Column()
  email: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt?: string;
  
  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt?: string;
  
  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt?: string;
  
  @ManyToOne(() => UsuarioEntity, (usuario) => usuario.id, { nullable: false })
  usuario?: UsuarioEntity;

  @OneToMany(() => ProdutoEntity, (produtoEntity) => produtoEntity.fornecedor, {
    cascade: true,
    eager: true,
  })
  produtos?: ProdutoEntity[];

  constructor(partial: Partial<FornecedorEntity> = {}) {
    Object.assign(this, partial);
  }
}
