import Usuario from '../models/Usuario.js';
import generarId from '../helpers/generarId.js';
import generarJWT from '../helpers/generarJWT.js';

const registrar = async (req, res) => {
	// Evitar registros duplicados
	const { email } = req.body;
	const existeUsuario = await Usuario.findOne({ email });

	if (existeUsuario) {
		const error = new Error('El usuario ya existe');
		return res.status(400).json({ msg: error.message });
	}

	try {
		const usuario = new Usuario(req.body);
		usuario.token = generarId();

		const usuarioAlmacenado = await usuario.save();

		res.json(usuarioAlmacenado);
	} catch (error) {
		console.error(`Error: ${error.message}`);
		res.status(500).send({ msg: 'Error al registrar usuario' });
	}
};

const autenticar = async (req, res) => {
	const { email, password } = req.body;
	// Comprobar si el usuario existe
	const usuario = await Usuario.findOne({ email });
	if (!usuario) {
		const error = new Error('El usuario no existe');
		return res.status(404).json({ msg: error.message });
	}

	// Comprobar si el usuario está confirmado
	if (!usuario.confirmado) {
		const error = new Error('La cuenta no ha sido confirmada');
		return res.status(403).json({ msg: error.message });
	}

	// Comprobar si la contraseña es correcta
	if (await usuario.compararPassword(password)) {
		res.json({
			_id: usuario._id,
			nombre: usuario.nombre,
			email: usuario.email,
			token: generarJWT(usuario._id),
		});
	} else {
		const error = new Error('La contraseña es incorrecta');
		return res.status(401).json({ msg: error.message });
	}
};

const confirmar = async (req, res) => {
	console.log(req.params.token);
	const usuarioConfirmar = await Usuario.findOne({ token: req.params.token });
	if (!usuarioConfirmar) {
		const error = new Error('Token no válido');
		return res.status(403).json({ msg: error.message });
	}

	try {
		usuarioConfirmar.confirmado = true;
		usuarioConfirmar.token = '';

		await usuarioConfirmar.save();

		res.json({ msg: 'Usuario confirmado correctamente' });
	} catch (error) {
		console.error(`Error: ${error.message}`);
		res.status(500).send({ msg: 'Error al confirmar usuario' });
	}
};

const olvidePassword = async (req, res) => {
	const { email } = req.body;
	const usuario = await Usuario.findOne({ email });
	if (!usuario) {
		const error = new Error('El usuario no existe');
		return res.status(404).json({ msg: error.message });
	}

	try {
		usuario.token = generarId();
		await usuario.save();

		res.json({
			msg: 'Se ha enviado un email para reestablecer la contraseña',
		});
	} catch (error) {
		console.error(`Error: ${error.message}`);
		res.status(500).send({ msg: 'Error al reestablecer la contraseña' });
	}
};

const comprobarToken = async (req, res) => {
	const { token } = req.params;

	const tokenValido = await Usuario.findOne({ token });

	if (tokenValido) {
		return res.json({ msg: 'Token válido y el usuario existe' });
	} else {
		const error = new Error('Token no válido');
		return res.status(403).json({ msg: error.message });
	}
};

const nuevoPassword = async (req, res) => {
	const { token } = req.params;
	const { password } = req.body;

	const usuario = await Usuario.findOne({ token });

	if (usuario) {
		usuario.password = password;
		usuario.token = '';
		await usuario.save();
		try {
			res.json({ msg: 'Contraseña actualizada correctamente' });
		} catch (error) {
			console.error(`Error: ${error.message}`);
			res.status(500).send({ msg: 'Error al actualizar la contraseña' });
		}
	} else {
		const error = new Error('Token no válido');
		return res.status(403).json({ msg: error.message });
	}
};

const perfil = async (req, res) => {
	const { usuario } = req;
	res.json(usuario);
};

export {
	registrar,
	autenticar,
	confirmar,
	olvidePassword,
	comprobarToken,
	nuevoPassword,
	perfil,
};