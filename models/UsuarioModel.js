import db from "../database/db.js";

import { DataTypes } from "sequelize";

const UsuarioModel = db.define("usuario", {
  username: { type: DataTypes.STRING, unique: false },
  contraseña: {type: DataTypes.STRING, unique: false},
});

export default UsuarioModel;