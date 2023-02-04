import EmpleadoModel from "../models/EmpleadoModel.js";

//Métodos

//Iniciar sesiòn

export const openSession = async (req, res) => {
  const { codigo } = req.body;

  if (!codigo) return res.sendStatus(400);

  try {
    const { codigo } = req.body;
    const userCode = await CodeModel.findOne({
      where: { codigo: codigo },
    });

    if (!userCode) return res.sendStatus(401);

    if (userCode) {
      return res.json({
        codigo: userCode.codigo,
        responsable: userCode.responsable,
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
    const empleado = await EmpleadoModel.findOne({ where: { id: req.params. id} });
    console.log(empleado);
    res.json(empleado);
  } catch (error) {
    res.json({ message: error.message });
  }
};