import React, { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import isEmpty from 'lodash/isEmpty';

import { IDropDownOption, ISelectedCity, IWeatherDetails } from '../interface/weather.interface';
import { City } from '../../../shared/constants/constants';
import HumidityDetails from '../component/humidityDetails';
import { ReactSelect } from '../../../shared/components/dropDown/reactSelect';
import { selectedOption } from '../../../shared/util/utility';

import WeatherDetails from '../component/weatherDetils';

const Weather:React.FC = () => {
    const [selectedCity, setSelectedCity] = useState<ISelectedCity>(
        {
            city: "Delhi", 
            lat: "28.6600", 
            lng: "77.2300", 
            country: "India", 
            iso2: "IN", 
            admin_name: "Delhi", 
            capital: "admin", 
            population: "29617000", 
            population_proper: "16753235"
        }, 
    );
    const [weatherData, setWeatherData] = useState<IWeatherDetails>({} as IWeatherDetails);
    const [filters, setFilter] = useState<IDropDownOption[]>([]);
    const apiKey = ''; // Replace with your OpenWeatherMap API key

    const fetchWeatherData = useCallback((city:string) => {
        const apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`
        // const apiURL = `https://api.openweathermap.org/data/2.5/forecast/daily?lat=44.34&lon=10.99&cnt=7&appid=${apiKey}`
        axios.get(apiURL).then((res) => {
            setWeatherData(res.data)
        }).catch((err) => {
            console.log("err", err)
        })
    },[])

    useEffect(() => {
        fetchWeatherData(selectedCity.city);
        let filterData: IDropDownOption[] = [];
			City.map((data: ISelectedCity) => {
				filterData.push({
					label:  data.city,
					value: data.city
				});

				return filterData;
			});
			setFilter([...filterData]);
        // eslint-disable-next-line
    },[fetchWeatherData])

    const handleChange = (value: string)=>{
        const selectedCity = City.filter(
            (city) => city.city === value
        )[0]
        setSelectedCity(selectedCity);
        fetchWeatherData(selectedCity.city);
    }


return (
    <>
        <div className="weather_app flex align-items--center justify-content--center">
        {isEmpty(weatherData) && <p>Loading...</p>}
        {
        !isEmpty(weatherData) && (
        <div className='weather-section flex text--white m--20'>
        <WeatherDetails details= {weatherData} selectedCity={selectedCity}/>
        <div className='rightSide text--black pt--25 pr--20 position--relative'>
        <div className='stateWrap'>
                <ReactSelect
						name='city'
						options={filters}
						placeholder='Select location'
						selectedValue={selectedOption(filters, selectedCity.city)}
						onChange={(positionOption: any) => { 
							handleChange(positionOption.value ? positionOption.value : '' );
						}}
						className='form_field'
                        isClearable={!!selectedCity.city}
                        
					/>
            </div>
            <HumidityDetails  details= {weatherData} selectedCity={selectedCity}/>
            </div>
        </div>
        )}
        </div>
    </>
)}

export default Weather;
