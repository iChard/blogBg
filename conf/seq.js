const Sequelize = require('sequelize');
const sequelize = new Sequelize('test', 'root', 'admin123', {
    host: '127.0.0.1',
    dialect: 'mysql',
    operatorsAliases: false,
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
})

sequelize
    .authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    }).catch(e => {
        console.error('Unable to connect to the database:', e)
    })

const User = sequelize.define('accountUser', {
    created: {
        type: Sequelize.DATE,
        validate: {
            len: 8
        }
    },
    name: {
        type: Sequelize.STRING
    }
}, {
    timestamps: true,
    paranoid: false,
    comment: '测试表'
})

// const Project = sequelize.import(__dirname+'/models/project')

User.sync({force: true})
    .then(() => {
        User.build({created: new Date(), name: '哈文'})
        return User.create({
            name: '张希',
            created: new Date()
        })
    }).then(() => {
        User.findAll().then(users => {
            console.log('users:', users);
            
        })
    })
