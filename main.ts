import { CreatePostFactory } from "./factories/create-post.factory";
import {
  NotifyPostCreatedFactory,
  NotifyPostCreatedFactoryLogger,
} from "./factories/notify-post-created.factory";
import { EventDispatcherImpl } from "./infra/event.dispatcher";

const bootstrap = async () => {
  const createPostUseCase = CreatePostFactory.create();
  const notifyPostCreatedUseCase = NotifyPostCreatedFactory.create();
  const notifyEmail = NotifyPostCreatedFactoryLogger.create();

  const eventDispatcher = EventDispatcherImpl.getInstance();

  await eventDispatcher.register({
    name: "notify-post.created",
    callback: notifyPostCreatedUseCase.execute.bind(notifyPostCreatedUseCase),
  });
  eventDispatcher.register({
    name: "notify-post.created",
    callback: notifyEmail.execute.bind(notifyEmail),
  });

  eventDispatcher.register({
    name: "notify-post.created",
    callback: async (data) => console.log(`Second listener: ${data}`),
  });

  await createPostUseCase.execute({
    accountId: "1",
    post: {
      title: "My first post",
      content: "Hello world!",
    },
  });
};

bootstrap();
