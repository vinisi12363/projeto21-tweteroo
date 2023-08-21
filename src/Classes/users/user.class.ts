export class User {
  private _id: number;
  private _username: string;
  private _avatar: string;

  constructor(id: number, username: string, avatar: string) {
    this._id = id;
    this._username = username;
    this._avatar = avatar;
  }

  public get username() {
    return this._username;
  }

  public get avatar() {
    return this._avatar;
  }
}
