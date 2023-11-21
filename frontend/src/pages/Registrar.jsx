import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Alerta from '../components/Alerta';
import clienteAxios from '../config/clienteAxios';

const Registrar = () => {
	const [nombre, setNombre] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [password2, setPassword2] = useState('');
	const [alerta, setAlerta] = useState({});
	const [equalPassword, setEqualPassword] = useState('');

	const handleCrearCuenta = async e => {
		e.preventDefault();
		if ([nombre, email, password, password2].includes('')) {
			setAlerta({
				msg: 'Todos los campos son obligatorios',
				error: true,
			});
			return;
		}

		if (password !== password2) {
			setAlerta({
				msg: 'Los password no coinciden',
				error: true,
			});
			return;
		}

		if (password.length < 6) {
			setAlerta({
				msg: 'El password debe tener al menos 6 caracteres',
				error: true,
			});
			return;
		}

		setAlerta({});

		// Crear el usuario en la API
		try {
			const { data } = await clienteAxios.post(`/usuarios`, {
				nombre,
				email,
				password,
			});
			setAlerta({
				msg: data.msg,
				error: false,
			});

			setNombre('');
			setEmail('');
			setPassword('');
			setPassword2('');

			setTimeout(() => {
				setAlerta({});
			}, 3000);
		} catch (error) {
			setAlerta({
				msg: error.response.data.msg,
				error: true,
			});
		}
	};

	useEffect(() => {
		let timeout = setTimeout(() => {
			setAlerta({});
		}, 3000);
		return () => clearTimeout(timeout);
	}, [alerta]);

	useEffect(() => {
		if (password2 === '') {
			setEqualPassword('');
			return;
		}
		if (password !== password2) {
			setEqualPassword('border-red-500');
		} else {
			setEqualPassword('border-green-500');
		}
	}, [password, password2]);

	const { msg } = alerta;

	return (
		<>
			<h1 className='text-sky-900 font-black text-6xl capitalize'>
				Crea tu cuenta y administra tus{' '}
				<span className='text-slate-700'>proyectos</span>
			</h1>

			{msg && <Alerta alerta={alerta} />}

			<form
				className='my-10 bg-white shadow rounded-lg p-10'
				onSubmit={handleCrearCuenta}
			>
				<div className='my-5'>
					<label
						className='uppercase text-gray-600 block text-xl
						font-bold'
						htmlFor='nombre'
					>
						Nombre
					</label>
					<input
						id='nombre'
						type='text'
						placeholder='Tu Nombre'
						className='w-full mt-3 p-3 border rounded-xl bg-gray-50'
						value={nombre}
						onChange={e => setNombre(e.target.value)}
					/>
				</div>
				<div className='my-5'>
					<label
						className='uppercase text-gray-600 block text-xl
						font-bold'
						htmlFor='email'
					>
						Email
					</label>
					<input
						id='email'
						type='email'
						placeholder='Email de Registro'
						className='w-full mt-3 p-3 border rounded-xl bg-gray-50'
						value={email}
						onChange={e => setEmail(e.target.value)}
					/>
				</div>
				<div className='my-5'>
					<label
						className='uppercase text-gray-600 block text-xl
						font-bold'
						htmlFor='password'
					>
						Password
					</label>
					<input
						id='password'
						type='password'
						placeholder='Password de Registro'
						className='w-full mt-3 p-3 border rounded-xl bg-gray-50'
						value={password}
						onChange={e => setPassword(e.target.value)}
					/>
				</div>
				<div className='my-5'>
					<label
						className='uppercase text-gray-600 block text-xl
						font-bold'
						htmlFor='password2'
					>
						Repetir Password
					</label>
					<input
						id='password2'
						type='password'
						placeholder='Repetir tu Password'
						className={`w-full mt-3 p-3 border rounded-xl bg-gray-50 focus:outline-none ${equalPassword}`}
						value={password2}
						onChange={e => setPassword2(e.target.value)}
					/>
				</div>
				<input
					type='submit'
					value='Crear Cuenta'
					className='bg-sky-700 w-full mb-5 py-3 text-white uppercase font-bold rounded hover:bg-sky-800 transition duration-300 cursor-pointer'
				/>
			</form>

			<nav className='lg:flex lg:justify-center'>
				<Link
					to='/'
					className='block text-center text-slate-500 text-sm my-3 uppercase hover:text-gray-700'
				>
					Ya tengo cuenta, volver al login
				</Link>
			</nav>
		</>
	);
};

export default Registrar;
