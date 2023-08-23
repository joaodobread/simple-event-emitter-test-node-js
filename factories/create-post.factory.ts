import { AccountMemoryRepository } from "../infra/account.repository";
import { EventDispatcherImpl } from "../infra/event.dispatcher";
import { PostMemoryRepository } from "../infra/post.repository";
import { CreatePostUseCase } from "../use-cases/create-post.use-case";

export class CreatePostFactory {
  static create(): CreatePostUseCase {
    return new CreatePostUseCase(
      new PostMemoryRepository(),
      new AccountMemoryRepository(),
      EventDispatcherImpl.getInstance()
    );
  }
}
