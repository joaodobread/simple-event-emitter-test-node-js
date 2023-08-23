import { AccountMemoryRepository } from "../infra/account.repository";
import {
  NotificationDispatcherEmail,
  NotificationDispatcherLogger,
} from "../infra/notification.dispatcher";
import { NotifyPostCreatedUseCase } from "../use-cases/notify-post-created.use-case";

export class NotifyPostCreatedFactory {
  static create(): NotifyPostCreatedUseCase {
    return new NotifyPostCreatedUseCase(
      new AccountMemoryRepository(),
      new NotificationDispatcherEmail()
    );
  }
}

export class NotifyPostCreatedFactoryLogger {
  static create(): NotifyPostCreatedUseCase {
    return new NotifyPostCreatedUseCase(
      new AccountMemoryRepository(),
      new NotificationDispatcherLogger()
    );
  }
}
