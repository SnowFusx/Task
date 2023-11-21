import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useProyectos from '../hooks/useProyectos';
import FormularioProyecto from '../components/FormularioProyecto';

const EditarProyecto = () => {
	const params = useParams();
	const { obtenerProyecto, proyecto, cargando, eliminarProyecto } =
		useProyectos();

	useEffect(() => {
		obtenerProyecto(params.id);
	}, []);

	const { nombre } = proyecto;

	const handleEliminar = () => {
		if (confirm('¿Estás seguro de eliminar el proyecto?')) {
			eliminarProyecto(params.id);
		}
	};

	if (cargando) return <div>Cargando...</div>;

	return (
		<>
			<div className='flex justify-between'>
				<h1 className='font-black text-4xl'>Editando: {nombre}</h1>

				<button
					className='flex gap-2 ml-5 px-5 py-3 text-sm items-center text-gray-600 rounded-lg uppercase font-bold hover:text-red-700 transition-colors'
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
							d='M6 18L18 6M6 6l12 12'
						/>
					</svg>
					Eliminar Proyecto
				</button>
			</div>
			<div className='mt-10 flex justify-center'>
				<FormularioProyecto />
			</div>
		</>
	);
};

export default EditarProyecto;
