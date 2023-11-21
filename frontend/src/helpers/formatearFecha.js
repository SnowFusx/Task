function formatearFecha(fechaOriginal) {
	// Crear un objeto Date con la fecha original
	const fecha = new Date(fechaOriginal);

	// Obtener día, mes y año
	const dia = fecha.getDate();
	const mes = fecha.getMonth() + 1; // Los meses en JavaScript van de 0 a 11
	const año = fecha.getFullYear();

	// Formatear la salida con ceros a la izquierda si es necesario
	const diaFormateado = dia < 10 ? '0' + dia : dia;
	const mesFormateado = mes < 10 ? '0' + mes : mes;

	// Crear la nueva fecha en formato "dd-mm-yyyy"
	const fechaFormateada = diaFormateado + '-' + mesFormateado + '-' + año;

	return fechaFormateada;
}

export { formatearFecha };
