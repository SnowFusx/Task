const Alerta = ({ alerta }) => {
	return (
		<div
			className={`${
				alerta.error ? 'bg-rose-600' : 'bg-sky-900'
			} bg-gradient-to-br text-white text-center justify-center items-center p-3 max-w-sm rounded uppercase font-bold text-sm my-10`}
		>
			{alerta.msg}
		</div>
	);
};

export default Alerta;
