import { PerfilEntity } from 'src/perfil/perfil.entity';
import { ProdutoEntity } from 'src/produto/produto.entity';
import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
  ManyToMany,
  OneToMany,
} from 'typeorm';

@Entity({ name: 'usuarios' })
export class UsuarioEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'nome', length: 100, nullable: false })
  nome: string;

  @Column({ name: 'email', length: 70, nullable: false })
  email: string;

  @Column({ name: 'senha', length: 255, nullable: false })
  senha: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: string;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: string;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: string;

  @ManyToMany(() => PerfilEntity, (perfil) => perfil.usuarios, { eager: true})
  perfis: PerfilEntity[];

  
  @OneToMany(() => ProdutoEntity, (produto) => produto.usuario, { nullable: true })
  produto: ProdutoEntity[];
}
