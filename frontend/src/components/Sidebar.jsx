import { Link } from 'react-router-dom';
import logo from '../assets/task.png';
import useProyectos from '../hooks/useProyectos';
import useAuth from '../hooks/useAuth';

const Sidebar = () => {
	const { auth, cerrarSesionAuth } = useAuth();
	const { cerrarSesionProyecto } = useProyectos();

	// Cerrar sesión
	const handleCerrarSesion = () => {
		cerrarSesionAuth();
		cerrarSesionProyecto();
		localStorage.removeItem('token');
	};
	return (
		<>
			<aside className='flex flex-col sticky top-0 max-h-screen min-h-screen justify-between md:w-80 lg:w-80 px-10 py-8 bg-gray-200'>
				<Link to='/proyectos'>
					<img src={logo} alt='logo' className='w-20' />
				</Link>
				<div className=''>
					<p className='text-gray-900 text-xl block font-semibold'>
						Mi perfil
					</p>
					<Link
						to='/'
						className='flex text-gray-500 mt-2 font-semibold text-lg  hover:text-gray-900 transition duration-300'
					>
						Editar perfil
					</Link>
					<Link
						to='/'
						className='flex text-gray-500 mt-2 font-semibold text-lg  hover:text-gray-900 transition duration-300'
					>
						Cambiar contraseña
					</Link>
				</div>
				<div className=''>
					<p className='text-gray-900 text-xl block font-semibold'>
						Menu
					</p>
					<Link
						to='/proyectos'
						className='flex items-center text-gray-500 mt-2 font-semibold text-lg  hover:text-gray-900 transition duration-300'
					>
						<svg
							viewBox='0 0 24 24'
							fill='currentColor'
							height='1em'
							width='1em'
							className='w-6 h-6 mr-2'
						>
							<path d='M12.71 2.29a1 1 0 00-1.42 0l-9 9a1 1 0 000 1.42A1 1 0 003 13h1v7a2 2 0 002 2h12a2 2 0 002-2v-7h1a1 1 0 001-1 1 1 0 00-.29-.71zM6 20v-9.59l6-6 6 6V20z' />
						</svg>
						Inicio
					</Link>
					<Link
						to='/proyectos'
						className='flex items-center text-gray-500 mt-2 font-semibold text-lg hover:text-gray-900 transition duration-300'
					>
						<svg
							viewBox='0 0 24 24'
							fill='currentColor'
							height='1em'
							width='1em'
							className='w-6 h-6 mr-2'
						>
							<path
								fillRule='evenodd'
								d='M11.063 1.456a1.75 1.75 0 011.874 0l8.383 5.316a1.75 1.75 0 010 2.956l-8.383 5.316a1.75 1.75 0 01-1.874 0L2.68 9.728a1.75 1.75 0 010-2.956l8.383-5.316zm1.071 1.267a.25.25 0 00-.268 0L3.483 8.039a.25.25 0 000 .422l8.383 5.316a.25.25 0 00.268 0l8.383-5.316a.25.25 0 000-.422l-8.383-5.316z'
							/>
							<path
								fillRule='evenodd'
								d='M1.867 12.324a.75.75 0 011.035-.232l8.964 5.685a.25.25 0 00.268 0l8.964-5.685a.75.75 0 01.804 1.267l-8.965 5.685a1.75 1.75 0 01-1.874 0l-8.965-5.685a.75.75 0 01-.231-1.035z'
							/>
							<path
								fillRule='evenodd'
								d='M1.867 16.324a.75.75 0 011.035-.232l8.964 5.685a.25.25 0 00.268 0l8.964-5.685a.75.75 0 01.804 1.267l-8.965 5.685a1.75 1.75 0 01-1.874 0l-8.965-5.685a.75.75 0 01-.231-1.035z'
							/>
						</svg>
						Proyectos
					</Link>
					<Link
						className='flex items-center text-gray-500 mt-2 font-semibold text-lg hover:text-gray-900 transition duration-300'
						to='crear-proyecto'
					>
						<svg
							fill='currentColor'
							viewBox='0 0 16 16'
							height='1em'
							width='1em'
							className='w-6 h-6 mr-2'
						>
							<path d='M8.186 1.113a.5.5 0 00-.372 0L1.846 3.5 8 5.961 14.154 3.5 8.186 1.113zM15 4.239l-6.5 2.6v7.922l6.5-2.6V4.24zM7.5 14.762V6.838L1 4.239v7.923l6.5 2.6zM7.443.184a1.5 1.5 0 011.114 0l7.129 2.852A.5.5 0 0116 3.5v8.662a1 1 0 01-.629.928l-7.185 2.874a.5.5 0 01-.372 0L.63 13.09a1 1 0 01-.63-.928V3.5a.5.5 0 01.314-.464L7.443.184z' />
						</svg>
						Nuevo Proyecto
					</Link>
				</div>
				<div className=''>
					<p className='text-gray-900 text-xl block font-semibold'>
						Favoritos
					</p>
					<Link
						to='/'
						className='flex text-gray-500 mt-2 font-semibold text-lg  hover:text-gray-900 transition duration-300'
					>
						Ejemplo 1
					</Link>
					<Link
						to='/'
						className='flex text-gray-500 mt-2 font-semibold text-lg  hover:text-gray-900 transition duration-300'
					>
						Ejemplo 2
					</Link>
				</div>
				<button
					type='button'
					className='flex w-full justify-center items-center gap-2 justify-items-center text-white text-sm font-bold uppercase bg-slate-900 p-3 rounded-md hover:bg-rose-700 transition duration-300'
					onClick={handleCerrarSesion}
				>
					<svg
						xmlns='http://www.w3.org/2000/svg'
						fill='none'
						viewBox='0 0 24 24'
						strokeWidth={1.5}
						stroke='currentColor'
						className='w-4 h-4'
					>
						<path
							strokeLinecap='round'
							strokeLinejoin='round'
							d='M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9'
						/>
					</svg>
					Cerrar Sesión
				</button>
			</aside>
		</>
	);
};

export default Sidebar;
