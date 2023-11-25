import useProyectos from '../hooks/useProyectos';
import LinksNavigation from './LinksNavigation.jsx';
import { formatearFecha } from '../helpers/formatearFecha';
import { EliminateIcon, EliminarColaboradorIcon } from './constants';

const PreviewColaborador = ({ colaborador }) => {
	const { nombre, email } = colaborador;

	const { handleModalEditarTarea, handleModalEliminarTarea } = useProyectos();

	const handleEliminar = () => {
		// if (confirm('¿Estás seguro de eliminar la tarea?')) {
		// 	eliminarTarea(_id);
		// 	return;
		// }
	};

	return (
		<div className={`bg-white shadow rounded-lg w-[300px] min-w-[300px]`}>
			<div className='p-5'>
				<div className={`flex-1 items-center font-bold`}>
					<div className='flex gap-2 items-center'>
						<div className='text-sm'>
							{nombre.length >= 25
								? `${nombre.slice(0, 25)}...`
								: nombre}
						</div>
						<LinksNavigation
							styles={
								'flex text-xs gap-2 items-center text-gray-600 rounded-lg font-bold hover:text-red-700 transition-colors'
							}
							text={'Eliminar'}
							svg={<EliminarColaboradorIcon />}
							link={false}
							onClick={() => handleModalEliminarTarea(tarea)}
						/>
					</div>

					<p className='text-sm mt-1'>
						Email:{' '}
						<span className='text-gray-600 font-light'>
							{email}
						</span>
					</p>
					<p className='flex gap-2 text-sm mt-1'></p>
				</div>
			</div>
		</div>
	);
};

export default PreviewColaborador;
