const {
    getSingleUser,
    newUser,
    resolverGetAllUsers,
    resolverModifyThisUser,
    resolverDeleteThisUser,
    resolverFindUserByEmail,
    resolverUserValidatePassword,
    resolverGenerateToken
} = require('./resolvers/userResolver');

module.exports = {
    getUser: (req, res) => {
        const userid = req.params.userid;
        getSingleUser(userid)
        .then(user => {
            res.status(200).send(user);
        }).catch(err => {
            res.status(404).send(err);
        });
    },
    createUser: (req, res) => {
        newUser(req.body)
        .then((user) => {
            res.status(201).send(user);
        }).catch((err) => {
            res.status(400).send(err);
        });
    },
    deleteThisUser: (req, res) => {
        const userId = req.params.userid;
        resolverDeleteThisUser(userId)
        .then(msg => {
            res.status(200).send(msg);
        }).catch(err => {
            res.status(404).send(err);
        });
    },
    modifiyThisUser: (req, res) => {
        const getReqBody = req.body;
        const userId = req.params.userid;
        resolverModifyThisUser(userId, getReqBody)
        .then(user => {
            res.status(200).send(user);
        }).catch(err => {
            res.status(400).send(err);
        });
    },
    getAllUsers: (req, res) => {
        resolverGetAllUsers()
        .then((users) => {
            res.status(200).send(users);
        }).catch(err => {
            res.status(404).send(err);
        });
    },
    start: (req, res) => {
        res.status(200).send('Hello Motherfucker!');
    },
    userLogin: (req, res) => {
        const {email, password} = req.body;

        resolverFindUserByEmail(email)
        .then(user => {
            return resolverUserValidatePassword(user, password);
        })  
        .then(user => {
            console.log('Segundo then');
            const token = resolverGenerateToken(user);
            console.log(token);
            res.status(200).send({user:user, token:token});
        }).catch((err) => {
            res.status(401).send(err);
        });
    }
};