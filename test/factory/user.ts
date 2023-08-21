import * as request from 'supertest';
import { INestApplication } from '@nestjs/common';

type LoginBody = {
  username: string;
  avatar: string;
};

export async function signUp(app: INestApplication, body: LoginBody) {
  return await request(app.getHttpServer()).post('/sign-up').send(body);
}
