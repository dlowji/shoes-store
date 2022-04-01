import React from 'react';
import Button from '../Button/Button';
import ModalBase from '../Portal/ModalBase';

const Confirm = ({ visible, onClose, handleDelete }) => {
	return (
		<ModalBase visible={visible} onClose={onClose}>
			<div className="p-10 text-center rounded-lg bg-secondary">
				<div className="w-[80px] h-[80px] mx-auto rounded-full flex items-center justify-center border-primary border-2">
					<i className="fa fa-times text-primary text-[40px]"></i>
				</div>
				<h2 className="my-4 text-xl font-bold text-third">Are you sure about that?</h2>
				<p className="text-base text-[#999] leading-normal">
					Do you really want to delete this product? This process cannot return.
				</p>
				<div className="flex flex-col gap-3 mx-10 my-5 md:justify-center md:items-center md:mx-10 md:flex-row">
					<Button
						text={'Cancel'}
						className={'w-1/2 normal-case text-primary'}
						onClick={onClose}
					></Button>
					<Button
						text={'Delete'}
						className={'bg-primary text-secondary normal-case hover:opacity-80 w-1/2'}
						onClick={handleDelete}
					></Button>
				</div>
			</div>
		</ModalBase>
	);
};

export default Confirm;
