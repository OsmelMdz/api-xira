import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import conectarDB from "./config/db.js";
import tipoLlamadaRoutes from "./routes/tipoLlamada.routes.js";
import empresaRoutes from "./routes/empresa.routes.js";

dotenv.config();
const app = express();

conectarDB();

app.use(cors());
app.use(express.json());

app.use("/api/tipoLlamada", tipoLlamadaRoutes);
app.use("/api/empresas", empresaRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
