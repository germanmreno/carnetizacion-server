import { compare, encrypt } from "../helpers/handleBcrypt.js";
import EmpleadoModel from "../models/EmpleadoModel.js";
import UsuarioModel from "../models/UsuarioModel.js";

//Métodos

//Iniciar sesiòn

//Registrar usuario
export const registerUser = async (req, res) => {
  try {
    const { username, contraseña } = req.body;
    const passwordHash = await encrypt(contraseña);
    await UsuarioModel.create({
      username,
      contraseña: passwordHash,
    });

    res.json({
      message: "Se ha registrado exitosamente.",
    });
  } catch (error) {
    res.json({ message: error.message });
  }
};

export const loginUser = async (req, res) => {
  const { username, contraseña } = req.body;

  if (!username || !contraseña) return res.sendStatus(400);

  try {
    const { username, contraseña } = req.body;
    const user = await UsuarioModel.findOne({
      where: { username: username },
    });

    if (!user) return res.sendStatus(401);

    const checkPassword = await compare(contraseña, user.contraseña);

    if (!checkPassword) return res.send(401);

    if (checkPassword) {
      return res.json({
        username: username
      });
    } else {
      return res.sendStatus(401);
    }
  } catch (error) {
    res.json({ message: error.message });
  }
};

//Registrar un empleado
export const registrarEmpleado = async (req, res) => {
  try {
    const {
      nombres,
      apellidos,
      cedula,
      oficina,
      fechanacimiento,
      estado,
      parroquia,
      municipio,
      genero,
      cargo,
      direccion,
      foto
    } = req.body;
    console.log(req.body);
    const response = await EmpleadoModel.create({
      nombres,
      apellidos,
      cedula,
      oficina,
      cargo,
      fechanacimiento,
      estado,
      parroquia,
      municipio,
      genero,
      direccion,
      foto
    });
    res.json({
      message: "Empleado registrado de forma exitosa.",
    });
  } catch (error) {
    res.json({ message: error.message });
  }
};

//Recibir la lista de empleados (Prueba)
export const getEmpleados = async (req, res) => {
  try {
    const entries = await EmpleadoModel.findAll();
    console.log(entries);
    res.json(entries);
  } catch (error) {
    res.json({ message: error.message });
  }
};

//Recibir un empleado
export const getEmpleado = async (req, res) => {
  try {
    const empleado = await EmpleadoModel.findOne({ where: { id: req.params.id} });
    console.log(empleado);
    res.json(empleado);
  } catch (error) {
    res.json({ message: error.message });
  }
};

//Recibir un por cédula
export const buscarEmpleado = async (req, res) => {
  const { cedula } = req.body;
  try {
    const empleado = await EmpleadoModel.findOne({ where: { cedula: cedula} });
    console.log(empleado);
    res.json(empleado);
  } catch (error) {
    res.json({ message: error.message });
  }
};

//Actualizar un empleado
export const actualizarEmpleado = async (req, res) => {
  try {
    const {
      nombres,
      apellidos,
      cedula,
      oficina,
      fechanacimiento,
      estado,
      parroquia,
      municipio,
      genero,
      cargo,
      direccion,
      foto
    } = req.body;
    console.log(req.body);
    const response = await EmpleadoModel.update({
      nombres,
      apellidos,
      cedula,
      oficina,
      cargo,
      fechanacimiento,
      estado,
      parroquia,
      municipio,
      genero,
      direccion,
      foto
    }, {
      where: { id: req.params. id}
    });
    res.json({
      message: "Empleado actualizado de forma exitosa.",
    });
  } catch (error) {
    res.json({ message: error.message });
  }
};
