import { Link } from 'react-router-dom';
const OlvidePassword = () => {
	return (
		<>
			<h1 className='text-sky-600 font-black text-6xl capitalize'>
				Recupera tu acceso y no pierdas tus{' '}
				<span className='text-slate-700'>proyectos</span>
			</h1>
			<form className='my-10 bg-white shadow rounded-lg p-10'>
				<div className='my-5'>
					<label
						className='uppercase text-gray-600 block text-xl
						font-bold'
						htmlFor='email'
					>
						Email
					</label>
					<input
						id='email'
						type='email'
						placeholder='Email de Registro'
						className='w-full mt-3 p-3 border rounded-xl bg-gray-50'
					/>
				</div>

				<input
					type='submit'
					value='Enviar Instrucciones'
					className='bg-sky-700 w-full mb-5 py-3 text-white uppercase font-bold rounded hover:bg-sky-800 transition duration-300 cursor-pointer'
				/>
			</form>

			<nav className='lg:flex lg:justify-between'>
				<Link
					to='/'
					className='block text-center text-slate-500 text-sm my-3 uppercase hover:text-gray-700'
				>
					Volver al Login
				</Link>
				<Link
					to='/registrar'
					className='block text-center text-slate-500 text-sm my-3 uppercase hover:text-gray-700'
				>
					No tengo cuenta, quiero registrarme
				</Link>
			</nav>
		</>
	);
};

export default OlvidePassword;
