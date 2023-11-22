import { Outlet, Navigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import Loading from '../components/Loading';
import { Toaster } from 'sonner';

const RutaProtegida = () => {
	const { auth, cargando } = useAuth();

	if (cargando) return <Loading />;

	return (
		<>
			{auth._id ? (
				<>
					<Toaster richColors closeButton />
					<div className='flex bg-gray-100'>
						<div className='border-r border-gray-300'>
							<Sidebar />
						</div>
						<div className='md:flex md:flex-col w-full md:min-h-screen'>
							<Header />
							<main className='flex-1 p-10'>
								<Outlet />
							</main>
						</div>
					</div>
				</>
			) : (
				<Navigate to='/' />
			)}
		</>
	);
};

export default RutaProtegida;
