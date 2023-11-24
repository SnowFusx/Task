export const formatearFecha = fechaOriginal => {
	// Crear un objeto Date con la fecha original
	const fecha = new Date(fechaOriginal.split('T')[0].split('-'));

	const opciones = { year: 'numeric', month: 'numeric', day: 'numeric' };

	return fecha.toLocaleDateString('es-ES', opciones);
};
