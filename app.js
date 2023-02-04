import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

import db from "./database/db.js";

import carnetRouter from "./routes/routes.js";

import multer from "multer";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const __filename = fileURLToPath(import.meta.url);

    const __dirname = path.dirname(__filename);

    const iDir = path.parse(__dirname);
    const nDir = iDir.dir + "\\public\\uploads\\";

    cb(null, "./public/uploads");
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + "-" + Date.now() + ".jpg");
  },
});

const upload = multer({ storage: storage });

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api", carnetRouter);

dotenv.config();

app.use(express.static("public"));

const PORT = process.env.PORT || 8000;

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

app.use(express.static(__dirname + "/dist"));

app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname, "/dist", "index.html"), function (err) {
    if (err) {
      res.status(500).send(err);
    }
  });
});

app.post(
  "/upload",
  upload.fields([{ name: "image", maxCount: 1 }]),
  (req, res, next) => {
    console.log("/upload", req.files);
    if (req.files.image.length) {
      const image = req.files.image[0]; // { buffer, originalname, size, ...}
      res.json(image.filename);
      res.send({ success: true, count: req.files.image.originalname });
    } else {
      res.send({ success: false, message: "No files sent." });
    }
  }
);

try {
  await db.authenticate();
  console.log("Conexión exitosa a la DB");
} catch (error) {
  console.log(`El error de conexiòn es: ${error}`);
}

app.listen(PORT, () => {
  console.log(`Servidor levantado en el puerto ${PORT}`);
});
