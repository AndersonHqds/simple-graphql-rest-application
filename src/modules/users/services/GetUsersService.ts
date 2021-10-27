import { getAll } from "jsons/users/json-handler";
import { injectable } from "tsyringe";

@injectable()
class GetUsersService {
  async execute() {
    const users = await getAll();
    return users;
  }
}

export { GetUsersService };
