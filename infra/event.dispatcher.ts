import { EventDispatcher, Events } from "../domain/interfaces";

export class EventDispatcherImpl implements EventDispatcher {
  private readonly listeners: Map<Events, Array<(data: any) => Promise<void>>> =
    new Map();

  static instance = new EventDispatcherImpl();

  private constructor() {}

  static getInstance(): EventDispatcherImpl {
    return EventDispatcherImpl.instance;
  }

  async dispatch<T>(params: { name: Events; data: T }): Promise<void> {
    const listeners = this.listeners.get(params.name);
    if (listeners) {
      await Promise.all(listeners.map((listener) => listener(params.data)));
    }
  }

  async register<T>(params: {
    name: Events;
    callback: (data: T) => Promise<void>;
  }): Promise<void> {
    const listeners = this.listeners.get(params.name);
    if (listeners) {
      listeners.push(params.callback);
    } else {
      this.listeners.set(params.name, [params.callback]);
    }
  }
}
