import * as request from 'supertest';
import { INestApplication } from '@nestjs/common';

type TweetBody = {
  username: string;
  tweet: string;
};

export async function tweetByUser(app: INestApplication, body: TweetBody) {
  return request(app.getHttpServer()).post('/tweets').send(body);
}
