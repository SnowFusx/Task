import { Link } from 'react-router-dom';
import useProyectos from '../hooks/useProyectos';
import LinksNavigation from './LinksNavigation.jsx';
import { ViewIcon, EditIcon, EliminateIcon } from './constants';
import { formatearFecha } from '../helpers/formatearFecha';

const PreviewProyecto = ({ proyecto }) => {
	const { nombre, _id, cliente, createdAt, descripcion } = proyecto;

	const { eliminarProyecto } = useProyectos();
	const handleEliminar = () => {
		if (confirm('¿Estás seguro de eliminar el proyecto?')) {
			eliminarProyecto(_id);
			return;
		}
	};

	return (
		<div className=' bg-white shadow mt-5 rounded-lg h-48 w-64'>
			<div className='flex flex-col h-full justify-between p-5'>
				<Link to={`/proyectos/${_id}`} className='flex-1  font-bold'>
					<p className='flex-1'>{nombre}</p>

					<p className='text-sm text-gray-500'>
						{`${cliente} , creado el `}
						<span className='text-xs'>
							{`${formatearFecha(createdAt)}`}
						</span>
					</p>
					<p className='text-xs font-normal mt-2 text-gray-500'>
						{descripcion.slice(0, 100)}...
					</p>
				</Link>
				<div className='flex items-center gap-3 text-xs'>
					<LinksNavigation
						styles={
							'uppercase font-bold flex gap-1 items-center text-gray-600 hover:text-black cursor-pointer'
						}
						text={'Ver'}
						ruta={'/proyectos/'}
						id={_id}
						svg={<ViewIcon />}
						link={true}
					/>
					<LinksNavigation
						styles={
							'uppercase font-bold flex gap-1 items-center text-gray-600 hover:text-black cursor-pointer'
						}
						text={'Editar'}
						ruta={'/proyectos/editar/'}
						id={_id}
						svg={<EditIcon />}
						link={true}
					/>
					<LinksNavigation
						styles={
							'flex z-50 gap-0 px-1 text-xs items-center text-gray-600 rounded-lg uppercase font-bold hover:text-red-700 transition-colors'
						}
						text={'Eliminar'}
						svg={<EliminateIcon />}
						link={false}
						onClick={handleEliminar}
					/>
				</div>
			</div>
		</div>
	);
};

export default PreviewProyecto;
