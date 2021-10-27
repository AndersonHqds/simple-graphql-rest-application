import fs from 'fs';
import path from 'path';
import { getAll as getAllUsers } from '../users/json-handler';
const convertToJSON = (data) => JSON.stringify(data, null, 4);

const create = async ({ content, author }) => {
    const filePath = path.join(__dirname, './posts.json');

    return new Promise((resolve, reject) => {
      fs.access(filePath, fs.constants.F_OK, async (notExists) => {
        if (notExists) {
          const post = {
            _id: 1,
            content,
            author
          };
          await fs.writeFileSync(filePath, convertToJSON({
            posts: [
              post
            ],
          }));
          
          return resolve(post);
        }
        const postsJSON = await fs.readFileSync(filePath).toString();
        const {posts} = JSON.parse(postsJSON) as {posts: any[]};

        const post = {
          _id: posts.length + 1,
          content,
          author
        }
  
        posts.push(post);
  
        await fs.writeFileSync(filePath, convertToJSON({posts: posts}));
        resolve(post);
      });
    })
}

const getPost = async ({ author }) => {
    const filePath = path.join(__dirname, './posts.json');
    
    return new Promise((resolve, reject) => {
      fs.access(filePath, fs.constants.F_OK, async (notExists) => {
        if (notExists) {
          return resolve({posts: []});
        }
        const {users} = await getAllUsers();
        const user = users.find(user => user._id.toString() === author.toString());
        const postsJSON = await fs.readFileSync(filePath).toString();
        let {posts} = JSON.parse(postsJSON) as {posts: any[]};
        posts = posts.filter(post => post.author === author).map(post => ({ ...post, author: user }));
        resolve(posts);
      });
    });
};

export { create, getPost };