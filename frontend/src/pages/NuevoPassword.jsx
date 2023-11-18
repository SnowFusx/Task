import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import Alerta from '../components/Alerta';

const NuevoPassword = () => {
	const [alerta, setAlerta] = useState({});
	const [tokenValido, setTokenValido] = useState(false);
	const [password, setPassword] = useState('');
	const [passwordModificado, setPasswordModificado] = useState(false);

	const params = useParams();
	const { token } = params;

	useEffect(() => {
		const handleConfirmarCuenta = async () => {
			try {
				await axios.get(
					`${
						import.meta.env.VITE_BACKEND_URL
					}/api/usuarios/olvide-password/${token}`
				);
				setTokenValido(true);
			} catch (error) {
				setAlerta({
					msg: error.response.data.msg,
					error: true,
				});
			}
		};
		handleConfirmarCuenta();
	}, []);

	const handleSubmit = async e => {
		e.preventDefault();
		if (password === '' || password.trim() === '' || password.length < 6) {
			setAlerta({
				msg: 'Debes introducir un password válido',
				error: true,
			});
			return;
		}
		setAlerta({});
		try {
			const { data } = await axios.post(
				`${
					import.meta.env.VITE_BACKEND_URL
				}/api/usuarios/olvide-password/${token}`,
				{
					password,
				}
			);
			setAlerta({
				msg: data.msg,
				error: false,
			});
			setPassword('');
			setPasswordModificado(true);
			setTokenValido(false);
		} catch (error) {
			setAlerta({
				msg: error.response.data.msg,
				error: true,
			});
		}
	};

	const { msg } = alerta;

	return (
		<>
			<h1 className='text-sky-600 font-black text-6xl capitalize'>
				Reestable tu Password y no pierdas acceso a tus{' '}
				<span className='text-slate-700'>proyectos</span>
			</h1>
			{msg && <Alerta alerta={alerta} />}

			{tokenValido && (
				<form
					className='my-10 bg-white shadow rounded-lg p-10'
					onSubmit={handleSubmit}
				>
					<div className='my-5'>
						<label
							className='uppercase text-gray-600 block text-xl
						font-bold'
							htmlFor='password'
						>
							Nuevo Password
						</label>
						<input
							id='password'
							type='password'
							placeholder='Introduce tu nuevo Password'
							className='w-full mt-3 p-3 border rounded-xl bg-gray-50'
							value={password}
							onChange={e => setPassword(e.target.value)}
						/>
					</div>

					<input
						type='submit'
						value='Guardar nuevo Password'
						className='bg-sky-700 w-full mb-5 py-3 text-white uppercase font-bold rounded hover:bg-sky-800 transition duration-300 cursor-pointer'
					/>
				</form>
			)}
			{passwordModificado && (
				<div className='my-10 bg-white shadow rounded-lg p-10'>
					<Link
						to='/'
						className='bg-gray-600 block text-center text-white text-sm my-3 p-5 rounded-xl uppercase hover:bg-gray-700 transition duration-300'
					>
						Inicia Sesión con tu nuevo Password
					</Link>
				</div>
			)}
		</>
	);
};

export default NuevoPassword;
