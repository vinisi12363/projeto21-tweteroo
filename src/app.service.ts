import { Injectable, HttpStatus, HttpException } from '@nestjs/common';
import { CreateUserDto } from './DTO/user.dto';
import { CreateTweetDto } from './DTO/tweet.dto';
import { User } from './Classes/users/user.class';
import { Tweet } from './Classes/tweet/tweet.class';

@Injectable()
export class AppService {
  private tweets: Tweet[] = [];
  private users: User[] = [];

  async findByUsername(username: string): Promise<User | null> {
    return this.users.find((user) => user.username === username) || null;
  }

  async createUser(body: CreateUserDto): Promise<User> {
    const { username, avatar } = body;
    
    const userAlreadyExist = await this.findByUsername(username);
    if (userAlreadyExist) {
      throw new HttpException('This username is already in use', HttpStatus.CONFLICT);
    }

    const id = this.users.length + 1;
    const newUser = new User(id, username, avatar);
    this.users.push(newUser);
    return newUser;
  }

  async createTweet(body: CreateTweetDto): Promise<Tweet> {
    const { username, tweet } = body;

    const user = await this.findByUsername(username);
    if (!user) {
      throw new HttpException('User not authorized', HttpStatus.UNAUTHORIZED);
    }

    const id = this.tweets.length + 1;
    const newTweet = new Tweet(id, username, tweet);
    this.tweets.push(newTweet);
    return newTweet;
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

  async listTweets(page:number): Promise<any[]> {
    if(page < 1) 
      throw new HttpException('invalid page number', HttpStatus.BAD_REQUEST);
    if(!page){
      
      const lastTweets = this.tweets
      .slice(this.tweets.length - 15 , this.tweets.length)
      .map((t) => {
        const user = this.users.find((user)=> user.username === t.username)
        return {
          username: t.username,
          avatar: user  ? user.avatar : '',
          tweet: t.tweet
        }
      })
      return lastTweets;
    }else {
      const tweetsInPage=15;
      const initialIndex = (page-1) * tweetsInPage;
      const endIndex = initialIndex + tweetsInPage;

      
      const arrayOfTweets = this.tweets
      .slice(initialIndex , endIndex)
      .map((t) => {
        const user = this.users.find((user)=> user.username === t.username)
        return {
          username: t.username,
          avatar: user  ? user.avatar : '',
          tweet: t.tweet
        }
      })
      return arrayOfTweets;


    }
    
  }
}
