import React from 'react';
import moment from 'moment';
import isEmpty from 'lodash/isEmpty'

import { ISelectedCity, IWeatherDetails } from '../interface/weather.interface';

interface IProps {
    details: IWeatherDetails,
    selectedCity: ISelectedCity
}

const WeatherDetails:React.FC<IProps> = (props)=>{
    const { details,selectedCity } = props;

    return (
        <>
                <div className='leftWrap flex flex--column justify-content--around pl--20 mr--10'>
                <div className='dateWrap'>
                    <p className='mt--20 mb--20 font-size--24 font--bold'>{moment().format('dddd')}</p>
                    <span className="dateDay">
                        {moment().format('MMMM DD YYYY')}
                    </span>
                    <span className="locationName mt--10">{selectedCity.city} - {selectedCity.admin_name} - {selectedCity.country}</span>
                </div>
                <div className="weatherContainer">
                    <img
                    className="weatherIcon" alt="myit"
                    src={`http://openweathermap.org/img/wn/${details?.weather[0].icon}@2x.png`}
                    />
                    <p className="weatherTemp font--bold font-size--40">{Math.round(details.main?.temp_max)}°C</p>
                    <p className="weatherDesc mb--20 mt--20 font-semi--bold">{details?.weather[0].main}</p>
                </div>
            </div>
        </>
    )
}

export default WeatherDetails;