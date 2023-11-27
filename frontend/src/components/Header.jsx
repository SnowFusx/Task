import useAuth from '../hooks/useAuth';
import useProyectos from '../hooks/useProyectos';
import Busqueda from './Busqueda';

const Header = () => {
	const { auth } = useAuth();

	const { handleBuscador } = useProyectos();
	return (
		<>
			<header className='px-4 py-5 bg-white border-b'>
				<div className='md:flex md:justify-between items-center px-8'>
					<p className='text-xl font-bold'>
						Bienvenido/a,{' '}
						<span className='text-sky-600'>{auth.nombre}</span>
					</p>
					<button
						className='bg-slate-800 border-2 hover:bg-slate-900 border-slate-800 hover:border-2  hover:border-sky-800 text-white px-4 py-2 rounded-lg font-bold text-sm'
						onClick={() => handleBuscador()}
					>
						Buscar Proyecto
					</button>
				</div>
				<Busqueda />
			</header>
		</>
	);
};

export default Header;
