const Sequelize = require('sequelize');



exports.defineModels = (sequelize) => {
    User = defineUser(sequelize)
    Project = defineProject(sequelize)
    KanbanBoard = defineKanbanBoard(sequelize)
    KanbanColumn = defineKanbanColumn(sequelize)
    Task = defineTask(sequelize)

    //TODO N:M userProject  
    Project.hasMany(Task)
    Project.hasOne(KanbanBoard)
    KanbanBoard.hasMany(KanbanColumn)
    //TODO task may belong to a column

    exports.User = User
    exports.Project = Project
    exports.KanbanBoard = KanbanBoard
    exports.KanbanColumn = KanbanColumn 
    exports.Task = Task


}

defineUser = (sequelize) =>
    sequelize.define('user', {
        username: {
            type: Sequelize.STRING,
            unique: true,
            allowNull: false,
            validate: {
                len: [3, 30],
            },
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                len: [6, 30],
            },
        },
        email: {
            type: Sequelize.STRING,
            unique: true,
            allowNull: false,
            validate: {
                isEmail: true,
            },
        },
        timestamp: {
            type: Sequelize.DATE,
            allowNull: false,
            defaultValue: Sequelize.NOW,
        },
    }, {
            underscored: true,
        })


defineProject = (sequelize) =>
    sequelize.define('project', {
        name: {
            type: Sequelize.STRING,
            // unique: true
            validate: {
                len: [2, 30],
                notEmpty: true,
            },
        },
    }, {
            underscored: true,
        })

defineKanbanBoard = (sequelize) =>
    sequelize.define('kanbanBoard', {
        //TODO
    }, {
            underscored: true,
        })

defineKanbanColumn = (sequelize) =>
    sequelize.define('kanbanColumn', {
        name: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                len: [2, 30],
            }
        }
    }, {
            underscored: true,
        })

defineTask = (sequelize) =>
    sequelize.define('task', {
        name: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                len: [2, 30],
            }
        },
        timestamp: {
            type: Sequelize.DATE,
            allowNull: false,
            defaultValue: Sequelize.NOW,
        },
    }, {
            underscored: true,
        })

