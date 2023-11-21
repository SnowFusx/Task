import { Link } from 'react-router-dom';
import useProyectos from '../hooks/useProyectos';
import useAuth from '../hooks/useAuth';
import logo from '../assets/task.png';

const Header = () => {
	const { cerrarSesionAuth } = useAuth();
	const { cerrarSesionProyecto } = useProyectos();

	// Cerrar sesión
	const handleCerrarSesion = () => {
		cerrarSesionAuth();
		cerrarSesionProyecto();
		localStorage.removeItem('token');
	};

	return (
		<>
			<header className='px-4 py-5 bg-white border-b'>
				<div className='md:flex md:justify-between items-center'>
					<Link to='/proyectos'>
						<img src={logo} alt='logo' className='w-20' />
					</Link>
					<input
						type='search'
						placeholder='Buscar Proyecto'
						className='w-full md:w-1/3 lg:w-1/4 px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-sky-600 focus:border-transparent'
					/>
					<div className='flex items-center gap-4'>
						<Link to='/proyectos' className='font-bold uppercase'>
							Proyectos
						</Link>
						<button
							type='button'
							className='flex items-center gap-2 justify-items-center text-white text-sm font-bold uppercase bg-sky-950 p-3 rounded-md hover:bg-sky-700 transition duration-300'
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
				</div>
			</header>
		</>
	);
};

export default Header;
