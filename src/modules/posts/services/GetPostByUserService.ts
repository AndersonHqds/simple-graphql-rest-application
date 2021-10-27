import { injectable } from "tsyringe";
import { getPost } from "jsons/posts/json-handler";

@injectable()
class GetPostByUserService {
  async execute(id: String) {
    const posts = await getPost({ author: id})
    return posts;
  }
}

export { GetPostByUserService };
