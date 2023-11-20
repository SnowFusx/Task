import { useState, useEffect, createContext } from 'react';
import Alerta from '../components/Alerta';
import clienteAxios from '../config/clienteAxios';
import { useNavigate } from 'react-router-dom';

const ProyectosContext = createContext();

const ProyectosProvider = ({ children }) => {
	const [proyectos, setProyectos] = useState([]);
	const [alerta, setAlerta] = useState({});

	const navigate = useNavigate();

	useEffect(() => {
		const obtenerProyectos = async () => {
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
			}
		};
		obtenerProyectos();
	}, []);

	const mostrarAlerta = alerta => {
		setAlerta(alerta);

		setTimeout(() => {
			setAlerta({});
		}, 5000);
	};

	const submitProyecto = async proyecto => {
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

			setProyectos([...proyectos, data]);

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

	return (
		<ProyectosContext.Provider
			value={{ proyectos, mostrarAlerta, alerta, submitProyecto }}
		>
			{children}
		</ProyectosContext.Provider>
	);
};

export { ProyectosProvider };
export default ProyectosContext;
