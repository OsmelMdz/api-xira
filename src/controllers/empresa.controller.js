import Empresa from "../models/empresa.model.js";

export const crearEmpresa = async (req, res) => {
    try {
        const { nombre, etiquetaTipoLlamada } = req.body;

        let numerosTelefonicos;
        try {
            numerosTelefonicos = JSON.parse(req.body.numerosTelefonicos);
            if (!Array.isArray(numerosTelefonicos)) {
                return res.status(400).json({ error: "numerosTelefonicos debe ser un array válido." });
            }
        } catch (error) {
            return res.status(400).json({ error: "Formato incorrecto en numerosTelefonicos." });
        }

        const logoImagen = req.file ? `/uploads/${req.file.filename}` : null;

        const nuevaEmpresa = new Empresa({ nombre, numerosTelefonicos, etiquetaTipoLlamada, logoImagen });
        const empresaGuardada = await nuevaEmpresa.save();

        const empresaConPopulado = await Empresa.findById(empresaGuardada._id).populate("etiquetaTipoLlamada");

        res.status(201).json(empresaConPopulado);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const obtenerEmpresas = async (req, res) => {
    try {
        const empresas = await Empresa.find().populate("etiquetaTipoLlamada");
        res.json(empresas);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const obtenerEmpresaPorId = async (req, res) => {
    try {
        const empresa = await Empresa.findById(req.params.id).populate("etiquetaTipoLlamada");
        if (!empresa) return res.status(404).json({ message: "Empresa no encontrada" });
        res.json(empresa);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const buscarEmpresaPorNumero = async (req, res) => {
    try {
        const empresa = await Empresa.findOne({ numerosTelefonicos: req.params.numero });
        if (!empresa) return res.status(404).json({ message: "No se encontró ninguna empresa con ese número" });
        res.json(empresa);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const actualizarEmpresa = async (req, res) => {
    try {
        const empresaActualizada = await Empresa.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!empresaActualizada) return res.status(404).json({ message: "Empresa no encontrada" });
        res.json(empresaActualizada);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const eliminarEmpresa = async (req, res) => {
    try {
        const empresaEliminada = await Empresa.findByIdAndDelete(req.params.id);
        if (!empresaEliminada) return res.status(404).json({ message: "Empresa no encontrada" });
        res.json({ message: "Empresa eliminada correctamente" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
