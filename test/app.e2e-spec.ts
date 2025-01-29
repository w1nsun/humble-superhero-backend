import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { App } from 'supertest/types';
import { MainModule } from '../src/main.module';

describe('SuperheroController (e2e)', () => {
  let app: INestApplication<App>;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [MainModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('Successfully create Thor (POST)', () => {
    return request(app.getHttpServer())
      .post('/superheroes')
      .send({
        name: 'Thor',
        super_power: 'Thunder',
        humility_score: 6,
      })
      .expect(HttpStatus.CREATED)
      .expect(resp => {
        const { body } = resp;

        expect(body.id).toBeDefined();

        delete body.id;

        expect(body).toEqual({
          name: 'Thor',
          super_power: 'Thunder',
          humility_score: 6,
        });
      });
  });

  it('Successfully create IronMan (POST)', () => {
    return request(app.getHttpServer())
      .post('/superheroes')
      .send({
        name: 'IronMan',
        super_power: 'Suit',
        humility_score: 9,
      })
      .expect(HttpStatus.CREATED)
      .expect(resp => {
        const { body } = resp;

        expect(body.id).toBeDefined();

        delete body.id;

        expect(body).toEqual({
          name: 'IronMan',
          super_power: 'Suit',
          humility_score: 9,
        });
      });
  });

  it('Validation error on create superhero (POST)', () => {
    return request(app.getHttpServer())
      .post('/superheroes')
      .send({
        name: 'Thor',
        super_power: 'Thunder',
        humility_score: 22,
      })
      .expect(HttpStatus.BAD_REQUEST)
      .expect(resp => {
        const { body } = resp;

        expect(body.message).toEqual('Validation failed');
        expect(body.errors[0].code).toEqual('too_big');
        expect(body.errors[0].message).toEqual('Number must be less than or equal to 10');
      });
  });

  it('Get all superheroes (GET)', () => {
    return request(app.getHttpServer())
      .get('/superheroes')
      .expect(HttpStatus.OK)
      .expect(resp => {
        const { body } = resp;

        expect(body).toEqual([
          {
            id: expect.any(String),
            name: 'IronMan',
            super_power: 'Suit',
            humility_score: 9,
          },
          {
            id: expect.any(String),
            name: 'Thor',
            super_power: 'Thunder',
            humility_score: 6,
          },
        ]);
      });
  });
});
