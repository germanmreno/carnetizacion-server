import { Sequelize } from "sequelize";

const db = new Sequelize("bd_vicepresidencia", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

export default db;
