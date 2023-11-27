import { useState, useEffect, createContext } from 'react';
import clienteAxios from '../config/clienteAxios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import useAuth from '../hooks/useAuth';
import { obtenerProyectos } from '../../../backend/controllers/proyectoController';

const ProyectosContext = createContext();

const ProyectosProvider = ({ children }) => {
	const [proyectos, setProyectos] = useState([]);
	const [alerta, setAlerta] = useState({});
	const [proyecto, setProyecto] = useState({});
	const [modalEliminarProyecto, setModalEliminarProyecto] = useState(false);
	const [cargando, setCargando] = useState(false);
	const [modalFormularioTarea, setModalFormularioTarea] = useState(false);
	const [modalEliminarTarea, setModalEliminarTarea] = useState(false);
	const [tarea, setTarea] = useState({});
	const [colaborador, setColaborador] = useState({});
	const [modalEliminarColaborador, setModalEliminarColaborador] =
		useState(false);
	const [buscador, setBuscador] = useState(false);

	const { auth } = useAuth();
	const navigate = useNavigate();

	useEffect(() => {
		const obtenerProyectos = async () => {
			setAlerta({});
			setCargando(true);
			try {
				const token = localStorage.getItem('token');
				if (!token) {
					navigate('/');
					return;
				}
				const config = {
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${token}`,
					},
				};
				const { data } = await clienteAxios.get(`/proyectos`, config);
				setProyectos(data);
			} catch (error) {
				console.log(error.response);
			} finally {
				setCargando(false);
			}
		};
		obtenerProyectos();
	}, [auth, proyectos.length]);

	const mostrarAlerta = alerta => {
		toast.error(alerta.msg, {
			position: 'bottom-right',
			autoClose: 1500,
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: false,
			draggable: true,
			progress: undefined,
		});
	};

	const submitProyecto = async proyecto => {
		if (proyecto.id) {
			await editarProyecto(proyecto);
			return;
		} else {
			await nuevoProyecto(proyecto);
			return;
		}
	};

	const editarProyecto = async proyecto => {
		try {
			const token = localStorage.getItem('token');
			if (!token) {
				navigate('/');
				return;
			}
			const config = {
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`,
				},
			};
			const { data } = await clienteAxios.put(
				`/proyectos/${proyecto.id}`,
				proyecto,
				config
			);

			// Sincronizar el state
			const proyectosActualizados = proyectos.map(proyectoState =>
				proyectoState._id === data._id ? data : proyectoState
			);
			setProyectos(proyectosActualizados);

			toast.success('Proyecto editado correctamente', {
				position: 'bottom-right',
				autoClose: 1500,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: false,
				draggable: true,
				progress: undefined,
			});

			setAlerta({});
			navigate(`/proyectos/${proyecto.id}`);
		} catch (error) {
			mostrarAlerta({
				msg: error.response.data.msg,
				error: true,
			});
		}
	};

	const nuevoProyecto = async proyecto => {
		try {
			const token = localStorage.getItem('token');
			const config = {
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`,
				},
			};
			const { data } = await clienteAxios.post(
				`/proyectos`,
				proyecto,
				config
			);

			setProyectos([data, ...proyectos]);

			toast.success('Proyecto creado correctamente', {
				position: 'bottom-right',
				autoClose: 1500,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: false,
				draggable: true,
				progress: undefined,
			});

			setAlerta({});
			navigate('/proyectos');
		} catch (error) {
			mostrarAlerta({
				msg: error.response.data.msg,
				error: true,
			});
		}
	};

	const obtenerProyecto = async id => {
		setAlerta({});
		setCargando(true);
		try {
			const token = localStorage.getItem('token');
			if (!token) {
				navigate('/');
				return;
			}
			const config = {
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`,
				},
			};
			const { data } = await clienteAxios.get(`/proyectos/${id}`, config);
			setProyecto(data);
		} catch (error) {
			setAlerta({
				msg: error.response.data.msg,
				error: true,
			});
			mostrarAlerta({
				msg: error.response.data.msg,
				error: true,
			});
			navigate('/proyectos');
		} finally {
			setCargando(false);
		}
	};

	const handleModalEliminarProyecto = proyecto => {
		setProyecto(proyecto);
		setModalEliminarProyecto(!modalEliminarProyecto);
	};

	const eliminarProyecto = async () => {
		try {
			const token = localStorage.getItem('token');
			if (!token) {
				navigate('/');
				return;
			}
			const config = {
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`,
				},
			};

			console.log(proyecto._id);

			await clienteAxios.delete(`/proyectos/${proyecto._id}`, config);

			// Sincronizar el state

			const proyectosActualizados = proyectos.filter(
				proyectoState => proyectoState._id !== proyecto._id
			);
			setProyectos(proyectosActualizados);

			toast.success('Proyecto eliminado correctamente', {
				position: 'bottom-right',
				autoClose: 1500,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: false,
				draggable: true,
				progress: undefined,
			});

			setAlerta({});
			setModalEliminarProyecto(false);
			navigate('/proyectos');
		} catch (error) {
			mostrarAlerta({
				msg: error.response.data.msg,
				error: true,
			});
			obtenerProyectos();
			navigate('/proyectos');
		}
	};

	const handleModalTarea = () => {
		setModalFormularioTarea(!modalFormularioTarea);
		setTarea({});
	};

	const submitTarea = async tarea => {
		if (tarea?.id) {
			await editarTarea(tarea);
			return;
		} else {
			await nuevaTarea(tarea);
			return;
		}
	};

	const editarTarea = async tarea => {
		try {
			const token = localStorage.getItem('token');
			if (!token) {
				navigate('/');
				return;
			}
			const config = {
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`,
				},
			};
			const { data } = await clienteAxios.put(
				`/tareas/${tarea.id}`,
				tarea,
				config
			);

			// Destructuring data
			const { tareaActualizada } = data;

			// Sincronizar el state
			const proyectoActualizado = { ...proyecto };
			proyectoActualizado.tareas = proyecto.tareas.map(tareaState =>
				tareaState._id === tareaActualizada._id
					? tareaActualizada
					: tareaState
			);
			setProyecto(proyectoActualizado);

			toast.success('Tarea editada correctamente', {
				position: 'bottom-right',
				autoClose: 1500,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: false,
				draggable: true,
				progress: undefined,
			});

			setAlerta({});
			setModalFormularioTarea(false);
		} catch (error) {
			mostrarAlerta({
				msg: error.response.data.msg,
				error: true,
			});
		}
	};

	const nuevaTarea = async tarea => {
		try {
			const token = localStorage.getItem('token');
			if (!token) {
				navigate('/');
				return;
			}
			const config = {
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`,
				},
			};
			const { data } = await clienteAxios.post(`/tareas`, tarea, config);

			// Destructuring data
			const { tareaAlmacenada } = data;

			// Sincronizar el state
			const proyectoActualizado = { ...proyecto };
			proyectoActualizado.tareas = [...proyecto.tareas, tareaAlmacenada];
			setProyecto(proyectoActualizado);

			toast.success('Tarea creada correctamente', {
				position: 'bottom-right',
				autoClose: 1500,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: false,
				draggable: true,
				progress: undefined,
			});

			setAlerta({});
			setModalFormularioTarea(false);
		} catch (error) {
			mostrarAlerta({
				msg: error.response.data.msg,
				error: true,
			});
		}
	};

	const handleModalEditarTarea = tarea => {
		setTarea(tarea);
		setModalFormularioTarea(!modalFormularioTarea);
	};

	const handleModalEliminarTarea = tarea => {
		setTarea(tarea);
		setModalEliminarTarea(!modalEliminarTarea);
	};

	const eliminarTarea = async () => {
		try {
			const token = localStorage.getItem('token');
			if (!token) {
				navigate('/');
				return;
			}
			const config = {
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`,
				},
			};
			await clienteAxios.delete(`/tareas/${tarea._id}`, config);

			// Sincronizar el state
			const proyectoActualizado = { ...proyecto };
			proyectoActualizado.tareas = proyectoActualizado.tareas.filter(
				tareaState => tareaState._id !== tarea._id
			);
			setProyecto(proyectoActualizado);

			toast.success('Tarea eliminada correctamente', {
				position: 'bottom-right',
				autoClose: 1500,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: false,
				draggable: true,
				progress: undefined,
			});

			setAlerta({});
			setModalEliminarTarea(false);
			setTarea({});
		} catch (error) {
			mostrarAlerta({
				msg: error.response.data.msg,
				error: true,
			});
		}
	};

	const buscarColaborador = async email => {
		setCargando(true);
		try {
			const token = localStorage.getItem('token');
			if (!token) {
				navigate('/');
				return;
			}
			const config = {
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`,
				},
			};

			const { data } = await clienteAxios.post(
				`/proyectos/colaboradores`,
				{ email },
				config
			);

			setColaborador(data);
			setAlerta({});
			console.log(data);
		} catch (error) {
			mostrarAlerta({
				msg: error.response.data.msg,
				error: true,
			});
			setColaborador({});
		} finally {
			setCargando(false);
		}
	};

	const agregarColaborador = async email => {
		try {
			const token = localStorage.getItem('token');
			if (!token) {
				navigate('/');
				return;
			}
			const config = {
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`,
				},
			};

			const { data } = await clienteAxios.post(
				`/proyectos/colaboradores/${proyecto._id}`,
				email,
				config
			);

			toast.success('Colaborador añadido correctamente', {
				position: 'bottom-right',
				autoClose: 1500,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: false,
				draggable: true,
				progress: undefined,
			});
			setAlerta({});
			setColaborador({});

			setTimeout(() => {
				navigate(`/proyectos/${proyecto._id}`);
			}, 1500);
		} catch (error) {
			mostrarAlerta({
				msg: error.response.data.msg,
				error: true,
			});
		}
	};

	const handleModalEliminarColaborador = colaborador => {
		setModalEliminarColaborador(!modalEliminarColaborador);
		setColaborador(colaborador);
	};

	const eliminarColaborador = async () => {
		try {
			const token = localStorage.getItem('token');
			if (!token) {
				navigate('/');
				return;
			}
			const config = {
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`,
				},
			};

			const { data } = await clienteAxios.post(
				`/proyectos/eliminar-colaborador/${proyecto._id}`,
				{ id: colaborador._id },
				config
			);

			toast.success('Colaborador eliminado correctamente', {
				position: 'bottom-right',
				autoClose: 1500,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: false,
				draggable: true,
				progress: undefined,
			});

			// Sincronizar el state
			const proyectoActualizado = { ...proyecto };
			proyectoActualizado.colaboradores =
				proyectoActualizado.colaboradores.filter(
					colaboradorState => colaboradorState._id !== colaborador._id
				);
			setProyecto(proyectoActualizado);

			setAlerta({});
			setColaborador({});
			setModalEliminarColaborador(false);
		} catch (error) {
			mostrarAlerta({
				msg: error.response.data.msg,
				error: true,
			});
		}
	};

	const completarTarea = async id => {
		try {
			const token = localStorage.getItem('token');
			if (!token) {
				navigate('/');
				return;
			}
			const config = {
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`,
				},
			};

			const { data } = await clienteAxios.post(
				`/tareas/estado/${id}`,
				{},
				config
			);

			// Destructuring data
			const { tareaAlmacenada } = data;

			// Sincronizar el state
			const proyectoActualizado = { ...proyecto };
			proyectoActualizado.tareas = proyecto.tareas.map(tareaState =>
				tareaState._id === tareaAlmacenada._id
					? tareaAlmacenada
					: tareaState
			);
			setProyecto(proyectoActualizado);
			setTarea({});

			toast.success('Tarea actualizada correctamente', {
				position: 'bottom-right',
				autoClose: 1500,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: false,
				draggable: true,
				progress: undefined,
			});

			setAlerta({});
		} catch (error) {
			mostrarAlerta({
				msg: error.response.data.msg,
				error: true,
			});
		} finally {
			setCargando(false);
		}
	};

	const handleBuscador = () => {
		setBuscador(!buscador);
	};

	const cerrarSesionProyecto = () => {
		setProyectos([]);
		setProyecto({});
		setAlerta({});
	};

	return (
		<ProyectosContext.Provider
			value={{
				proyectos,
				mostrarAlerta,
				alerta,
				submitProyecto,
				obtenerProyecto,
				proyecto,
				setProyecto,
				modalEliminarProyecto,
				handleModalEliminarProyecto,
				cargando,
				eliminarProyecto,
				modalFormularioTarea,
				handleModalTarea,
				submitTarea,
				handleModalEditarTarea,
				tarea,
				modalEliminarTarea,
				handleModalEliminarTarea,
				eliminarTarea,
				buscarColaborador,
				colaborador,
				setColaborador,
				agregarColaborador,
				modalEliminarColaborador,
				handleModalEliminarColaborador,
				eliminarColaborador,
				completarTarea,
				buscador,
				setBuscador,
				handleBuscador,
				cerrarSesionProyecto,
			}}
		>
			{children}
		</ProyectosContext.Provider>
	);
};

export { ProyectosProvider };
export default ProyectosContext;
