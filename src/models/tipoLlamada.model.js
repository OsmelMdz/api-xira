import mongoose from "mongoose";

const TipoLlamadaSchema = new mongoose.Schema(
    {
        nombre: { type: String, required: true, unique: true },
    },
    { timestamps: true }
);

export default mongoose.model("TipoLlamada", TipoLlamadaSchema);
