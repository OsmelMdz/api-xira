import TipoLlamada from "../models/tipoLlamada.model.js";

export const crearTipoLlamada = async (req, res) => {
    try {
        const { nombre } = req.body;
        const existeTipoLlamada = await TipoLlamada.findOne({ nombre });

        if (existeTipoLlamada) {
            return res.status(400).json({ message: "El tipo de llamada ya existe." });
        }

        const nuevoTipoLlamada = new TipoLlamada({ nombre });
        await nuevoTipoLlamada.save();

        res.status(201).json(nuevoTipoLlamada);
    } catch (error) {
        res.status(500).json({ message: "Error al crear el tipo de llamada.", error });
    }
};

export const obtenerTiposLlamada = async (req, res) => {
    try {
        const tiposLlamada = await TipoLlamada.find();
        res.status(200).json(tiposLlamada);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener los tipos de llamada.", error });
    }
};

export const obtenerTipoLlamadaPorId = async (req, res) => {
    try {
        const tipoLlamada = await TipoLlamada.findById(req.params.id);
        if (!tipoLlamada) {
            return res.status(404).json({ message: "Tipo de llamada no encontrado." });
        }
        res.status(200).json(tipoLlamada);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener el tipo de llamada.", error });
    }
};

export const actualizarTipoLlamada = async (req, res) => {
    try {
        const { nombre } = req.body;
        const tipoLlamadaActualizado = await TipoLlamada.findByIdAndUpdate(
            req.params.id,
            { nombre },
            { new: true, runValidators: true }
        );

        if (!tipoLlamadaActualizado) {
            return res.status(404).json({ message: "Tipo de llamada no encontrado." });
        }

        res.status(200).json(tipoLlamadaActualizado);
    } catch (error) {
        res.status(500).json({ message: "Error al actualizar el tipo de llamada.", error });
    }
};

export const eliminarTipoLlamada = async (req, res) => {
    try {
        const tipoLlamadaEliminado = await TipoLlamada.findByIdAndDelete(req.params.id);

        if (!tipoLlamadaEliminado) {
            return res.status(404).json({ message: "Tipo de llamada no encontrado." });
        }

        res.status(200).json({ message: "Tipo de llamada eliminado correctamente." });
    } catch (error) {
        res.status(500).json({ message: "Error al eliminar el tipo de llamada.", error });
    }
};
