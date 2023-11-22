import { Link } from 'react-router-dom';

import useAuth from '../hooks/useAuth';

const Header = () => {
	const { auth } = useAuth();
	return (
		<>
			<header className='px-4 py-5 bg-white border-b'>
				<div className='md:flex md:justify-between items-center px-8'>
					<p className='text-xl font-bold'>
						Bienvenido/a,{' '}
						<span className='text-sky-600'>{auth.nombre}</span>
					</p>
					<input
						type='search'
						placeholder='Buscar Proyecto'
						className='w-full md:w-1/3 lg:w-1/4 px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-sky-600 focus:border-transparent'
					/>
				</div>
			</header>
		</>
	);
};

export default Header;
