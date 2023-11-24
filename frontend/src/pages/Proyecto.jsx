import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useProyectos from '../hooks/useProyectos';
import Alerta from '../components/Alerta';
import ModalFormularioTarea from '../components/ModalFormularioTarea';
import ModalEliminarTarea from '../components/ModalEliminarTarea.jsx';
import Loading from '../components/Loading';
import PreviewTarea from '../components/PreviewTarea.jsx';
import LinksNavigation from '../components/LinksNavigation.jsx';
import { formatearFecha } from '../helpers/formatearFecha';
import {
	CrearTareaIcon,
	EditIcon,
	EliminateIcon,
	NuevoColaboradorIcon,
	NuevoColaboradorXSIcon,
} from '../components/constants';

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

	const { msg } = alerta;

	if (cargando) return <Loading />;

	return (
		<>
			<div className='flex justify-between'>
				<h1 className='font-black text-4xl'>{nombre}</h1>
				<div className='flex items-center gap-2 text-gray-600 text-sm hover:text-black cursor-pointer'>
					<LinksNavigation
						styles={
							'flex gap-1 px-1 text-xs items-center text-gray-600 rounded-lg uppercase font-bold hover:text-gray-700 transition-colors'
						}
						text={'Editar'}
						ruta={'/proyectos/editar/'}
						id={params.id}
						svg={<EditIcon />}
						link={true}
					/>

					<LinksNavigation
						styles={
							'flex gap-1 px-1 text-xs items-center text-gray-600 rounded-lg uppercase font-bold hover:text-red-700 transition-colors'
						}
						text={'Eliminar proyecto'}
						svg={<EliminateIcon />}
						link={false}
						onClick={handleEliminar}
					/>
				</div>
			</div>

			{modalFormularioTarea ? (
				<></> // Contenido cuando modal es true
			) : (
				msg && <Alerta alerta={alerta} /> // Contenido cuando modal es false y msg es true
			)}

			<LinksNavigation
				styles={
					'flex items-center justify-center gap-2 text-sm mt-5 px-5 py-3 w-full md:w-auto rounded-lg uppercase font-bold bg-slate-800 text-white text-center hover:bg-slate-950 transition-colors'
				}
				text={'Crear Tarea'}
				svg={<CrearTareaIcon />}
				link={false}
				onClick={handleModalTarea}
			/>

			<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-5 mt-5'>
				<div className='bg-white rounded-lg shadow p-5'>
					<h2 className='font-bold text-xl mb-3'>Descripción</h2>
					<p className='text-gray-600'>{descripcion}</p>
				</div>
				<div className='bg-white rounded-lg shadow p-5'>
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
							<span className='font-bold'>Fecha de entrega:</span>
						</li>
					</ul>
				</div>
			</div>

			<div className='flex flex-wrap gap-5'>
				<div className='lg:w-2/3  mt-5 mr-4 '>
					<h2 className='font-bold text-xl my-5'>
						Tareas del proyecto
					</h2>
					<div className='flex flex-wrap gap-4 lg:border-r-2'>
						{proyecto.tareas?.length ? (
							proyecto.tareas?.map(tarea => (
								<PreviewTarea key={tarea._id} tarea={tarea} />
							))
						) : (
							<p className='text-gray-600 uppercase'>
								No hay tareas aún
							</p>
						)}
					</div>
				</div>
				<div className='mt-5 lg:w-1/4'>
					<div className='flex gap-2 items-center'>
						<h2 className='font-bold text-xl my-5'>
							Colaboradores{' '}
						</h2>
						<LinksNavigation
							styles={
								'flex gap-1 px-1 text-xs items-center text-gray-600 rounded-lg uppercase font-bold hover:text-gray-700 transition-colors'
							}
							text={'Nuevo'}
							svg={<NuevoColaboradorXSIcon />}
							link={true}
							ruta={`/proyectos/nuevo-colaborador/`}
							id={proyecto._id}
						/>
					</div>
					<div className='flex flex-wrap gap-4'>
						{proyecto.tareas?.length ? (
							proyecto.tareas?.map(tarea => (
								<PreviewTarea key={tarea._id} tarea={tarea} />
							))
						) : (
							<p className=' text-gray-600 uppercase'>
								Sin colaboradores
							</p>
						)}
					</div>
				</div>
			</div>

			<ModalFormularioTarea />
			<ModalEliminarTarea />
		</>
	);
};

export default Proyecto;
