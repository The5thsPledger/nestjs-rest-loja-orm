import request from 'supertest';
import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from "src/app.module";
import { bootstrap } from 'src/main';
import { UsuarioEntity } from 'src/usuario/usuario.entity';
import { UsuarioRepository } from 'src/usuario/usuario.repository';

const mockRepository = {
    salvar: jest.fn().mockImplementation((usuarioEntity: UsuarioEntity) => {
        return usuarioEntity;
    }),
    // Mock other methods as needed (e.g., find, delete, etc.)
};

let app: INestApplication;
let server: { close: () => any; }
beforeAll(async () => {
    app = await bootstrap();
    const moduleFixture: TestingModule = await Test.createTestingModule({
        imports: [AppModule],
    }).overrideProvider(UsuarioRepository).useValue(mockRepository).compile();

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

test('Testa a rota de criação de usuários', async () => {
  const produto = await request(server)
    .post('/usuarios')
    .send({
      nome: 'Usuário 1',
    })
    .expect(201);
  expect(produto.body.usuario).toMatchObject({
    nome: 'Usuário 1',
  });
});

test('Testa a rota de listagem de usuários', async () => {
  await request(server)
    .get('/usuarios')
    .expect(200);
});