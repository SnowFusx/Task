import { useState, useEffect, createContext } from 'react';
import Alerta from '../components/Alerta';
import clienteAxios from '../config/clienteAxios';
import { useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const ProyectosContext = createContext();

const ProyectosProvider = ({ children }) => {
	const [proyectos, setProyectos] = useState([]);
	const [tareas, setTareas] = useState([]);
	const [alerta, setAlerta] = useState({});
	const [proyecto, setProyecto] = useState({});
	const [tarea, setTarea] = useState({});
	const [cargando, setCargando] = useState(false);
	const [modalFormularioTarea, setModalFormularioTarea] = useState(false);

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
		setAlerta(alerta);

		setTimeout(() => {
			setAlerta({});
		}, 5000);
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

			setAlerta({
				msg: 'Proyecto editado correctamente',
				error: false,
			});

			setTimeout(() => {
				setAlerta({});
				navigate('/proyectos');
			}, 2000);
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

			setAlerta({
				msg: 'Proyecto creado correctamente',
				error: false,
			});

			setTimeout(() => {
				setAlerta({});
				navigate('/proyectos');
			}, 2000);
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

			setAlerta({
				msg: 'Proyecto eliminado correctamente',
				error: false,
			});

			setTimeout(() => {
				setAlerta({});
				navigate('/proyectos');
			}, 2000);
		} catch (error) {
			mostrarAlerta({
				msg: error.response.data.msg,
				error: true,
			});
		}
	};

	const handleModalTarea = () => {
		setModalFormularioTarea(!modalFormularioTarea);
	};

	const submitTarea = async tarea => {
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
				`/tareas`,
				{ ...tarea, proyecto: proyecto._id },
				config
			);

			const proyectoActualizado = {
				...proyecto,
				tareas: [...proyecto.tareas, data],
			};
			setProyecto(proyectoActualizado);

			setAlerta({
				msg: 'Tarea creada correctamente',
				error: false,
			});

			setTimeout(() => {
				setAlerta({});
				handleModalTarea();
			}, 2000);
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
				cerrarSesionProyecto,
			}}
		>
			{children}
		</ProyectosContext.Provider>
	);
};

export { ProyectosProvider };
export default ProyectosContext;
