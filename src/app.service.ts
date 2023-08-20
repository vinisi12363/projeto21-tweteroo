import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CreateUserDto } from './DTO/user.dto';
import { CreateTweetDto } from './DTO/tweet.dto';
import { User } from './classes/user.class';
import { Tweet } from './classes/tweet.class';


@Injectable()
export class AppService {
  private  tweets: Tweet[] = []  
  private users: User[]  = [] 
  
  findByUsername (username:string){
    return new Promise<User>((resolve) => {
      const result=this.users.find((user) => user.username === username)
      resolve(result);
    });
  }

  //createUser
  async createUser(body:CreateUserDto){
    const {username, avatar} = body;
    const id = this.users.length+1;

    const userAlreadyExist = this.findByUsername(username);
    if (userAlreadyExist){
      throw new HttpException(
        'this username already in use',
        HttpStatus.CONFLICT,
      );
    }

    return new Promise<User>(()=>{
      this.users.push(new User(id, username, avatar));
    });

  }

  //createTweet
  async createTweet(body:CreateTweetDto){
      const {username , tweet} = body;
      const id = this.tweets.length+1;
      const userAlreadyExist = this.findByUsername(username);
      if (!userAlreadyExist){
        throw new HttpException(
          'User not authorized',
          HttpStatus.UNAUTHORIZED,
        );
      }

      return new Promise<Tweet>(()=>{
        this.tweets.push(new Tweet(id, username, tweet));
      });

  }
  // listTweets
  
  async listTweets(MIN: number, MAX: number) {
    return new Promise((resolve) => {
      const tweetsList = [...this.tweets].reverse().slice(MIN, MAX);
      const lastTweets = tweetsList.map((anyTweet) => {
        const selectedUser = this.users.find(
          (user) => user.username === anyTweet.username,
        );
        return {
          avatar: selectedUser.avatar,
          username: selectedUser.username,
          tweet: anyTweet.tweet,
        };
      });

      resolve(lastTweets);
    });
  }

  async listUserTweets(name: string) {
    return new Promise((resolve) => {
      const selectedTweets = this.tweets.filter(
        (tweet) => tweet.username === name && tweet,
      );
      const userTweets = selectedTweets.map((userTweet) => {
        const selectedUser = this.users.find(
          (user) => user.username === userTweet.username,
        );
        return {
          avatar: selectedUser.avatar,
          username: selectedUser.username,
          tweet: userTweet.tweet,
        };
      });
      resolve(userTweets);
    });
  }




}
