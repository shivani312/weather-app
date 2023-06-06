import React from "react";
import moment from "moment";

import { ISelectedCity, IWeatherDetails } from "../interface/weather.interface";

interface IProps {
    details: IWeatherDetails;
    selectedCity: ISelectedCity;
}

const WeatherDetails: React.FC<IProps> = (props) => {
    const { details, selectedCity } = props;

    return (
        <>
            <div className="leftWrap flex flex--column justify-content--evenly pl--20 mr--10">
                <div className="dateWrap">
                    <p className="mb--20 font-size--24 font--bold">
                        {moment().format("dddd")}
                    </p>
                    <span className="dateDay">
                        {moment().format("MMMM DD YYYY")}
                    </span>
                    <span className="locationName mt--10">
                        {selectedCity.city} - {selectedCity.admin_name} -{" "}
                        {selectedCity.country}
                    </span>
                </div>
                <div>
                    <img
                        className="weatherIcon"
                        alt="myit"
                        src={`http://openweathermap.org/img/wn/${
                            details?.weather[0].icon === "50d"
                                ? "10d"
                                : details?.weather[0].icon
                        }@2x.png`}
                    />
                </div>
                <div className="weatherContainer">
                    <p className="weatherTemp font--bold font-size--40">
                        {Math.round(details.main?.temp_max - 273.15)}°C
                    </p>
                    <p className="weatherDesc font-semi--bold">
                        {details?.weather[0].main}
                    </p>
                </div>
            </div>
        </>
    );
};

export default WeatherDetails;
