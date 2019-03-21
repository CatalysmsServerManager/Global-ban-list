define({ "api": [
  {
    "type": "GET",
    "url": "/ban/:id",
    "title": "GET /ban/:id",
    "name": "GET__ban__id",
    "group": "Ban",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "banId",
            "description": "<p>UUID of the ban to get</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n    \"id\" : \"0a40cf80-4b2a-11e9-a532-07f768aa6c74\"\n}",
          "type": "String"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "ban",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "ban.id",
            "description": "<p>UUID</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "ban.bannedUntil",
            "description": "<p>Date when the ban expires</p>"
          },
          {
            "group": "Success 200",
            "type": "Enum",
            "optional": false,
            "field": "ban.status",
            "description": "<p>active, elapsed or deleted</p>"
          },
          {
            "group": "Success 200",
            "type": "boolean",
            "optional": false,
            "field": "ban.verified",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "ban.game",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "ban.game.id",
            "description": "<p>Integer ID</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "ban.game.code",
            "description": "<p>short code for identifying the game</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "ban.game.fullName",
            "description": "<p>full game name</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "ban.reason",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "ban.reason.id",
            "description": "<p>Integer ID</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "ban.reason.reasonShort",
            "description": "<p>Short name of the reason</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "ban.reason.reasonLong",
            "description": "<p>Long description of the reason</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "ban.player",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "ban.player.id",
            "description": "<p>UUID</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "ban.player.steamId",
            "description": "<p>Steam64 ID</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "ban.player.username",
            "description": "<p>Name of the player</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "ban.server",
            "description": "<p>Which server this ban belongs to</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "ban.server.id",
            "description": "<p>UUID</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "ban.server.name",
            "description": "<p>name of the server</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n   \"id\": \"0a40cf80-4b2a-11e9-a532-07f768aa6c74\",\n   \"bannedUntil\": \"2020-01-27T18:27:34.000Z\",\n   \"status\": \"active\",\n   \"verified\": false,\n   \"createdAt\": \"2019-03-20T16:05:54.000Z\",\n   \"updatedAt\": \"2019-03-20T16:05:54.000Z\",\n   \"game\": {\n       \"id\": 2,\n       \"code\": \"rust\",\n       \"fullName\": \"Rust\",\n       \"createdAt\": \"2019-03-20T17:05:48.000Z\",\n       \"updatedAt\": \"2019-03-20T17:05:48.000Z\"\n   },\n   \"reason\": {\n       \"id\": 3,\n       \"reasonShort\": \"Other\",\n       \"reasonLong\": \"General reason when the defaults do not cover the actual reason of the ban.\",\n       \"createdAt\": \"2019-03-20T17:05:48.000Z\",\n       \"updatedAt\": \"2019-03-20T17:05:48.000Z\"\n   },\n   \"player\": {\n       \"id\": \"0a3fe520-4b2a-11e9-a532-07f768aa6c74\",\n       \"steamId\": \"78956\",\n       \"username\": \"Justice.Denesik\",\n       \"createdAt\": \"2019-03-20T16:05:54.000Z\",\n       \"updatedAt\": \"2019-03-20T16:05:54.000Z\",\n       \"UserId\": \"0a3f21d0-4b2a-11e9-a532-07f768aa6c74\"\n   },\n   \"server\": {\n       \"id\": \"0a3e1060-4b2a-11e9-a532-07f768aa6c74\",\n       \"name\": \"Gleason, Zieme and Ratke\",\n       \"createdAt\": \"2019-03-20T16:05:54.000Z\",\n       \"updatedAt\": \"2019-03-20T16:05:54.000Z\",\n       \"ownedById\": \"0a3bed80-4b2a-11e9-a532-07f768aa6c74\"\n   }\n}",
          "type": "Object"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/ban/getBanById.js",
    "groupTitle": "Ban"
  },
  {
    "type": "get",
    "url": "/ban/:steamId",
    "title": "GET /ban/:steamId",
    "name": "GET__ban__steamId",
    "group": "Ban",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Steam64 ID</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "bans",
            "description": "<p>List of bans for a player.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "bans.id",
            "description": "<p>UUID</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "bans.bannedUntil",
            "description": "<p>Date when the ban expires</p>"
          },
          {
            "group": "Success 200",
            "type": "Enum",
            "optional": false,
            "field": "bans.status",
            "description": "<p>active, elapsed or deleted</p>"
          },
          {
            "group": "Success 200",
            "type": "boolean",
            "optional": false,
            "field": "bans.verified",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "bans.game",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "bans.game.id",
            "description": "<p>Integer ID</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "bans.game.code",
            "description": "<p>short code for identifying the game</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "bans.game.fullName",
            "description": "<p>full game name</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "bans.reason",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "bans.reason.id",
            "description": "<p>Integer ID</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "bans.reason.reasonShort",
            "description": "<p>Short name of the reason</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "bans.reason.reasonLong",
            "description": "<p>Long description of the reason</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "bans.player",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "bans.player.id",
            "description": "<p>UUID</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "bans.player.steamId",
            "description": "<p>Steam64 ID</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "bans.player.username",
            "description": "<p>Name of the player</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "bans.server",
            "description": "<p>Which server this ban belongs to</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "bans.server.id",
            "description": "<p>UUID</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "bans.server.name",
            "description": "<p>name of the server</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "    HTTP/1.1 200 OK\n[\n   {\n       \"id\": \"0a40cf80-4b2a-11e9-a532-07f768aa6c74\",\n       \"bannedUntil\": \"2020-01-27T18:27:34.000Z\",\n       \"status\": \"active\",\n       \"verified\": false,\n       \"createdAt\": \"2019-03-20T16:05:54.000Z\",\n       \"updatedAt\": \"2019-03-20T16:05:54.000Z\",\n       \"game\": {\n           \"id\": 2,\n           \"code\": \"rust\",\n           \"fullName\": \"Rust\",\n       },\n       \"reason\": {\n           \"id\": 3,\n           \"reasonShort\": \"Other\",\n           \"reasonLong\": \"General reason when the defaults do not cover the actual reason of the ban.\",\n       },\n       \"player\": {\n           \"id\": \"0a3fe520-4b2a-11e9-a532-07f768aa6c74\",\n           \"steamId\": \"78956\",\n           \"username\": \"Justice.Denesik\",\n       },\n       \"server\": {\n           \"id\": \"0a3e1060-4b2a-11e9-a532-07f768aa6c74\",\n           \"name\": \"Gleason, Zieme and Ratke\",\n       }\n   },\n   {\n       \"id\": \"0a929900-4b2a-11e9-a532-07f768aa6c74\",\n       \"bannedUntil\": \"2020-03-11T03:15:53.000Z\",\n       \"status\": \"active\",\n       \"verified\": false,\n       \"game\": {\n           \"id\": 1,\n           \"code\": \"7d2d\",\n           \"fullName\": \"7 Days to Die\",\n       },\n       \"reason\": {\n           \"id\": 3,\n           \"reasonShort\": \"Other\",\n           \"reasonLong\": \"General reason when the defaults do not cover the actual reason of the ban.\",\n       },\n       \"player\": {\n           \"id\": \"0a913970-4b2a-11e9-a532-07f768aa6c74\",\n           \"steamId\": \"76561198028175941\",\n           \"username\": \"Catalysm\",\n       },\n       \"server\": {\n           \"id\": \"0a3e1060-4b2a-11e9-a532-07f768aa6c74\",\n           \"name\": \"Gleason, Zieme and Ratke\",\n       }\n   }\n]",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/ban/searchBans.js",
    "groupTitle": "Ban"
  },
  {
    "type": "POST",
    "url": "/ban",
    "title": "POST /ban",
    "name": "PostBan",
    "group": "Ban",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "bannedUntil",
            "description": "<p>ISO DateTime</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "steamId",
            "description": "<p>Steam64 ID</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n    \"bannedUntil\": \"2019-05-15T08:30:00\",\n    \"steamId\": \"76561198028175941\",\n    \"reason\": \"other\",\n    \"game\": \"7d2d\"\n}",
          "type": "type"
        }
      ]
    },
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "type": "Object",
            "optional": false,
            "field": "ban",
            "description": "<p>The newly created ban</p>"
          }
        ],
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "ban.id",
            "description": "<p>UUID</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "ban.bannedUntil",
            "description": "<p>Date when the ban expires</p>"
          },
          {
            "group": "Success 200",
            "type": "Enum",
            "optional": false,
            "field": "ban.status",
            "description": "<p>active, elapsed or deleted</p>"
          },
          {
            "group": "Success 200",
            "type": "boolean",
            "optional": false,
            "field": "ban.verified",
            "description": ""
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"id\": \"f151e930-4c07-11e9-a3be-61e864bef7f5\",\n    \"bannedUntil\": \"2019-05-15T06:30:00.000Z\",\n    \"status\": \"active\",\n    \"verified\": false,\n    \"createdAt\": \"2019-03-21T18:34:20.868Z\",\n    \"updatedAt\": \"2019-03-21T18:34:20.868Z\"\n}",
          "type": "type"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/ban/postBan.js",
    "groupTitle": "Ban"
  }
] });