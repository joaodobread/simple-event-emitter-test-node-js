import {
  AccountRepository,
  EventDispatcher,
  PostRepository,
} from "../domain/interfaces";
import { Post } from "../domain/post";

export class CreatePostUseCase {
  // In the constructor, we inject the dependencies that the use case needs to work.
  constructor(
    private readonly postRepository: PostRepository,
    private readonly accountRepository: AccountRepository,
    private readonly eventDispatcher: EventDispatcher
  ) {}

  // The execute method is the entry point of the use case.
  async execute(params: {
    accountId: string;
    post: { title: string; content: string };
  }) {
    const account = await this.accountRepository.findById(params.accountId);
    if (!account) {
      throw new Error("Account not found");
    }
    const post = new Post(account, params.post.title, params.post.content);
    await this.postRepository.save(post);
    // We dispatch the event to notify the post was created.
    await this.eventDispatcher.dispatch({
      name: "notify-post.created",
      data: post,
    });
  }
}
