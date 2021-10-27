import { User } from "@models/User";
import { create } from "jsons/users/json-handler";
import { injectable } from "tsyringe";

@injectable()
class CreateUserService {
  async execute({ name, username }: Omit<User, "createdAt">) {
    const user = await create({ name, username });

    return user;
  }
}

export { CreateUserService };
