import User from '../database/user.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import async from 'async';
import Boom from 'boom';

const userService = {
  getUser: async(data) => {
    return new Promise((resolve, reject) => {
      const { id } = data;
      async.auto({
        user: async.asyncify(() => {
          if (id) {
            return User.findById(id).then(user => {
              const userData = user.toObject();
              delete userData.password;
              return userData
            })
          }
          return User.find({}).then(users => {
            const updatedUsers = users.map(user => {
              let userData = user.toObject();
              delete userData.password;
              return userData;
            })
            return updatedUsers
          })
        })
      }, (err, results) => {
        if (err) {
          console.log(err);
          return reject(err.isBoom ? err : Boom.boomify(err))
        }
        return resolve(results.user);
      })
    })
  },
  createUser: data => {
    return new Promise((resolve, reject) => {
      const { email } = data;
      async.auto({
        user: async.asyncify(() => {
          return User.find({email})
        }),
        newPassword: async.asyncify(() => {
          return bcrypt.hash(data.password, 0);
        }),
        saveUser: ['user', 'newPassword', async.asyncify((results) => {
          const { user, newPassword } = results;
          data.password = newPassword;
          if (!user.length) {
            const userData = new User(data);
            return userData.save();
          } else {
            return Promise.reject(Boom.badRequest('User with email already exists'));
          }
        })]
      }, (err, results) => {
        if (err) {
          return reject(err.isBoom ? err : Boom.boomify(err));
        }
        return resolve(results.saveUser);
      })

    })
  },
  loginUser: (data) => {
    return new Promise((resolve, reject) => {
      const { email, password } = data;
      async.auto({
        user: async.asyncify(() => {
          return User.find({email}).then(users => {
            const user = users[0];
            return user;
          })
        }),
        verifyPassword: ['user', async.asyncify((results) => {
          const { user } = results;
          return bcrypt.compare(password, user.password).then(result => {
            if (!result) {
              return Promise.reject(Boom.badRequest('Invalid credentials')); 
            }
            return Promise.resolve(true);
          })
        })],
        generateToken: ['user', 'verifyPassword',async.asyncify((results) => {
          const { user } = results;
          const token = jwt.sign({
            id: user.id,
            name: user.firstName + user.lastName,
            departmentId: user.departmentId,
          }, process.env.SECRET_KEY, { expiresIn: 60 * 60 * 24 });
          const userData = user.toObject();
          delete userData.password;

          return Promise.resolve({
            user: userData,
            token,
          });
        })]

      }, (err, results) => {
        if (err) {
          console.log(err);
          return reject(err.isBoom ? err : Boom.boomify(err))
        }
        return resolve(results.generateToken);
      })
    })

  },
  updateUser: async() => {

  },
  deleteUser: async() => {

  }

}

export default userService;