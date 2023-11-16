const NuevoPassword = () => {
	return (
		<>
			<h1 className='text-sky-600 font-black text-6xl capitalize'>
				Reestable tu Password y no pierdas acceso a tus{' '}
				<span className='text-slate-700'>proyectos</span>
			</h1>
			<form className='my-10 bg-white shadow rounded-lg p-10'>
				<div className='my-5'>
					<label
						className='uppercase text-gray-600 block text-xl
						font-bold'
						htmlFor='password'
					>
						Nuevo Password
					</label>
					<input
						id='password'
						type='password'
						placeholder='Introduce tu nuevo Password'
						className='w-full mt-3 p-3 border rounded-xl bg-gray-50'
					/>
				</div>

				<input
					type='submit'
					value='Guardar nuevo Password'
					className='bg-sky-700 w-full mb-5 py-3 text-white uppercase font-bold rounded hover:bg-sky-800 transition duration-300 cursor-pointer'
				/>
			</form>
		</>
	);
};

export default NuevoPassword;
