const path = require("path");

const development = {
  name: "development",
  dev_port: 8000,
  routes_path: "routes",
  db: "moneySorter",
  jwt_secret_key: "Codeial",
};

const production = {
  name: process.env.money_sorter_name,
  dev_port: 8000,
  routes_path: process.env.money_sorter_routes_path,
  db: process.env.money_sorter_db,
  jwt_secret_key: process.env.money_sorter_jwt_secret_key,
};

console.log(process.env.money_sorter_name);

module.exports =
  eval(process.env.money_sorter_name) == undefined
    ? development
    : eval(process.env.money_sorter_name);
