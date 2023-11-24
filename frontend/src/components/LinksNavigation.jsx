import { Link } from 'react-router-dom';

const LinksNavigation = ({ text, ruta, id, svg, link, onClick, styles }) => {
	return (
		<>
			{link ? (
				<Link to={`${ruta}${id}`} className={styles}>
					{svg}
					{text}
				</Link>
			) : (
				<button className={styles} onClick={onClick}>
					{svg}
					{text}
				</button>
			)}
		</>
	);
};

export default LinksNavigation;
