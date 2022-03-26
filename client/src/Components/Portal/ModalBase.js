import React from 'react';
import Portal from './Portal';
import { CSSTransition } from 'react-transition-group';

const ModalBase = ({ visible, onClose, children }) => {
	return (
		<CSSTransition in={visible} timeout={250} classNames="zoom" unmountOnExit>
			{(status) => (
				<Portal
					visible={status !== 'exited'}
					onClose={onClose}
					containerClassName="flex lg:pt-0 sm:pt-[100px] items-center sm:items-stretch lg:items-center justify-center"
					bodyClassName="max-w-[500px] w-full"
					bodyStyle={{ transition: 'all 0.3s ease-in-out 0s' }}
				>
					{children}
				</Portal>
			)}
		</CSSTransition>
	);
};

export default ModalBase;
