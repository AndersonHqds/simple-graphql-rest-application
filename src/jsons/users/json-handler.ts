import fs from 'fs';
import path from 'path';
const convertToJSON = (data) => JSON.stringify(data, null, 4);

const create = async ({ name, username }) => {
    const filePath = path.join(__dirname, './users.json');

    return new Promise((resolve, reject) => {
      fs.access(filePath, fs.constants.F_OK, async (notExists) => {
        if (notExists) {
          const user = {
            _id: 1,
            name,
            username,
          };
          await fs.writeFileSync(filePath, convertToJSON({
            users: [
              user
            ],
          }));
          
          return resolve(user);
        }
        const usersJSON = await fs.readFileSync(filePath).toString();
        const {users} = JSON.parse(usersJSON) as {users: any[]};
  
        if (users.some(user => user.username === username)) {
          return reject("User already exists!");
        }

        const user = {
          _id: users.length + 1,
          name,
          username,
        }
  
        users.push(user);
  
        await fs.writeFileSync(filePath, convertToJSON({users: users}));
        resolve(user);
      });
    })
}

const getAll = async () => {
    const filePath = path.join(__dirname, './users.json');
    
    return new Promise<{users: any[]}>((resolve, reject) => {
      fs.access(filePath, fs.constants.F_OK, async (notExists) => {
        if (notExists) {
          return resolve({users: []});
        }
        const usersJSON = await fs.readFileSync(filePath).toString();
        const {users} = JSON.parse(usersJSON) as {users: any[]};
        resolve({users: users});
      });
    });
};

export { create, getAll };