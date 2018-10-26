const Sequelize = require('sequelize');

exports.defineUser = sequelize =>
    sequelize.define('user', {
        username: {
            type: Sequelize.STRING,
            unique: true,
            allowNull: false,
            validate: {
                len: [3, 20]
            }
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                len: [6, 30]
            }
        },
        email: {
            type: Sequelize.STRING,
            unique: true,
            allowNull: false,
            validate: {
                isEmail: true
            }
        },
        timestamp: {
            type: Sequelize.DATE,
            allowNull: false,
            defaultValue: Sequelize.NOW
        }
    }, {
            underscored: true
        });