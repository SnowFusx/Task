import Proyecto from '../models/Proyecto.js';
import Tarea from '../models/Tarea.js';

const obtenerProyectos = async (req, res) => {
	const proyectos = await Proyecto.find({ creador: req.usuario.id }).sort({
		createdAt: -1,
	});
	res.json(proyectos);
};

const nuevoProyecto = async (req, res) => {
	const proyecto = new Proyecto(req.body);
	proyecto.creador = req.usuario.id;

	try {
		const proyectoCreado = await proyecto.save();
		res.json(proyectoCreado);
	} catch (error) {
		console.error(`Error: ${error.message}`);
		res.status(500).json({ msg: 'Hubo un error al crear el proyecto' });
	}
};

const obtenerProyecto = async (req, res) => {
	const { id } = req.params;

	if (id.trim().length !== 24) {
		const error = new Error('Proyecto no encontrado');
		return res.status(404).json({ msg: error.message });
	}

	const proyecto = await Proyecto.findById(id.trim());
	if (!proyecto) {
		const error = new Error('Proyecto no encontrado');
		return res.status(404).json({ msg: error.message });
	}

	if (proyecto.creador.toString() !== req.usuario.id.toString()) {
		const error = new Error('No autorizado');
		return res.status(401).json({ msg: error.message });
	}

	res.json(proyecto);
};

const editarProyecto = async (req, res) => {
	const { id } = req.params;

	if (id.trim().length !== 24) {
		const error = new Error('Proyecto no encontrado');
		return res.status(404).json({ msg: error.message });
	}

	const proyecto = await Proyecto.findById(id.trim());

	if (!proyecto) {
		const error = new Error('Proyecto no encontrado');
		return res.status(404).json({ msg: error.message });
	}

	if (proyecto.creador.toString() !== req.usuario.id.toString()) {
		const error = new Error('No autorizado');
		return res.status(401).json({ msg: error.message });
	}

	proyecto.nombre = req.body.nombre || proyecto.nombre;
	proyecto.descripcion = req.body.descripcion || proyecto.descripcion;
	proyecto.fechaEntrega = req.body.fechaEntrega || proyecto.fechaEntrega;
	proyecto.cliente = req.body.cliente || proyecto.cliente;

	try {
		const proyectoActualizado = await proyecto.save();
		res.json(proyectoActualizado);
	} catch (error) {
		console.error(`Error: ${error.message}`);
		res.status(500).json({
			msg: 'Hubo un error al actualizar el proyecto',
		});
	}
};

const eliminarProyecto = async (req, res) => {
	const { id } = req.params;

	if (id.trim().length !== 24) {
		const error = new Error('Proyecto no encontrado');
		return res.status(404).json({ msg: error.message });
	}

	const proyecto = await Proyecto.findById(id.trim());

	if (!proyecto) {
		const error = new Error('Proyecto no encontrado');
		return res.status(404).json({ msg: error.message });
	}

	if (proyecto.creador.toString() !== req.usuario.id.toString()) {
		const error = new Error('No autorizado');
		return res.status(401).json({ msg: error.message });
	}

	try {
		await proyecto.deleteOne();
		res.json({ msg: 'Proyecto eliminado' });
	} catch (error) {
		console.error(`Error: ${error.message}`);
		res.status(500).json({ msg: 'Hubo un error al eliminar el proyecto' });
	}
};

const agregarColaborador = async (req, res) => {};

const eliminarColaborador = async (req, res) => {};

export {
	obtenerProyectos,
	nuevoProyecto,
	obtenerProyecto,
	editarProyecto,
	eliminarProyecto,
	agregarColaborador,
	eliminarColaborador,
};
