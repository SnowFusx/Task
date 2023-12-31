import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useProyectos from '../hooks/useProyectos';
import usePropietario from '../hooks/usePropietario.jsx';
import Alerta from '../components/Alerta';
import ModalFormularioTarea from '../components/ModalFormularioTarea';
import ModalEliminarTarea from '../components/ModalEliminarTarea.jsx';
import ModalEliminarColaborador from '../components/ModalEliminarColaborador.jsx';
import ModalEliminarProyecto from '../components/ModalEliminarProyecto.jsx';
import PreviewTarea from '../components/PreviewTarea.jsx';
import Loading from '../components/Loading.jsx';
import PreviewColaborador from '../components/PreviewColaborador.jsx';
import LinksNavigation from '../components/LinksNavigation.jsx';
import io from 'socket.io-client';
let socket;

import {
	CrearTareaIcon,
	EditIcon,
	EliminateIcon,
	NuevoColaboradorXSIcon,
} from '../components/constants';

const Proyecto = () => {
	const params = useParams();

	const propietario = usePropietario();

	const { handleModalEliminarProyecto } = useProyectos();

	const {
		obtenerProyecto,
		proyecto,
		cargando,
		alerta,
		eliminarProyecto,
		handleModalTarea,
		modalFormularioTarea,
		submitTareasProyecto,
		updateCompletarTarea,
		eliminarTareaProyecto,
		actualizarTareaProyecto,
	} = useProyectos();

	useEffect(() => {
		obtenerProyecto(params.id);
	}, []);

	useEffect(() => {
		socket = io(import.meta.env.VITE_BACKEND_URL);
		socket.emit('abrir-proyecto', params.id);
	}, []);

	useEffect(() => {
		socket.on('tarea-agregada', tareaNueva => {
			if (tareaNueva.proyecto === proyecto._id) {
				submitTareasProyecto(tareaNueva);
			}
		});
		socket.on('tarea-completada', tareaCompletada => {
			if (tareaCompletada.proyecto._id === proyecto._id) {
				updateCompletarTarea(tareaCompletada);
			}
		});
		socket.on('tarea-eliminada', tareaEliminada => {
			if (tareaEliminada.proyecto === proyecto._id) {
				eliminarTareaProyecto(tareaEliminada);
			}
		});
		socket.on('tarea-actualizada', tareaActualizada => {
			if (tareaActualizada.proyecto._id === proyecto._id) {
				actualizarTareaProyecto(tareaActualizada);
			}
		});
	});

	const { nombre, descripcion, cliente, fechaEntrega } = proyecto;

	const { msg } = alerta;

	if (cargando) return <Loading />;
	if (msg && alerta.error) return <Alerta alerta={alerta} />;

	return (
		<>
			<div className='flex justify-between flex-wrap gap-4'>
				<div className=''>
					{propietario ? (
						<p className='text-sm p-2 bg-slate-700 text-slate-300 rounded max-w-fit'>
							Propietario
						</p>
					) : (
						<p className='text-sm p-2 bg-slate-700 rounded text-slate-300 max-w-fit'>
							Colaborador
						</p>
					)}
					<h1 className='font-black text-4xl'>{nombre}</h1>
				</div>
				{propietario && (
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
							onClick={() =>
								handleModalEliminarProyecto(proyecto)
							}
						/>
					</div>
				)}
			</div>

			<div className='flex flex-wrap gap-4 mt-10'>
				<div className='bg-white w-1/4 min-w-[300px] lg:max-w-[300px] grow rounded-lg shadow p-5'>
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
						</li>
					</ul>
				</div>
				<div className='bg-white rounded-lg grow min-w-[300px] flex-1 shadow p-5'>
					<h2 className='font-bold text-xl mb-3'>Descripción</h2>
					<p className='text-gray-600'>{descripcion}</p>
				</div>
			</div>

			<div className='flex flex-wrap gap-5'>
				{propietario && (
					<div className='mt-5 w-full'>
						<div className='flex gap-2 items-center'>
							<h2 className='font-bold text-xl my-5'>
								Colaboradores{' '}
							</h2>
							{propietario && (
								<LinksNavigation
									styles={
										'flex gap-1 px-1 pt-1 text-xs items-center text-gray-600 rounded-lg uppercase font-bold hover:text-gray-700 transition-colors'
									}
									text={'Nuevo'}
									svg={<NuevoColaboradorXSIcon />}
									link={true}
									ruta={`/proyectos/nuevo-colaborador/`}
									id={proyecto._id}
								/>
							)}
						</div>
						<div className='flex flex-wrap gap-4'>
							{proyecto.colaboradores?.length ? (
								proyecto.colaboradores?.map(colaborador => (
									<PreviewColaborador
										key={colaborador._id}
										colaborador={colaborador}
									/>
								))
							) : (
								<p className=' text-gray-600 uppercase'>
									Sin colaboradores
								</p>
							)}
						</div>
					</div>
				)}
				<div className=''>
					<div className='flex gap-2'>
						<h2 className='font-bold text-xl my-5'>
							Tareas del proyecto
						</h2>
						{propietario && (
							<LinksNavigation
								styles={
									'flex gap-1 px-1 pt-1 text-xs items-center text-gray-600 rounded-lg uppercase font-bold hover:text-gray-700 transition-colors'
								}
								text={'Crear Tarea'}
								svg={<CrearTareaIcon />}
								link={false}
								onClick={handleModalTarea}
							/>
						)}
					</div>
					<div className='flex flex-wrap gap-4'>
						{proyecto.tareas?.length ? (
							proyecto.tareas
								?.slice() // Hacemos una copia del array para no modificar el original
								.sort((a, b) => {
									// Primero, ordenamos por estado (true al final)
									if (a.estado === b.estado) {
										// Si los estados son iguales, ordenamos por createdAt (más reciente primero)
										return -a.createdAt.localeCompare(
											b.createdAt
										);
									}
									// Ordenamos por estado
									return a.estado ? 1 : -1;
								})
								.map(tarea => (
									<PreviewTarea
										key={tarea._id}
										tarea={tarea}
									/>
								))
						) : (
							<p className='text-gray-600 uppercase'>
								No hay tareas aún
							</p>
						)}
					</div>
				</div>
			</div>

			<ModalFormularioTarea />
			<ModalEliminarTarea />
			<ModalEliminarColaborador />
			<ModalEliminarProyecto />
		</>
	);
};

export default Proyecto;
