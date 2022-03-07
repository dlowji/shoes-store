import { useEffect, useRef, useState } from 'react';

export default function useClickOutside() {
	const [show, setShow] = useState(false);
	const ref = useRef();
	useEffect(() => {
		const handleClick = (e) => {
			if (
				ref.current &&
				!ref.current.contains(e.target) &&
				!e.target.matches('button') &&
				e.target.matches('.fixed.inset-0')
			) {
				setShow(false);
			}
		};
		document.addEventListener('click', handleClick);
		return () => {
			document.removeEventListener('click', handleClick);
		};
	});
	return {
		show,
		setShow,
		ref,
	};
}
