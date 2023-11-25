import FormularioColaborador from '../components/FormularioColaborador';
import { useParams } from 'react-router-dom';
import useProyectos from '../hooks/useProyectos';
import Loading from '../components/Loading';
import { useEffect } from 'react';

const NuevoColaborador = () => {
	const params = useParams();

	const { proyectos, cargando, colaborador, proyecto, agregarColaborador } =
		useProyectos();

	return (
		<>
			<h1 className='text-2xl font-black'>
				Añadir Colaborador al proyecto: {proyecto?.nombre}
			</h1>
			<div className='mt-10 flex justify-center'>
				<FormularioColaborador />
			</div>

			{cargando ? (
				<Loading />
			) : (
				colaborador?._id && (
					<div className='flex justify-center mt-10'>
						<div className='bg-white py-10 px-5 md:w-1/2 rounded-lg shadow'>
							<h2 className='text-2xl mb-4 font-black'>
								Resultado:
							</h2>
							<div className='flex flex-wrap gap-2 items-center'>
								<p className='text-lg font-bold'>Email: </p>{' '}
								{colaborador.email}
								<p className='text-lg'></p>
								<p className='text-lg font-bold'>Nombre:</p>
								<p className='text-lg'>{colaborador.nombre}</p>
							</div>
							<p className='text-lg font-bold'>
								Agregar al Proyecto:
							</p>
							<p className='text-lg'>{proyecto?.nombre}</p>
							<button
								className='bg-slate-800 text-xs font-bold uppercase text-white px-5 py-3 rounded-md mt-5 hover:bg-slate-950 transition-colors'
								onClick={() =>
									agregarColaborador({
										email: colaborador.email,
									})
								}
							>
								Añadir Colaborador
							</button>
						</div>
					</div>
				)
			)}
		</>
	);
};

export default NuevoColaborador;
