import {
  Body,
  CacheTTL,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseInterceptors,
} from '@nestjs/common';
import { AtualizarUsuarioDTO } from './dto/AtualizarUsuario.dto';
import { CriarUsuarioDTO } from './dto/CriarUsuario.dto';
import { UsuarioService } from './usuario.service';
import { ListarUsuarioDTO } from './dto/ListarUsuario.dto';
import { CacheInterceptor } from '@nestjs/cache-manager';
import { plainToInstance } from 'class-transformer';

@Controller('/usuarios')
export class UsuarioController {
  constructor(private usuarioService: UsuarioService) {}

  @Post()
  async criarUsuario(@Body() dadosDoUsuario: CriarUsuarioDTO) {
    return await this.usuarioService.criarUsuario(dadosDoUsuario);
  }

  @Get()
  @UseInterceptors(CacheInterceptor)
  @CacheTTL(60 * 1000 * 15)
  async listarUsuarios(@Body('email') email: string = null) {
    const usuariosSalvos = await this.usuarioService.listarUsuarios(
      plainToInstance(ListarUsuarioDTO, { email: email })
    );

    return usuariosSalvos;
  }

  @Put('/:id')
  async atualizarUsuario(
    @Param('id') id: string,
    @Body() novosDados: AtualizarUsuarioDTO,
  ) {
    const usuarioAtualizado = await this.usuarioService.atualizarUsuario(
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
}
