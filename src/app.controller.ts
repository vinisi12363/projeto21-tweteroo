import {
  Controller,
  Query,
  Get,
  Post,
  HttpCode,
  HttpStatus,
  HttpException,
  Body,
  Param,
  ValidationPipe,
} from '@nestjs/common';
import { AppService } from './app.service';
import { CreateUserDto } from './DTO/user.dto';
import { CreateTweetDto } from './DTO/tweet.dto';

type PageType = { page: string };
type ParamType = { username: string };

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  getHello(): string {
    return 'Hello World!';
  }

  @Post('sign-up')
  @HttpCode(200)
  createUser(@Body(new ValidationPipe()) body: CreateUserDto) {
    return this.appService.createUser(body);
  }

  @Post('tweets')
  createTweet(@Body(new ValidationPipe()) body: CreateTweetDto) {
    return this.appService.createTweet(body);
  }

  @Get('tweets')
  async getTweets(@Query(new ValidationPipe()) pageParam: PageType) {
    const { page } = pageParam;
    let MIN = 0;
    let MAX = 15;
    const MINIMUM = 0;

    if (page) {
      if (Number(page) > MINIMUM) {
        const pageNumber = Number(page);
        MAX = pageNumber * 15;
        MIN = MAX - 15;
      } else {
        throw new HttpException('invalid page number', HttpStatus.BAD_REQUEST);
      }
    }
    const tweets = await this.appService.listTweets(MIN, MAX);
    return tweets;
  }

  @Get('tweets/:username')
  getUserTweets(@Param(new ValidationPipe()) param: ParamType) {
    const { username } = param;
    return this.appService.listUserTweets(username);
  }
}
