import React from 'react';
import './toast.css';
const icons = {
	error: {
		name: 'fa-solid fa-circle-xmark',
		color: 'text-[#ff623d]',
		border: 'border-l-[#ff623d]',
	},
	success: {
		name: 'fa-solid fa-circle-check',
		color: 'text-[#47d864]',
		border: 'border-l-[#47d864]',
	},
	warning: {
		name: 'fa-solid fa-circle-exclamation',
		color: 'text-[#ffc021]',
		border: 'border-l-[#ffc021]',
	},
};
const ToastMessage = ({ title, message, mounted = false, setMounted = () => {} }) => {
	console.log(icons[title]);
	React.useEffect(() => {
		if (mounted) {
			const toastMessage = document.querySelector('#toast > div');
			if (toastMessage) {
				toastMessage.style.animation = `slideInLeft ease .2s, fadeOut linear 1s ${2}s forwards`;
			}
		}
	});
	return (
		mounted && (
			<div id="toast" className="fixed top-8 right-8 z-[99999]">
				<div
					className={`bg-secondary rounded-sm py-5 min-w-[400px] max-w-[450px] border-l-4 border-solid shadow-[0_5px_8px_rgba(0, 0, 0, 0.08)] transition-all duration-300 ease-linear ${icons[title]?.color} flex items-center`}
				>
					<div className={`${icons[title]?.color} text-2xl px-4`}>
						<i className={`${icons[title]?.name}`}></i>
					</div>
					<div className="flex-1">
						<h3 className="text-lg text-[#333] capitalize">{title}</h3>
						<p className="text-base mt-2 text-[#888]">{message}</p>
					</div>
					<div
						className="text-xl text-[#333] cursor-pointer px-4"
						onClick={() => {
							setMounted(false);
						}}
					>
						<i className="fas fa-times"></i>
					</div>
				</div>
			</div>
		)
	);
};

export default ToastMessage;
