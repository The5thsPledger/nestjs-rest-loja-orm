import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PerfilEntity } from "./perfil.entity";
import { PerfilController } from "./perfil.controller";
import { PerfilService } from "./perfil.service";
import { PerfilRepository } from "./perfil.repository";
import { IsNomeUnicoValidator } from "./validacao/is-nome-unico.validator";

@Module({
    imports: [TypeOrmModule.forFeature([PerfilEntity])],
    controllers: [PerfilController],
    providers: [PerfilService, PerfilRepository, IsNomeUnicoValidator]
})
export class PerfilModule {}