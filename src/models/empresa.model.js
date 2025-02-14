import mongoose from "mongoose";

const EmpresaSchema = new mongoose.Schema(
    {
        nombre: { type: String, required: true, unique: true },
        numerosTelefonicos: [{ type: String, required: true }],
        logoImagen: { type: String },
        etiquetaTipoLlamada: { type: mongoose.Schema.Types.ObjectId, ref: "TipoLlamada", required: true },
    },
    { timestamps: true }
);

export default mongoose.model("Empresa", EmpresaSchema);
