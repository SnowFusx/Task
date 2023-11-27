import { Link } from 'react-router-dom';
import logo from '../assets/task.png';
import useProyectos from '../hooks/useProyectos';
import useAuth from '../hooks/useAuth';
import LinksNavigation from './LinksNavigation';
import {
	HomeIcon,
	NuevoColaboradorIcon,
	NuevoProyectoIcon,
	ProyectosIcon,
} from './constants';

const Sidebar = () => {
	const { auth, cerrarSesionAuth } = useAuth();
	const { cerrarSesionProyecto } = useProyectos();

	const handleMenu = () => {
		const navContent = document.getElementById('nav-content');
		navContent.classList.toggle('hidden');
	};

	// Cerrar sesión
	const handleCerrarSesion = () => {
		cerrarSesionAuth();
		cerrarSesionProyecto();
		localStorage.removeItem('token');
	};
	return (
		<>
			<nav class='flex items-center justify-between flex-wrap bg-gray-200 p-6 fixed w-full z-10'>
				<div class='flex items-center flex-no-shrink text-white mr-6'>
					<Link to='/proyectos'>
						<img src={logo} alt='logo' className='w-20' />
					</Link>
				</div>

				<div class='block lg:hidden'>
					<button
						id='nav-toggle'
						class='flex items-center px-3 py-2 border rounded text-slate-900  hover:border-slate-900'
						onClick={handleMenu}
					>
						<svg
							class='fill-current h-3 w-3'
							viewBox='0 0 20 20'
							xmlns='http://www.w3.org/2000/svg'
						>
							<title>Menu</title>
							<path d='M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z' />
						</svg>
					</button>
				</div>

				<div
					class='w-full flex-grow lg:flex lg:items-center lg:w-auto hidden lg:block pt-6 lg:pt-0'
					id='nav-content'
				>
					<div className='mt-5'>
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
					<div className='mt-5'>
						<p className='text-gray-900 text-xl block font-semibold'>
							Menu
						</p>

						<LinksNavigation
							styles={
								'flex items-center text-gray-500 mt-2 font-semibold text-lg hover:text-gray-900 transition duration-300'
							}
							text={'Inicio'}
							ruta={'/proyectos'}
							id={''}
							svg={<HomeIcon />}
							link={true}
						/>

						<LinksNavigation
							styles={
								'flex items-center text-gray-500 mt-2 font-semibold text-lg hover:text-gray-900 transition duration-300'
							}
							text={'Proyectos'}
							ruta={'/proyectos'}
							id={''}
							svg={<ProyectosIcon />}
							link={true}
						/>
						<LinksNavigation
							styles={
								'flex items-center text-gray-500 mt-2 font-semibold text-lg hover:text-gray-900 transition duration-300'
							}
							text={'Nuevo Proyecto'}
							ruta={'/proyectos/crear-proyecto'}
							id={''}
							svg={<NuevoProyectoIcon />}
							link={true}
						/>
						<LinksNavigation
							styles={
								'flex items-center gap-2 text-gray-500 mt-2 font-semibold text-lg hover:text-gray-900 transition duration-300'
							}
							text={'Nuevo Colaborador'}
							ruta={`/proyectos/nuevo-colaborador`}
							id={''}
							svg={<NuevoColaboradorIcon />}
							link={true}
						/>
					</div>
					<div className='mt-5'>
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
						className='flex w-full justify-center items-center gap-2 mt-5 justify-items-center text-white text-sm font-bold uppercase bg-slate-900 p-3 rounded-md hover:bg-rose-700 transition duration-300'
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
				</div>
			</nav>
		</>
	);
};

export default Sidebar;
