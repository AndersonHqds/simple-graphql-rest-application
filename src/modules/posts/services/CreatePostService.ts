import Post from "@models/Post";
import { create } from "jsons/posts/json-handler";
import { injectable } from "tsyringe";

interface IPostRequest {
  content: string;
  author: string;
}

@injectable()
class CreatePostService {
  async execute(data: IPostRequest) {
    const post = await create(data);
    return post;
  }
}

export { CreatePostService };
