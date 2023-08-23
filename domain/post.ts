import { Account } from "./account";

export class Post {
  constructor(
    public readonly owner: Account,
    public readonly title: string,
    public readonly content: any,
  ){}
}