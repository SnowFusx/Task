import useProyectos from '../hooks/useProyectos';
import PreviewProyecto from '../components/PreviewProyecto';
import ModalEliminarProyecto from '../components/ModalEliminarProyecto';
import { useEffect } from 'react';

const Proyectos = () => {
	const { proyectos, setProyecto } = useProyectos();

	useEffect(() => {
		setProyecto({});
	}, []);

	return (
		<>
			<h1 className='text-4xl font-black'>Proyectos</h1>

			<div className='mt-10 flex flex-wrap gap-4'>
				{proyectos.length ? (
					proyectos
						?.slice()
						.sort((a, b) => {
							return (
								new Date(b.createdAt) - new Date(a.createdAt)
							);
						})
						.map(proyecto => (
							<PreviewProyecto
								key={proyecto._id}
								proyecto={proyecto}
							/>
						))
				) : (
					<p className='text-center text-gray-600 uppercase p-5'>
						No hay proyectos aún
					</p>
				)}
			</div>
			<ModalEliminarProyecto />
		</>
	);
};

export default Proyectos;
