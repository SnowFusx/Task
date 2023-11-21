import LoaderSpinner from './LoaderSpinner';

const Loading = () => {
	return (
		<div className='flex h-screen justify-center items-center bg-gray-100 text-slate-800'>
			<div className='inline-block'>
				<h1>Cargando...</h1>
			</div>
			<div className='inline-block'>
				<LoaderSpinner />
			</div>
		</div>
	);
};

export default Loading;
