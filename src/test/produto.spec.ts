import request from 'supertest';
import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from "src/app.module";
import { ProdutoRepository } from 'src/produto/produto.repository';
import { ProdutoEntity } from 'src/produto/entities/produto.entity';
import { bootstrap } from 'src/main';

const mockRepository = {
    salvar: jest.fn().mockImplementation((produtoEntity: ProdutoEntity) => {
        return produtoEntity;
    }),
    // Mock other methods as needed (e.g., find, delete, etc.)
};

let app: INestApplication;
let server: { close: () => any; }
beforeAll(async () => {
    app = await bootstrap();
    const moduleFixture: TestingModule = await Test.createTestingModule({
        imports: [AppModule],
    }).overrideProvider(ProdutoRepository).useValue(mockRepository).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
    server = app.getHttpServer()
});

afterAll(async () => {  
  await server.close();
  await app.close();
  process.removeAllListeners();
  
  // const handles = (process as any)._getActiveHandles();
  // console.log('Open handles:', handles);
});

test('Testa a rota de criação de produtos', async () => {
  const produto = await request(server)
    .post('/produtos')
    .send({
      nome: 'Produto 1',
      valor: 100,
      quantidade: 1,
      categoria: 'Categoria 1',
    })
    .expect(201);
  expect(produto.body).toMatchObject({
    nome: 'Produto 1',
    valor: 100,
    categoria: 'Categoria 1',
  });
});

test('Testa a rota de listagem de produtos', async () => {
  await request(server)
    .get('/produtos')
    .expect(200);
});

  // // Testa a rota de atualização de produtos
  // const produtoAtualizado = await request(app.getHttpServer())
  //   .put(`/produtos/${produto.body.id}`)
  //   .send({
  //     nome: 'Produto 2',
  //     valor: 20.0,
  //     categoria: 'Categoria 2',
  //   })
  //   .expect(200);
  // expect(produtoAtualizado.body).toMatchObject({
  //   nome: 'Produto 2',
  //   valor: 20.0,
  //   categoria: 'Categoria 2',
  // });
  //
  // // Testa a rota de remoção de produtos
  // const produtoRemovido = await request(app.getHttpServer())
  //   .delete(`/produtos/${produto.body.id}`)
  //   .expect(200);
  // expect(produtoRemovido.body).toMatchObject({
  //   nome: 'Produto 2',
  //   valor: 20.0,
  //   categoria: 'Categoria 2',
  // });
