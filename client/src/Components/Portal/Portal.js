import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import './Portal.css';
function createPortalWrapper() {
	const element = document.createElement('div');
	element.className = 'portal-wrapper';
	return element;
}

const portalWrapperElm = createPortalWrapper();

const Portal = ({
	containerClassName = '',
	containerStyle = {},
	bodyClassName = '',
	bodyStyle = {},
	onClose = () => {},
	visible = false,
	children,
}) => {
	useEffect(() => {
		document.body.appendChild(portalWrapperElm);
	}, []);
	const renderContent = (
		<div className={`fixed inset-0 z-[9999] ${containerClassName}`} style={containerStyle}>
			<div className="absolute inset-0 bg-[#000] overlay bg-opacity-50" onClick={onClose}></div>
			<div className={`relative z-10 content ${bodyClassName}`} style={bodyStyle}>
				{children}
			</div>
		</div>
	);
	return createPortal(renderContent, portalWrapperElm);
};

export default Portal;
