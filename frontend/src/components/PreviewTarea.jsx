import useProyectos from '../hooks/useProyectos';
import { formatearFecha } from '../helpers/formatearFecha.js';

const PreviewTarea = ({ tarea }) => {
	const {
		nombre,
		_id,
		descripcion,
		createdAt,
		prioridad,
		fechaEntrega,
		estado,
	} = tarea;

	const prioridadColor =
		prioridad === 'alta'
			? 'bg-rose-600 text-white font-bold px-1 py-1 rounded-lg text-xs tracking-wider w-16 text-center'
			: prioridad === 'media'
			? 'bg-amber-500 text-white font-bold  px-1 py-1 rounded-lg text-xs tracking-wider w-16 text-center'
			: 'bg-lime-500 text-white font-bold  px-1 py-1 rounded-lg text-xs tracking-wider w-16 text-center';

	// const fechaOriginalCreada = createdAt.split('T')[0];
	// const fechaFormateadaCreada = formatearFecha(fechaOriginalCreada);

	// const fechaOriginalEntrega = fechaEntrega.split('T')[0];
	// const fechaFormateadaEntrega = formatearFecha(fechaOriginalEntrega);

	const { handleModalEditarTarea, handleModalEliminarTarea } = useProyectos();

	const handleEliminar = () => {
		// if (confirm('¿Estás seguro de eliminar la tarea?')) {
		// 	eliminarTarea(_id);
		// 	return;
		// }
	};

	const estadoColor = estado ? 'bg-gray-300' : 'bg-white';
	const estadoTexto = estado ? 'line-through text-gray-500' : '';

	return (
		<div className={`${estadoColor} shadow mt-5 rounded-lg`}>
			{estado ? (
				<p className='text-xs uppercase font-bold text-white px-2 py-1 rounded-lg'>
					Completada
				</p>
			) : (
				<> </>
			)}
			<div className='border-b p-5 flex'>
				<div className={`${estadoTexto} flex-1  font-bold`}>
					<div className='flex gap-2'>
						{nombre}
						<p className={prioridadColor}>{prioridad}</p>
					</div>
					<p className='text-sm text-gray-500'>
						{''} Creada el <span className='text-xs'></span>
					</p>
					<p className='text-sm text-gray-500'>
						{''} Entrega prevista el{' '}
						<span className='text-xs'></span>
					</p>

					<p className='text-sm mt-1'>
						Descripción:{' '}
						<span className='text-gray-600 font-light'>
							{descripcion}
						</span>
					</p>
				</div>
				<div className='flex items-center gap-2 text-xs'>
					{estado ? (
						<button
							className='uppercase font-bold flex gap-2 items-center text-gray-600 hover:text-black cursor-pointer'
							onClick={handleEliminar}
						>
							<svg
								xmlns='http://www.w3.org/2000/svg'
								fill='none'
								viewBox='0 0 24 24'
								strokeWidth={1.5}
								stroke='currentColor'
								className='w-6 h-6'
							>
								<path
									strokeLinecap='round'
									strokeLinejoin='round'
									d='M10.125 2.25h-4.5c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125v-9M10.125 2.25h.375a9 9 0 019 9v.375M10.125 2.25A3.375 3.375 0 0113.5 5.625v1.5c0 .621.504 1.125 1.125 1.125h1.5a3.375 3.375 0 013.375 3.375M9 15l2.25 2.25L15 12'
								/>
							</svg>
						</button>
					) : (
						<button
							className='uppercase font-bold flex gap-2 items-center text-gray-600 hover:text-black cursor-pointer'
							onClick={handleEliminar}
						>
							<svg
								xmlns='http://www.w3.org/2000/svg'
								fill='none'
								viewBox='0 0 24 24'
								strokeWidth={1.5}
								stroke='currentColor'
								className='w-6 h-6'
							>
								<path
									strokeLinecap='round'
									strokeLinejoin='round'
									d='M5.25 7.5A2.25 2.25 0 017.5 5.25h9a2.25 2.25 0 012.25 2.25v9a2.25 2.25 0 01-2.25 2.25h-9a2.25 2.25 0 01-2.25-2.25v-9z'
								/>
							</svg>
						</button>
					)}

					<p className='text-sm text-gray-500'>|</p>

					<button
						className='uppercase font-bold flex gap-2 items-center text-gray-600 hover:text-black cursor-pointer'
						onClick={() => handleModalEditarTarea(tarea)}
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
								d='M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125'
							/>
						</svg>
						Editar
					</button>
					<button
						className='flex z-50 gap-1 px-1 py-3 text-xs items-center text-gray-600 rounded-lg uppercase font-bold hover:text-red-700 transition-colors'
						onClick={() => handleModalEliminarTarea(tarea)}
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
						<p>Eliminar Tarea</p>
					</button>
				</div>
			</div>
		</div>
	);
};

export default PreviewTarea;
