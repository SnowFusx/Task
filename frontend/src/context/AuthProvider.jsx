import { useState, useEffect, createContext } from 'react';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
	const [usuario, setUsuario] = useState(null);
	const [cargando, setCargando] = useState(true);

	useEffect(() => {
		const handleAuth = async () => {
			try {
				const token = localStorage.getItem('token');
				if (!token) {
					setCargando(false);
					return;
				}
				const { data } = await clienteAxios.get('/auth', {
					headers: {
						Authorization: `Bearer ${token}`,
					},
				});
				setUsuario(data.usuario);
				setCargando(false);
			} catch (error) {
				console.log(error);
				setCargando(false);
			}
		};
		handleAuth();
	}, []);

	return (
		<AuthContext.Provider value={{ usuario, cargando }}>
			{children}
		</AuthContext.Provider>
	);
};

export { AuthProvider };
export default AuthContext;
