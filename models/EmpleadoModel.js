import db from "../database/db.js";

import { DataTypes } from "sequelize";

const EmpleadoModel = db.define("empleados", {
  nombres: { type: DataTypes.STRING, unique: false },
  apellidos: {type: DataTypes.STRING, unique: false},
  cedula: { type: DataTypes.STRING, allowNull: false, unique: true },
  fechanacimiento: {type: DataTypes.STRING, unique: false},
  estado: {type: DataTypes.STRING, unique: false},
  municipio: {type: DataTypes.STRING, unique: false},
  parroquia: {type: DataTypes.STRING, unique: false},
  municipio: {type: DataTypes.STRING, unique: false},
  direccion: {type: DataTypes.STRING, unique: false},
  genero: {type: DataTypes.STRING, unique: false},
  cargo: { type: DataTypes.STRING, unique: false },
  oficina: { type: DataTypes.STRING, unique: false },
  foto: { type: DataTypes.STRING },
});

export default EmpleadoModel;
