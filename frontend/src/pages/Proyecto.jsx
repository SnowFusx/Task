import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useProyectos from '../hooks/useProyectos';
import { Link } from 'react-router-dom';
import Alerta from '../components/Alerta';
import ModalFormularioTarea from '../components/ModalFormularioTarea';
import ModalEliminarTarea from '../components/ModalEliminarTarea.jsx';
import Loading from '../components/Loading';
import { formatearFecha } from '../helpers/formatearFecha.js';
import PreviewTarea from '../components/PreviewTarea.jsx';

const Proyecto = () => {
	const params = useParams();

	const handleEliminar = () => {
		if (confirm('¿Estás seguro de eliminar el proyecto?')) {
			eliminarProyecto(params.id);

			return;
		}
	};

	const {
		obtenerProyecto,
		proyecto,
		cargando,
		alerta,
		eliminarProyecto,
		handleModalTarea,
		modalFormularioTarea,
	} = useProyectos();

	useEffect(() => {
		obtenerProyecto(params.id);
	}, []);

	const { nombre, descripcion, cliente, fechaEntrega } = proyecto;

	const fechaOriginal = fechaEntrega?.split('T')[0];
	const fechaFormateada = formatearFecha(fechaOriginal);

	const { msg } = alerta;

	if (cargando) return <Loading />;

	return (
		<>
			<div className='flex justify-between'>
				<h1 className='font-black text-4xl'>{nombre}</h1>
				<div className='flex items-center gap-2 text-gray-600 text-sm hover:text-black cursor-pointer'>
					<svg
						xmlns='http://www.w3.org/2000/svg'
						fill='none'
						viewBox='0 0 24 24'
						strokeWidth={1.5}
						stroke='currentColor'
						className='w-4 h-4'
					>
						<path
							strokeLinecap='round'
							strokeLinejoin='round'
							d='M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125'
						/>
					</svg>
					<Link
						to={`/proyectos/editar/${params.id}`}
						className='uppercase font-bold'
					>
						Editar
					</Link>
					<button
						className='flex gap-2 ml-5 px-1 py-3 text-sm items-center text-gray-600 rounded-lg uppercase font-bold hover:text-red-700 transition-colors'
						onClick={handleEliminar}
					>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							fill='none'
							viewBox='0 0 24 24'
							strokeWidth={1.5}
							stroke='currentColor'
							className='w-4 h-4'
						>
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								d='M6 18L18 6M6 6l12 12'
							/>
						</svg>
						Eliminar Proyecto
					</button>
				</div>
			</div>

			{modalFormularioTarea ? (
				<></> // Contenido cuando modal es true
			) : (
				msg && <Alerta alerta={alerta} /> // Contenido cuando modal es false y msg es true
			)}

			<button
				type='button'
				className='flex items-center justify-center gap-2 text-sm mt-5 px-5 py-3 w-full md:w-auto rounded-lg uppercase font-bold bg-slate-800 text-white text-center hover:bg-slate-950 transition-colors'
				onClick={handleModalTarea}
			>
				<svg
					xmlns='http://www.w3.org/2000/svg'
					fill='none'
					viewBox='0 0 24 24'
					strokeWidth={1.5}
					stroke='currentColor'
					className='w-5 h-5'
				>
					<path
						strokeLinecap='round'
						strokeLinejoin='round'
						d='M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m8.9-4.414c.376.023.75.05 1.124.08 1.131.094 1.976 1.057 1.976 2.192V16.5A2.25 2.25 0 0118 18.75h-2.25m-7.5-10.5H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V18.75m-7.5-10.5h6.375c.621 0 1.125.504 1.125 1.125v9.375m-8.25-3l1.5 1.5 3-3.75'
					/>
				</svg>
				Crear Tarea
			</button>

			<div className='grid grid-cols-1 md:grid-cols-2 gap-5 mt-5'>
				<div className='bg-white rounded-lg shadow-lg p-5'>
					<h2 className='font-bold text-xl mb-3'>Descripción</h2>
					<p className='text-gray-600'>{descripcion}</p>
				</div>
				<div className='bg-white rounded-lg shadow-lg p-5'>
					<h2 className='font-bold text-xl mb-3'>Información</h2>
					<ul className='text-gray-600'>
						<li>
							<span className='font-bold'>Proyecto: </span>
							{nombre}
						</li>
						<li>
							<span className='font-bold'>Cliente: </span>
							{cliente}
						</li>

						<li>
							<span className='font-bold'>
								Fecha de entrega:{' '}
							</span>
							{fechaFormateada}
						</li>
					</ul>
				</div>
			</div>

			<h2 className='font-bold text-xl mt-10'>Tareas del proyecto</h2>

			<div className='mt-10'>
				{proyecto.tareas?.length ? (
					proyecto.tareas?.map(tarea => (
						<PreviewTarea key={tarea._id} tarea={tarea} />
					))
				) : (
					<p className='text-center text-gray-600 uppercase p-10 my-5'>
						No hay tareas aún
					</p>
				)}
			</div>

			<ModalFormularioTarea />
			<ModalEliminarTarea />
		</>
	);
};

export default Proyecto;
