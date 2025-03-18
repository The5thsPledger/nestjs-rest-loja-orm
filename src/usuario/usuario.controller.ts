import {
  Body,
  CacheTTL,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  UseInterceptors,
} from '@nestjs/common';
import { AtualizaUsuarioDTO } from './dto/AtualizaUsuario.dto';
import { CriaUsuarioDTO } from './dto/CriaUsuario.dto';
import { UsuarioService } from './usuario.service';
import { PermissaoUsuarioDTO } from 'src/perfil/dto/PermissaoUsuario.dto';
import { ListaUsuarioDTO } from './dto/ListaUsuario.dto';
import { CacheInterceptor } from '@nestjs/cache-manager';

@Controller('/usuarios')
export class UsuarioController {
  constructor(private usuarioService: UsuarioService) {}

  @Post()
  async criaUsuario(@Body() dadosDoUsuario: CriaUsuarioDTO) {
    return await this.usuarioService.criaUsuario(dadosDoUsuario);
  }

  @Get()
  @UseInterceptors(CacheInterceptor)
  @CacheTTL(60 * 1000 * 15)
  async listarUsuarios(@Body('email') email: string = null) {
    const usuariosSalvos = await this.usuarioService.listarUsuarios(
      new ListaUsuarioDTO(null, null, email),
    );

    return usuariosSalvos;
  }

  @Put('/:id')
  async atualizarUsuario(
    @Param('id') id: string,
    @Body() novosDados: AtualizaUsuarioDTO,
  ) {
    const usuarioAtualizado = await this.usuarioService.atualizaUsuario(
      id,
      novosDados,
    );

    return {
      usuario: usuarioAtualizado,
      messagem: 'usuário atualizado com sucesso',
    };
  }

  @Delete('/:id')
  async removerUsuario(@Param('id') id: string) {
    const usuarioRemovido = await this.usuarioService.deletaUsuario(id);

    return {
      usuario: usuarioRemovido,
      messagem: 'usuário removido com suceso',
    };
  }

  @Patch()
  async permissaoUsuario(@Body() permissaoUsuario: PermissaoUsuarioDTO) {
    return await this.usuarioService.permissaoUsuario(permissaoUsuario);
  }
}
