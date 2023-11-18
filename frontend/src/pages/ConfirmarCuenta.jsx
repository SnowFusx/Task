import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Alerta from '../components/Alerta';
import clienteAxios from '../config/clienteAxios';

const ConfirmarCuenta = () => {
	const params = useParams();
	const { id } = params;
	const [alerta, setAlerta] = useState({});

	useEffect(() => {
		const handleConfirmarCuenta = async () => {
			try {
				const { data } = await clienteAxios.get(
					`/usuarios/confirmar/${id}`
				);
				setAlerta({
					msg: data.msg,
					error: false,
				});
			} catch (error) {
				setAlerta({
					msg: error.response.data.msg,
					error: true,
				});
			}
		};
		handleConfirmarCuenta();
	}, [id]);

	const { msg } = alerta;

	return (
		<>
			<h1 className='text-sky-600 font-black text-6xl capitalize'>
				Confirma tu cuenta y comienza a crear tus{' '}
				<span className='text-slate-700'>proyectos</span>
			</h1>
			<div className='my-10 bg-white shadow rounded-lg p-10'>
				{msg && <Alerta alerta={alerta} />}
				<Link
					to='/'
					className='block text-center text-slate-500 text-sm my-3 uppercase hover:text-gray-700'
				>
					Volver al Login
				</Link>
			</div>
		</>
	);
};

export default ConfirmarCuenta;
