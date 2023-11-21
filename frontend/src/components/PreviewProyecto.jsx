import { Link } from 'react-router-dom';
import useProyectos from '../hooks/useProyectos';

const PreviewProyecto = ({ proyecto }) => {
	const { nombre, _id, cliente } = proyecto;

	const { confirmarEliminarProyecto } = useProyectos();
	return (
		<div className='border-b p-5 flex'>
			<Link
				to={`/proyectos/${_id}`}
				className='flex-1 uppercase font-bold'
			>
				<p className='flex-1'>
					{nombre}
					<span className='text-sm text-gray-500 uppercase'>
						{''} {cliente}{' '}
					</span>
				</p>
			</Link>
			<div className='flex items-center gap-2 '>
				<Link
					to={`/proyectos/${_id}`}
					className='flex gap-2 items-center uppercase font-bold text-gray-600 hover:text-black cursor-pointer'
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
							d='M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z'
						/>
						<path
							strokeLinecap='round'
							strokeLinejoin='round'
							d='M15 12a3 3 0 11-6 0 3 3 0 016 0z'
						/>
					</svg>
					Ver Proyecto
				</Link>

				<Link
					to={`/proyectos/editar/${_id}`}
					className='uppercase font-bold flex gap-2 items-center text-gray-600 hover:text-black cursor-pointer'
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
				</Link>
				<button
					className='flex gap-2 px-5 py-3 text-sm items-center text-gray-600 rounded-lg uppercase font-bold hover:text-red-700 transition-colors'
					onClick={() => confirmarEliminarProyecto(_id)}
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
							d='M6 18L18 6M6 6l12 12'
						/>
					</svg>
					<p>Eliminar Proyecto</p>
				</button>
			</div>
		</div>
	);
};

export default PreviewProyecto;