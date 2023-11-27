import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useProyectos from '../hooks/useProyectos';
import usePropietario from '../hooks/usePropietario';
import FormularioProyecto from '../components/FormularioProyecto';
import Alerta from '../components/Alerta';
import Loading from '../components/Loading';

const EditarProyecto = () => {
	const params = useParams();
	const { obtenerProyecto, proyecto, cargando, eliminarProyecto, alerta } =
		useProyectos();

	const propietario = usePropietario();

	useEffect(() => {
		obtenerProyecto(params.id);
	}, []);

	const { nombre } = proyecto;

	const { msg } = alerta;

	//if (cargando) return <Loading />;
	if (msg && alerta.error) return <Alerta alerta={alerta} />;

	return (
		<>
			{propietario ? (
				<>
					<div className='flex justify-between'>
						<h1 className='font-black text-4xl'>
							Editando: {nombre}
						</h1>
					</div>
					<div className='mt-10 flex justify-center'>
						<FormularioProyecto />
					</div>
				</>
			) : (
				<p className='text-center text-gray-600 uppercase p-5'>
					No tienes permisos para editar este proyecto
				</p>
			)}
		</>
	);
};

export default EditarProyecto;
