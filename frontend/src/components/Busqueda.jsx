import { Fragment, useState } from 'react';
import { Combobox, Dialog, Transition } from '@headlessui/react';
import useProyectos from '../hooks/useProyectos';
import { useNavigate } from 'react-router-dom';

function classNames(...classes) {
	return classes.filter(Boolean).join(' ');
}

const Busqueda = () => {
	const [busqueda, setBusqueda] = useState('');

	const {
		buscador,
		handleBuscador,
		proyectos,
		setBuscador,
		obtenerProyecto,
	} = useProyectos();

	const navigate = useNavigate();

	const proyectosFiltrados =
		busqueda === ''
			? []
			: proyectos.filter(proyecto =>
					proyecto.nombre
						.toLowerCase()
						.includes(busqueda.toLowerCase())
			  );

	const handleBuscar = proyecto => {
		console.log(proyecto._id);
		setBusqueda('');
		navigate(`/proyectos/${proyecto._id}`);
		obtenerProyecto(proyecto._id);
		setBuscador(false);
		console.log(busqueda);
	};

	return (
		<Transition.Root
			show={buscador}
			as={Fragment}
			afterLeave={() => setBusqueda('')}
		>
			<Dialog
				as='div'
				className='fixed inset-0 z-10 overflow-y-auto mt-20 p-4 sm:p-20 md:p-20'
				onClose={handleBuscador}
			>
				<Transition.Child
					as={Fragment}
					enter='ease-out duration-300'
					enterFrom='opacity-0'
					enterTo='opacity-100'
					leave='ease-in duration-200'
					leaveFrom='opacity-100'
					leaveTo='opacity-0'
				>
					<Dialog.Overlay className='fixed inset-0 bg-gray-500 bg-opacity-25 transition-opacity' />
				</Transition.Child>

				<Transition.Child
					as={Fragment}
					enter='ease-out duration-300'
					enterFrom='opacity-0 scale-95'
					enterTo='opacity-100 scale-100'
					leave='ease-in duration-200'
					leaveFrom='opacity-100 scale-100'
					leaveTo='opacity-0 scale-95'
				>
					<Combobox
						as='div'
						className='mx-auto max-w-xl transform divide-y divide-gray-100 overflow-hidden rounded-xl bg-white shadow-2xl ring-1 ring-black ring-opacity-5 transition-all'
						onChange={proyecto => handleBuscar(proyecto)}
					>
						<div className='relative'>
							<Combobox.Input
								className='h-12 w-full border-0 bg-transparent pl-11 pr-4- text-gray-800 placeholder-gray-400 focus:ring-0 sm:text-sm'
								placeholder='Buscar...'
								onChange={e => setBusqueda(e.target.value)}
							/>
						</div>

						{proyectosFiltrados.length > 0 && (
							<Combobox.Options
								static
								className='max-h-72 scroll-py-2 overflow-y-auto py-2 text-sm text-gray-800'
							>
								{proyectosFiltrados.map(proyecto => (
									<Combobox.Option
										key={proyecto._id}
										value={proyecto}
										className={({ active }) =>
											classNames(
												active
													? 'text-white bg-sky-600'
													: 'text-gray-800',
												'cursor-default select-none relative py-2 pl-10 pr-4'
											)
										}
									>
										{({ selected, active }) => (
											<>
												<span
													className={classNames(
														selected
															? 'font-medium'
															: 'font-normal',
														'block truncate'
													)}
												>
													{proyecto.nombre}
												</span>
												{selected ? (
													<span
														className={classNames(
															active
																? 'text-white'
																: 'text-sky-600',
															'absolute inset-y-0 left-0 flex items-center pl-3'
														)}
													>
														<svg
															xmlns='http://www.w3.org/2000/svg'
															className='h-5 w-5'
															viewBox='0 0 20 20'
															fill='currentColor'
															aria-hidden='true'
														>
															<path
																fillRule='evenodd'
																d='M5.293 6.707a1 1 0 010-1.414l5-5a1 1 0 011.414 0l5 5a1 1 0 11-1.414 1.414L11
                                                                3.414V15a1 1 0 11-2 0V3.414L6.707
                                                                6.707a1 1 0 01-1.414 0z'
																clipRule='evenodd'
															/>
														</svg>
													</span>
												) : null}
											</>
										)}
									</Combobox.Option>
								))}
							</Combobox.Options>
						)}
					</Combobox>
				</Transition.Child>
			</Dialog>
		</Transition.Root>
	);
};

export default Busqueda;
