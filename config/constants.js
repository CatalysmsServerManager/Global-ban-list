const Luxon = require('luxon');

const now = new Luxon.DateTime(Date.now());

const mysqlNow = now.toFormat('yyyy-LL-dd HH:mm:ss');


module.exports = {
  reasons: [{
      id: 1,
      reasonShort: 'Hacking',
      reasonLong: 'User has used external tools to gain an unfair advantage in the game.',
      createdAt: mysqlNow,
      updatedAt: mysqlNow,
    },
    {
      id: 2,
      reasonShort: 'Racism',
      reasonLong: 'User has said racial slurs.',
      createdAt: mysqlNow,
      updatedAt: mysqlNow,
    },
    {
      id: 3,
      reasonShort: 'Other',
      reasonLong: 'General reason when the defaults do not cover the actual reason of the ban.',
      createdAt: mysqlNow,
      updatedAt: mysqlNow,
    },
  ],
  games: [{
      id: 1,
      fullName: '7 Days to Die',
      code: '7d2d',
      createdAt: mysqlNow,
      updatedAt: mysqlNow,
    },
    {
      id: 2,
      fullName: 'Rust',
      code: 'rust',
      createdAt: mysqlNow,
      updatedAt: mysqlNow,
    },
    {
      id: 3,
      fullName: 'Minecraft',
      code: 'mc',
      createdAt: mysqlNow,
      updatedAt: mysqlNow,
    }
  ],
};