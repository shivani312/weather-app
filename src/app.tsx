import { Route, Routes } from 'react-router-dom';

import './assets/styles/app.scss';
import Layout from './hoc/layout';


const  App = () =>{
	return (
		<Layout>
			<Routes>
				<Route path='/' element />
			</Routes>
		</Layout>
	);
}

export default App;
