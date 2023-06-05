import { Route, Routes } from 'react-router-dom';

import './assets/styles/app.scss';
import Weather from './features/weather/container/weather';


const  App = () =>{
	return (
			<Routes>
				<Route path='/' element={<Weather/>} />
			</Routes>
	);
}

export default App;
