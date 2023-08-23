import { Account } from "../domain/account";
import {
  AccountRepository,
  NotificationDispatcher,
} from "../domain/interfaces";
import { Post } from "../domain/post";

type TEvent = {
  post: Post;
  follower: Account;
};

export class NotifyPostCreatedUseCase {
  // In the constructor, we inject the dependencies that the use case needs to work.
  constructor(
    private readonly accountRepository: AccountRepository,
    private readonly notificationDispatcher: NotificationDispatcher<TEvent>
  ) {}

  // The execute method is the entry point of the use case.
  async execute(post: Post) {
    const followers = await this.accountRepository.getAccountFollowers(
      post.owner
    );
    await Promise.all(
      followers.map((follower) =>
        this.notificationDispatcher.dispatch({
          name: "notify-post.created",
          data: {
            post,
            follower,
          },
        })
      )
    );
  }
}
