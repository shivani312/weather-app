import React from "react";
import { ISelectedCity, IWeatherDetails } from "../interface/weather.interface";
import { isEmpty } from "lodash";

interface IProps {
    details: IWeatherDetails;
    selectedCity: ISelectedCity;
}

const HumidityDetails: React.FC<IProps> = (props) => {
    const { details, selectedCity } = props;

    return (
        <>
            {!isEmpty(details) && (
                <div className="humidityWrap p--15 mt--15 mb--20 ">
                    <div className="humidityData flex align-items--center justify-content--between">
                        <div className="humidity-title text--white">
                            HUMIDITY{" "}
                        </div>
                        <div className="value">{details.main.humidity} %</div>
                    </div>
                    <div className="humidityData flex align-items--center justify-content--between">
                        <div className="humidity-title text--white">
                            VISIBILITY{" "}
                        </div>
                        <div className="value">{details.visibility} ml</div>
                    </div>
                    <div className="humidityData flex align-items--center justify-content--between">
                        <div className="humidity-title text--white">WIND </div>
                        <div className="value">
                            {Math.round(details.wind.speed)} km/h
                        </div>
                    </div>
                    <div className="humidityData flex align-items--center justify-content--between">
                        <div className="humidity-title text--white mr--15">
                            {selectedCity.city} - {selectedCity.admin_name} -
                            Population
                        </div>
                        <div className="value">
                            {parseFloat(selectedCity.population).toLocaleString(
                                "en"
                            )}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default HumidityDetails;
