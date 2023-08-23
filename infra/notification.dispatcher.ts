import { Account } from "../domain/account";
import { Events, NotificationDispatcher } from "../domain/interfaces";
import { Post } from "../domain/post";

type TEvent = {
  post: Post;
  follower: Account;
};

export class NotificationDispatcherLogger
  implements NotificationDispatcher<TEvent>
{
  dispatch<T>(params: { name: Events; data: T }): Promise<void> {
    console.log(`Event ${params.name} dispatched`, params.data);
    return Promise.resolve();
  }
}

export class NotificationDispatcherEmail
  implements NotificationDispatcher<TEvent>
{
  dispatch(params: { name: Events; data: TEvent }): Promise<void> {
    console.log(
      `Email ${params.name} sent to ${params.data.follower.email}`,
      params.data
    );
    return Promise.resolve();
  }
}
