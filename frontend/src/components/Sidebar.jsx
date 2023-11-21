import { Link } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const Sidebar = () => {
	const { auth } = useAuth();
	return (
		<>
			<aside className='md:w-80 lg:w-96 px-5 py-10 bg-gray-200'>
				<p className='text-xl font-bold'>Bienvenido/a, {auth.nombre}</p>
				<Link
					className='bg-sky-950 p-3 text-white uppercase font-bold block mt-5 text-center rounded-lg hover:bg-sky-700 transition duration-300'
					to='crear-proyecto'
				>
					Nuevo Proyecto
				</Link>
			</aside>
		</>
	);
};

export default Sidebar;
