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

  @Get()
  getHealth() {
    return "I'm okay!";
  }

  @Post('sign-up')
  @HttpCode(200)
  createUser(@Body(ValidationPipe) body: CreateUserDto) {
    return this.appService.createUser(body);
  }

  @Post('tweets')
  createTweet(@Body(ValidationPipe) body: CreateTweetDto) {
    return this.appService.createTweet(body);
  }

  @Get('tweets')
  async getTweets(@Query(ValidationPipe) pageParam: PageType) {
    const { page } = pageParam;
    const tweets = await this.appService.listTweets(Number(page));
    return tweets;
  }

  @Get('tweets/:username')
  getUserTweets(@Param(ValidationPipe) param: ParamType) {
    const { username } = param;
    return this.appService.listUserTweets(username);
  }
}
