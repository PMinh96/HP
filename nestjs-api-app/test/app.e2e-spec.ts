import { Test } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { PrismaService } from '../src/prisma/prisma.service';
import * as pactum from 'pactum'
import { title } from 'process';

const PORT = 3003
describe('App EndToEnd tests', () => {
  let app: INestApplication;
  let prismaService: PrismaService
  beforeAll(async () => {
    const appModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    app = appModule.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init()
    await app.listen(3003)
    prismaService = app.get(PrismaService)
    await prismaService.cleanDatabase()
    pactum.request.setBaseUrl(`http://localhost:${PORT}`)
  });
  describe('test Authentication', () => {
    describe('Register', () => {
      it('should Register', () => {
        return pactum.spec().post('/auth/register')
          .withBody({
            email: 'testemail01@gmail.com',
            password: 'a123456'
          })
          .expectStatus(201)
        //.inspect()

      })
    })
    describe('Login', () => {
      it('should Register', () => {
        return pactum.spec().post('/auth/Login')
          .withBody({
            email: 'testemail01@gmail.com',
            password: 'a123456'
          })
          .expectStatus(201)
          //.inspect()
          .stores('accessToken', "accessToken")
      })
    })
    describe('User', () => {
      describe('get Detail User', () => {
        it('should get detail user', () => {
          return pactum.spec()
            .get('/users/me')
            .withHeaders({
              Authorization: 'Bearer $S{accessToken}'
            })
            .expectStatus(200)
            .inspect()
        })
      })
    })
  })
  describe('note', () => {
    describe('insert Note', () => {
      it('insert first note', () => {
        return pactum.spec()
          .post('/notes')
          .withHeaders({
            Authorization: 'Bearer $S{accessToken}',
          })
          .withBody({
            title: "this is title autotest",
            description: "this is description autotest",
            url: "this is url autotest"
          })
          .expectStatus(201)
          .stores('noteId01', 'id')
          .inspect()
      })
      it('insert secord note', () => {
        return pactum.spec()
          .post('/notes')
          .withHeaders({
            Authorization: 'Bearer $S{accessToken}',
          })
          .withBody({
            title: "this is title autotest 002",
            description: "this is description autotest 002",
            url: "this is url autotest 002"
          })
          .expectStatus(201)
          .stores('noteId02', 'id')
          .inspect()
      })

      it('Get Note by id', () => {
        return pactum.spec()
          .get('/notes')
          .withHeaders({
            Authorization: 'Bearer $S{accessToken}'
          })
          .withPathParams('id', '${nodeId01}')
          .expectStatus(200)
          .inspect()
      })
      it('Get all note', () => {
        return pactum.spec()
          .get('/notes')
          .withHeaders({
            Authorization: 'Bearer $S{accessToken}'
          })
          .expectStatus(200)
          .inspect()
      })
      it('delete note by ID', () => {
        return pactum.spec()
          .delete('/notes')
          .withHeaders({
            Authorization: 'Bearer $S{accessToken}'
          })
          .withQueryParams('id', '$S{noteId02}')
          .expectStatus(200)
          .inspect()
      })
    })
  })
  afterAll(async () => {
    app.close;
  });
  it.todo('should PASS, h aha 000 ha');
  it.todo('should PASS, h aha 111 ha');
});


