const { User } = require('../../modules');
const jwt = require('jsonwebtoken');
const KEY = 'Dark Side 666';

module.exports = {
    getSingleUser: userid => {
        return new Promise((resolve, reject) => {
            User.findById(userid, (err, user) => {
                !err ? resolve(user) : reject(err);
            });
        });
    },

    newUser: userData => {
        return new Promise((resolve, reject) => {
            const {
                name,
                age,
                last_name,
                gender,
                is_active,
                email,
                password
            } = userData;

            const newUser = User({
                name,
                last_name,
                age,
                email,
                password,
                gender
            });
            newUser.save((err, user) => {
                !err ? resolve(user) : reject(err);
            });
        });
    },
    resolverGetAllUsers: () => {
        return new Promise((resolve, reject) => {
            User.find({is_active: true}, (err, users) => {
                !err ? resolve(users) : reject(err);
            });
        });
    },
    resolverModifyThisUser: (userid, body) => {
        return new Promise((resolve, reject) => {
          const { name, age, last_name, gender, is_active, email, password } = body;
    
          const newData = {
            name,
            last_name,
            age,
            email,
            password,
            gender
          };
    
          User.findByIdAndUpdate(
            userid,
            { $set: newData },
            { new: true },
            (err, user) => {
              !err ? resolve(user) : reject(err);
            }
          );
        });
      },
      resolverDeleteThisUser: userid => {
        return new Promise((resolve, reject) => {
          User.findByIdAndUpdate(
            id,
            { $set: { is_active: false } },
            { new: true },
            err => {
              !err ? resolve("The User has been exterminated") : reject(err);
            }
          );
        });
      },
      resolverUserValidatePassword: (user, password) => {
          return new Promise((resolve, reject) => {
              user.comparePassword(password, (error, isMatch) => {
                  if (!isMatch) {
                      reject('User or password wrong motherfucker!')
                  } else {
                      !error ? resolve(user) : reject(error)
                  }
              })
          })
      },
      resolverFindUserByEmail: candidateEmail => {
          return new Promise((resolve, reject) => {
              User.findOne({email:candidateEmail}, (err, user) => {
                  !err ? resolve(user) : reject(err);
              })
          })
      },
      resolverGenerateToken: user => {
          const userPayload = {
              id: user._id,
              email: user.email,
              exp: Math.floor(Date.now() / 1000) + 24 * 60 * 60 * 1000
          }
        return jwt.sign(userPayload, KEY);
      }
}