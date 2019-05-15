'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * createTable "Games", deps: []
 * createTable "Reasons", deps: []
 * createTable "Users", deps: []
 * createTable "Players", deps: [Users]
 * createTable "Servers", deps: [Users]
 * createTable "Bans", deps: [Users, Users, Servers, Players, Reasons, Games]
 *
 **/

var info = {
    "revision": 1,
    "name": "init",
    "created": "2019-03-20T15:12:32.311Z",
    "comment": ""
};

var migrationCommands = [{
    fn: "createTable",
    params: [
        "Games",
        {
            "id": {
                "type": Sequelize.INTEGER,
                "field": "id",
                "primaryKey": true
            },
            "code": {
                "type": Sequelize.STRING,
                "field": "code",
                "allowNull": false,
                "unique": true
            },
            "fullName": {
                "type": Sequelize.STRING,
                "field": "fullName",
                "allowNull": false,
                "unique": true
            },
            "createdAt": {
                "type": Sequelize.DATE,
                "field": "createdAt",
                "allowNull": false
            },
            "updatedAt": {
                "type": Sequelize.DATE,
                "field": "updatedAt",
                "allowNull": false
            }
        },
        {}
    ]
},
{
    fn: "createTable",
    params: [
        "Reasons",
        {
            "id": {
                "type": Sequelize.INTEGER,
                "field": "id",
                "primaryKey": true
            },
            "reasonShort": {
                "type": Sequelize.STRING,
                "field": "reasonShort",
                "allowNull": false
            },
            "reasonLong": {
                "type": Sequelize.STRING,
                "field": "reasonLong",
                "allowNull": false
            },
            "createdAt": {
                "type": Sequelize.DATE,
                "field": "createdAt",
                "allowNull": false
            },
            "updatedAt": {
                "type": Sequelize.DATE,
                "field": "updatedAt",
                "allowNull": false
            }
        },
        {}
    ]
},
{
    fn: "createTable",
    params: [
        "Users",
        {
            "id": {
                "type": Sequelize.UUID,
                "field": "id",
                "primaryKey": true,
                "defaultValue": Sequelize.UUIDV1
            },
            "username": {
                "type": Sequelize.STRING,
                "field": "username",
                "allowNull": false
            },
            "steamId": {
                "type": Sequelize.STRING,
                "field": "steamId",
                "allowNull": false,
                "unique": true
            },
            "lastVisited": {
                "type": Sequelize.DATE,
                "field": "lastVisited"
            },
            "createdAt": {
                "type": Sequelize.DATE,
                "field": "createdAt",
                "allowNull": false
            },
            "updatedAt": {
                "type": Sequelize.DATE,
                "field": "updatedAt",
                "allowNull": false
            },
            "isAdmin": {
                "type": Sequelize.BOOLEAN,
                "field": "isAdmin",
                "allowNull": false,
                "defaultValue": false
            }
        },
        {}
    ]
},
{
    fn: "createTable",
    params: [
        "Players",
        {
            "id": {
                "type": Sequelize.UUID,
                "field": "id",
                "primaryKey": true,
                "defaultValue": Sequelize.UUIDV1
            },
            "steamId": {
                "type": Sequelize.STRING,
                "field": "steamId",
                "allowNull": false,
                "unique": true
            },
            "username": {
                "type": Sequelize.STRING,
                "field": "username",
                "allowNull": false
            },
            "createdAt": {
                "type": Sequelize.DATE,
                "field": "createdAt",
                "allowNull": false
            },
            "updatedAt": {
                "type": Sequelize.DATE,
                "field": "updatedAt",
                "allowNull": false
            },
            "UserId": {
                "type": Sequelize.UUID,
                "field": "UserId",
                "onUpdate": "CASCADE",
                "onDelete": "SET NULL",
                "references": {
                    "model": "Users",
                    "key": "id"
                },
                "allowNull": true
            }
        },
        {}
    ]
},
{
    fn: "createTable",
    params: [
        "Servers",
        {
            "id": {
                "type": Sequelize.UUID,
                "field": "id",
                "primaryKey": true,
                "defaultValue": Sequelize.UUIDV1
            },
            "name": {
                "type": Sequelize.STRING,
                "field": "name",
                "allowNull": false
            },
            "createdAt": {
                "type": Sequelize.DATE,
                "field": "createdAt",
                "allowNull": false
            },
            "updatedAt": {
                "type": Sequelize.DATE,
                "field": "updatedAt",
                "allowNull": false
            },
            "ownedById": {
                "type": Sequelize.UUID,
                "field": "ownedById",
                "onUpdate": "CASCADE",
                "onDelete": "CASCADE",
                "references": {
                    "model": "Users",
                    "key": "id"
                },
                "allowNull": false
            }
        },
        {}
    ]
},
{
    fn: "createTable",
    params: [
        "Bans",
        {
            "id": {
                "type": Sequelize.UUID,
                "field": "id",
                "primaryKey": true,
                "defaultValue": Sequelize.UUIDV1
            },
            "bannedUntil": {
                "type": Sequelize.DATE,
                "field": "bannedUntil",
                "allowNull": false
            },
            "status": {
                "type": Sequelize.ENUM('active', 'deleted', 'elapsed'),
                "field": "status",
                "required": true,
                "defaultValue": "active"
            },
            "deletedAt": {
                "type": Sequelize.DATE,
                "field": "deletedAt"
            },
            "verified": {
                "type": Sequelize.BOOLEAN,
                "field": "verified",
                "defaultValue": false
            },
            "createdAt": {
                "type": Sequelize.DATE,
                "field": "createdAt",
                "allowNull": false
            },
            "updatedAt": {
                "type": Sequelize.DATE,
                "field": "updatedAt",
                "allowNull": false
            },
            "bannedById": {
                "type": Sequelize.UUID,
                "field": "bannedById",
                "onUpdate": "CASCADE",
                "onDelete": "SET NULL",
                "references": {
                    "model": "Users",
                    "key": "id"
                },
                "allowNull": true
            },
            "deletedById": {
                "type": Sequelize.UUID,
                "field": "deletedById",
                "onUpdate": "CASCADE",
                "onDelete": "SET NULL",
                "references": {
                    "model": "Users",
                    "key": "id"
                },
                "allowNull": true
            },
            "ServerId": {
                "type": Sequelize.UUID,
                "field": "ServerId",
                "onUpdate": "CASCADE",
                "onDelete": "CASCADE",
                "references": {
                    "model": "Servers",
                    "key": "id"
                },
                "allowNull": true
            },
            "PlayerId": {
                "type": Sequelize.UUID,
                "field": "PlayerId",
                "onUpdate": "CASCADE",
                "onDelete": "CASCADE",
                "references": {
                    "model": "Players",
                    "key": "id"
                },
                "allowNull": true
            },
            "ReasonId": {
                "type": Sequelize.INTEGER,
                "field": "ReasonId",
                "onUpdate": "CASCADE",
                "onDelete": "CASCADE",
                "references": {
                    "model": "Reasons",
                    "key": "id"
                },
                "allowNull": true
            },
            "GameId": {
                "type": Sequelize.INTEGER,
                "field": "GameId",
                "onUpdate": "CASCADE",
                "onDelete": "CASCADE",
                "references": {
                    "model": "Games",
                    "key": "id"
                },
                "allowNull": true
            }
        },
        {}
    ]
}
];

module.exports = {
    pos: 0,
    up: function (queryInterface, Sequelize) {
        var index = this.pos;
        return new Promise(function (resolve, reject) {
            function next() {
                if (index < migrationCommands.length) {
                    let command = migrationCommands[index];
                    console.log("[#" + index + "] execute: " + command.fn);
                    index++;
                    queryInterface[command.fn].apply(queryInterface, command.params).then(next, reject);
                }
                else
                    resolve();
            }
            next();
        });
    },
    info: info
};
