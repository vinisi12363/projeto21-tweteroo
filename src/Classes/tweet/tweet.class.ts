export class Tweet {
  id: number;
  private _username: string;
  private _tweet: string;

  constructor(id: number, username: string, tweet: string) {
    this.id = id;
    this._username = username;
    this._tweet = tweet;
  }

  get username() {
    return this._username;
  }

  get tweet() {
    return this._tweet;
  }
}
