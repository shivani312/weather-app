import React from 'react';

import { BrowserRouter } from 'react-router-dom';
import App from './app'

const Root: React.FC = (props) => {
	return (
		<BrowserRouter>
			<App {...props} />
		</BrowserRouter>
	);
};

export default Root;
