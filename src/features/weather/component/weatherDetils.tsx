import React from "react";
import moment from "moment";

import { ISelectedCity } from "../interface/weather.interface";
import { ICity, IWeatherChartData } from "../interface/weatherChart.interface";

interface IProps {
    details: IWeatherChartData;
    selectedCity: ISelectedCity;
    cityDetails: ICity;
}

const WeatherDetails: React.FC<IProps> = (props) => {
    const { details, selectedCity, cityDetails } = props;

    return (
        <>
            <div className="wether-details flex flex--column justify-content--center">
                <div className="dateWrap flex justify-content--between mt--10 mr--20 ml--20">
                    <p className="locationName font-size--30 font--bold">
                        {selectedCity.city} -{selectedCity.country}
                    </p>
                    <div className="flex flex--column mr--20">
                        <p>{moment(details.dt_txt).format("dddd")}</p>
                        <div>{moment(details.dt_txt).format("LLL")}</div>
                    </div>
                </div>
                <div className="flex justify-content--between">
                    <div className="flex align-items--center justify-content--evenly width--25">
                        <img
                            className="weatherIcon"
                            alt="myit"
                            src={`http://openweathermap.org/img/wn/${details?.weather[0]?.icon}@2x.png`}
                        />
                        <span className="weatherTemp font--bold font-size--40">
                            {Math.round(details.main?.temp_max)}°C
                        </span>
                        <div className="flex flex--column">
                            <span className="weatherDesc font-semi--bold">
                                {details?.weather[0].description}
                            </span>
                            <span className="weatherDesc font-semi--bold">
                                feels like : {details.main?.feels_like} °C
                            </span>
                        </div>
                    </div>
                    <div className="flex align-items--center justify-content--evenly width--50">
                        <div className="humidityData flex flex--column">
                            <div className="humidity-title text--white">
                                HUMIDITY{" "}
                            </div>
                            <div className="value">
                                {details.main.humidity} %
                            </div>
                        </div>
                        <div className="humidityData flex flex--column">
                            <div className="humidity-title text--white">
                                VISIBILITY{" "}
                            </div>
                            <div className="value">{details.visibility} ml</div>
                        </div>
                        <div className="humidityData flex flex--column">
                            <div className="humidity-title text--white">
                                WIND{" "}
                            </div>
                            <div className="value">
                                {Math.round(details.wind.speed)} km/h
                            </div>
                        </div>
                        <div className="humidityData flex flex--column">
                            <div className="humidity-title text--white">
                                PRESSURE{" "}
                            </div>
                            <div className="value">
                                {Math.round(details.main.pressure)} mb
                            </div>
                        </div>
                        <div className="humidityData flex flex--column">
                            <div className="humidity-title text--white mr--15">
                                {selectedCity.city} - {selectedCity.admin_name}{" "}
                                - Population
                            </div>
                            <div className="value">
                                {cityDetails?.population}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default WeatherDetails;
