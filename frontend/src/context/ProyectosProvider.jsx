import { useState, useEffect, createContext } from 'react';
import Alerta from '../components/Alerta';
import clienteAxios from '../config/clienteAxios';
import { useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import { toast } from 'sonner';

const ProyectosContext = createContext();

const ProyectosProvider = ({ children }) => {
	const [proyectos, setProyectos] = useState([]);
	const [alerta, setAlerta] = useState({});
	const [proyecto, setProyecto] = useState({});
	const [cargando, setCargando] = useState(false);
	const [modalFormularioTarea, setModalFormularioTarea] = useState(false);
	const [modalEliminarTarea, setModalEliminarTarea] = useState(false);
	const [tarea, setTarea] = useState({});

	const navigate = useNavigate();
	const { auth } = useAuth();

	useEffect(() => {
		const obtenerProyectos = async () => {
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
	}, [auth]);

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
			console.log(error.response);
		} finally {
			setCargando(false);
		}
	};

	const eliminarProyecto = async id => {
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
			await clienteAxios.delete(`/proyectos/${id}`, config);

			const proyectosActualizados = proyectos.filter(
				proyecto => proyecto._id !== id
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
			navigate('/proyectos');
		} catch (error) {
			mostrarAlerta({
				msg: error.response.data.msg,
				error: true,
			});
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
				cerrarSesionProyecto,
			}}
		>
			{children}
		</ProyectosContext.Provider>
	);
};

export { ProyectosProvider };
export default ProyectosContext;
