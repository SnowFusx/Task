import { Link } from 'react-router-dom';

const PreviewProyecto = ({ proyecto }) => {
	const { nombre, _id, cliente } = proyecto;
	return (
		<div className='border-b p-5 flex'>
			<p className='flex-1'>
				{nombre}
				<span className='text-sm text-gray-500 uppercase'>
					{''} {cliente}{' '}
				</span>
			</p>
			<Link
				to={`${_id}`}
				className='ml-auto bg-gray-600 px-5 py-3 text-sm inline-block text-white rounded-lg uppercase font-bold hover:bg-gray-700 transition-colors'
			>
				Ver Proyecto
			</Link>
		</div>
	);
};

export default PreviewProyecto;
