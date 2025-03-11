import { Body, Controller, Post } from "@nestjs/common";
import { PerfilService } from "./perfil.service";
import { CriaPerfilDTO } from "./dto/CriaPerfil.dto";

@Controller("/perfil")
export class PerfilController {
    constructor(private perfilService : PerfilService) {}

    @Post()
    async criaPerfil(@Body() dadosPerfil: CriaPerfilDTO) {
        await this.perfilService.criaPerfil(dadosPerfil);
    }
}