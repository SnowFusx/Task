import useProyectos from '../hooks/useProyectos';
import useAuth from '../hooks/useAuth.jsx';
import usePropietario from '../hooks/usePropietario.jsx';
import LinksNavigation from './LinksNavigation.jsx';
import { formatearFecha } from '../helpers/formatearFecha';
import {
	ViewIcon,
	EditIcon,
	EliminateIcon,
	NoCheckedIcon,
	CheckedIcon,
} from './constants';

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

	const { auth } = useAuth();

	const prioridadColor =
		prioridad === 'alta'
			? 'bg-rose-600 text-white font-bold px-1 py-1 rounded text-xs tracking-wider w-16 text-center'
			: prioridad === 'media'
			? 'bg-amber-500 text-white font-bold  px-1 py-1 rounded text-xs tracking-wider w-16 text-center'
			: 'bg-lime-500 text-white font-bold  px-1 py-1 rounded text-xs tracking-wider w-16 text-center';

	const { handleModalEditarTarea, handleModalEliminarTarea, completarTarea } =
		useProyectos();

	const propietario = usePropietario();

	const estadoColor = estado ? 'bg-gray-300' : 'bg-white';
	const estadoTexto = estado ? 'line-through text-gray-500' : '';

	return (
		<div
			className={`${estadoColor} shadow rounded-lg w-[300px] min-w-[300px]`}
		>
			<div className='flex justify-between items-center pr-4'>
				{estado ? (
					<p className='text-xs uppercase font-bold text-slate-600 px-2 py-1 rounded-lg'>
						Completada por {tarea.completado.nombre}
					</p>
				) : (
					<p className={prioridadColor}>{prioridad}</p>
				)}
				<div className='flex items-center justify-end gap-2 text-xs mt-2'>
					<LinksNavigation
						styles={
							'uppercase font-bold flex items-center text-gray-600 hover:text-black cursor-pointer'
						}
						text={''}
						svg={estado ? <CheckedIcon /> : <NoCheckedIcon />}
						link={false}
						onClick={() => completarTarea(_id)}
					/>

					{propietario && (
						<LinksNavigation
							styles={
								'uppercase font-bold flex items-center text-gray-600 hover:text-black cursor-pointer'
							}
							text={''}
							id={_id}
							svg={<EditIcon />}
							link={false}
							onClick={() => handleModalEditarTarea(tarea)}
						/>
					)}
					<LinksNavigation
						styles={
							'flex text-xs items-center text-gray-600 rounded-lg uppercase font-bold hover:text-red-700 transition-colors'
						}
						text={''}
						svg={<EliminateIcon />}
						link={false}
						onClick={() => handleModalEliminarTarea(tarea)}
					/>
				</div>
			</div>
			<div className='p-5'>
				<div className={`${estadoTexto} flex-1  font-bold`}>
					<div className='flex gap-2'>
						{nombre.length >= 25
							? `${nombre.slice(0, 25)}...`
							: nombre}
					</div>
					<p className='text-sm text-gray-500'>
						{`Creada el `}
						<span className='text-xs'>{`${formatearFecha(
							createdAt
						)}`}</span>
					</p>
					<p className='text-sm text-gray-500'>
						{`Entrega prevista el `}
						<span className='text-xs'>{`${formatearFecha(
							fechaEntrega
						)}`}</span>
					</p>

					<p className='text-sm mt-1'>
						Descripción:{' '}
						<span className='text-gray-600 font-light'>
							{descripcion}
						</span>
					</p>
				</div>
			</div>
		</div>
	);
};

export default PreviewTarea;
