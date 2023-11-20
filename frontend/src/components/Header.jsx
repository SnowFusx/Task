import { Link } from 'react-router-dom';

const Header = () => {
	return (
		<>
			<header className='px-4 py-5 bg-white border-b'>
				<div className='md:flex md:justify-between'>
					<h2 className='text-4xl text-sky-600 font-black text-center'>
						UpTask
					</h2>

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
							className='text-white text-sm font-bold uppercase bg-sky-600 p-3 rounded-md hover:bg-sky-700 transition duration-300'
						>
							Cerrar Sesión
						</button>
					</div>
				</div>
			</header>
		</>
	);
};

export default Header;
