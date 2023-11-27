import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import useProyectos from '../hooks/useProyectos';

const FormularioProyecto = () => {
	const [id, setId] = useState(null);
	const [nombre, setNombre] = useState('');
	const [descripcion, setDescripcion] = useState('');
	const [fechaEntrega, setFechaEntrega] = useState('');
	const [cliente, setCliente] = useState('');

	const params = useParams();
	const { mostrarAlerta, alerta, submitProyecto, proyecto } = useProyectos();

	useEffect(() => {
		if (params.id) {
			setId(proyecto._id);
			setNombre(proyecto.nombre);
			setDescripcion(proyecto.descripcion);
			setFechaEntrega(proyecto.fechaEntrega?.split('T')[0]);
			setCliente(proyecto.cliente);
		}
	}, [params, proyecto]);

	const navigate = useNavigate();

	const handleSubmit = async e => {
		e.preventDefault();

		// Validar el formulario
		if ([nombre, descripcion, fechaEntrega, cliente].includes('')) {
			mostrarAlerta({
				error: 'error',
				msg: 'Todos los campos son obligatorios',
			});
			return;
		}

		// Pasar los datos hacia el provider
		await submitProyecto({
			id,
			nombre,
			descripcion,
			fechaEntrega,
			cliente,
		});

		// Reiniciar el formulario
		setId(null);
		setNombre('');
		setDescripcion('');
		setFechaEntrega('');
		setCliente('');
	};

	const { msg } = alerta;

	return (
		<>
			<div className='block w-full md:w-3/4 lg:w-1/2'>
				<form
					className='bg-white py-10 px-5 rounded-lg shadow block'
					onSubmit={handleSubmit}
				>
					<div className='mb-5'>
						<label
							htmlFor='nombre'
							className='text-gray-700 uppercase font-bold text-sm'
						>
							Nombre Proyecto
						</label>
						<input
							type='text'
							id='nombre'
							name='nombre'
							placeholder='Nombre del Proyecto'
							className='w-full border border-gray-400 px-4 py-2 mt-2 rounded-lg focus:outline-none focus:border-blue-500'
							value={nombre}
							onChange={e => setNombre(e.target.value)}
						/>
					</div>

					<div className='mb-5'>
						<label
							htmlFor='descripcion'
							className='text-gray-700 uppercase font-bold text-sm'
						>
							Descripción
						</label>
						<textarea
							type='text'
							id='descripcion'
							name='descripcion'
							placeholder='Describe el proyecto'
							className='w-full border border-gray-400 px-4 py-2 mt-2 rounded-lg focus:outline-none focus:border-blue-500'
							value={descripcion}
							onChange={e => setDescripcion(e.target.value)}
						/>
					</div>

					<div className='mb-5'>
						<label
							htmlFor='fecha-entrega'
							className='text-gray-700 uppercase font-bold text-sm'
						>
							Fecha Entrega
						</label>
						<input
							type='date'
							id='fecha-entrega'
							name='fecha-entrega'
							className='w-full border border-gray-400 px-4 py-2 mt-2 rounded-lg focus:outline-none focus:border-blue-500'
							value={fechaEntrega}
							onChange={e => setFechaEntrega(e.target.value)}
						/>
					</div>

					<div className='mb-5'>
						<label
							htmlFor='cliente'
							className='text-gray-700 uppercase font-bold text-sm'
						>
							Cliente
						</label>
						<input
							type='text'
							id='cliente'
							name='cliente'
							placeholder='Nombre del Cliente'
							className='w-full border border-gray-400 px-4 py-2 mt-2 rounded-lg focus:outline-none focus:border-blue-500'
							value={cliente}
							onChange={e => setCliente(e.target.value)}
						/>
					</div>

					<input
						type='submit'
						className='bg-slate-800 hover:bg-slate-900 w-full p-3 rounded text-white uppercase font-bold cursor-pointer transition-colors'
						value={params.id ? 'Editar Proyecto' : 'Crear Proyecto'}
					/>
				</form>
				<div className='mt-5 w-full'>
					<button
						className='p-3 w-full rounded text-gray-500 hover:text-gray-800 uppercase font-bold cursor-pointer transition-colors'
						onClick={() => navigate(-1)}
					>
						Cancelar
					</button>
				</div>
			</div>
		</>
	);
};

export default FormularioProyecto;
