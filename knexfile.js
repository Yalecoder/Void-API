require("dotenv").config();

const {
  DB_CONNECTION,
  DB_HOST,
  DB_PORT,
  DB_DATABASE,
  DB_USERNAME,
  DB_PASSWORD,
} = process.env;

module.exports = {
  development: {
    client: DB_CONNECTION,
    connection: {
      database: DB_DATABASE,
      user: DB_USERNAME,
      password: DB_PASSWORD,
      host: DB_HOST,
      port: DB_PORT,
      timezone: "Asia/Tokyo",
    },
    pool: {
      min: 1,
      max: 10,
    },
  },
};
