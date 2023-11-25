import FormularioColaborador from '../components/FormularioColaborador';
import { useParams } from 'react-router-dom';
import useProyectos from '../hooks/useProyectos';

const NuevoColaborador = () => {
	const params = useParams();

	const { proyectos } = useProyectos();

	const proyectoAsociado = proyectos.find(
		proyecto => proyecto._id === params.id
	);

	return (
		<>
			<h1 className='text-4xl font-black'>
				Añadir Colaborador: {proyectoAsociado?.nombre}
			</h1>
			<div className='mt-10 flex justify-center'>
				<FormularioColaborador />
			</div>
		</>
	);
};

export default NuevoColaborador;
