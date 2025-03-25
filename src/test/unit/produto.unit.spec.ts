import { INestApplication } from "@nestjs/common";
import { TestingModule, Test } from "@nestjs/testing";
import { plainToInstance } from "class-transformer";
import { AppModule } from "src/app.module";
import { bootstrap } from "src/main";
import { ProdutoDTO } from "src/produto/dto/Produto.dto";
import { ProdutoEntity } from "src/produto/entities/produto.entity";

let app: INestApplication;
let server: { close: () => any; }
beforeAll(async () => {
    app = await bootstrap();
    const moduleFixture: TestingModule = await Test.createTestingModule({
        imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
    server = app.getHttpServer()
});

afterAll(async () => {  
  await server.close();
  await app.close();
  process.removeAllListeners();
});

test('Testa a consistência do modelo de criação de produto', async () => {
    const produto = plainToInstance(ProdutoDTO, {
        nome: 'Produto 1',
        valor: 100,
        quantidade: 1,
        categoria: 'Categoria 1',
    });
    return new ProdutoEntity(produto);
}); 