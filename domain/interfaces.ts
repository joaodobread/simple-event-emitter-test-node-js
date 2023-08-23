import { Account } from "./account";

export type Events =
  | "post.created"
  | "post.updated"
  | "post.deleted"
  | "notify-post.created";

export interface PostRepository {
  save(params: any): Promise<void>;
}

export interface AccountRepository {
  findById(id: string): Promise<Account | null>;
  getAccountFollowers(account: Account): Promise<Account[]>;
}

export interface EventDispatcher {
  register<T>(params: {
    name: Events;
    callback: (data: T) => Promise<void>;
  }): Promise<void>;

  dispatch<T>(params: { name: Events; data: T }): Promise<void>;
}

export interface NotificationDispatcher<T> {
  dispatch(params: { name: Events; data: T }): Promise<void>;
}
