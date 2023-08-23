import { Account } from "../domain/account";
import { AccountRepository } from "../domain/interfaces";

export class AccountMemoryRepository implements AccountRepository {  
  async getAccountFollowers (account: Account): Promise<Account[]> {
    return [
      new Account('2', 'Jane Doe', 'jane@teste.com',),
      new Account('3', 'Pedro Doe', 'pedro@teste.com',),
      new Account('4', 'Foo Doe', 'foo@teste.com',)
    ]
  }

  async findById (id: string): Promise<Account | null> {
    return new Account(id, 'John Doe', 'john.doe@teste.com')
  }
}