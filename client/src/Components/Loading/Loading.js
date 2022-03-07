import React from 'react';

const Loading = ({ ...props }) => {
	return (
		<div
			className="w-[50px] h-[50px] border-2 border-t-0 rounded-full animate-spin ease-linear duration-500 border-primary mx-auto"
			{...props}
		></div>
	);
};

export default Loading;
