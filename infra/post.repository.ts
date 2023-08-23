import { PostRepository } from "../domain/interfaces";

export class PostMemoryRepository implements PostRepository {
  save (params: any): Promise<void> {
    console.log('Post saved', params)
    return Promise.resolve()
  }
}