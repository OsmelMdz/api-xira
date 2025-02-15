import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import conectarDB from "./config/db.js";
import tipoLlamadaRoutes from "./routes/tipoLlamada.routes.js";
import empresaRoutes from "./routes/empresa.routes.js";
import path from "path";
import { fileURLToPath } from 'url';
import { dirname } from 'path';

dotenv.config();
const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

conectarDB();

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'public', 'uploads')));
app.use("/api/tipoLlamada", tipoLlamadaRoutes);
app.use("/api/empresas", empresaRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
