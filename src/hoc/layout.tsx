/* eslint-disable react/jsx-no-bind */
import React from 'react';


import withRouter from './withRouter';
const Layout: React.FC<React.PropsWithChildren> = (props) => {
	return (
		<>
			<div className='header position--fixed width--full flex justify-content--center align-items--center bg--grey-500'>
				<div className='header-logo flex align-items--center justify-content--center cursor--pointer'>
				</div>
			</div>
			{props.children}
		</>
	);
};

export default withRouter(Layout);
