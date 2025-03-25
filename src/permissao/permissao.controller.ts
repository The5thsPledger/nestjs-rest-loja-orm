import { Body, Controller, Get, Post } from '@nestjs/common';
import { PermissaoService } from './permissao.service';
import { CriarPermissaoDTO } from './dto/CriarPermissao.dto';

@Controller('/permissao')
export class PermissaoController {
  constructor(private permissaoService: PermissaoService) {}

  @Post()
  async criarPermissao(@Body() permissao: CriarPermissaoDTO) {
    return await this.permissaoService.criarPermissao(permissao);
  }

  @Get()
  async listarPermissoes() {
    return await this.permissaoService.listarPermissoes();
  }
}
