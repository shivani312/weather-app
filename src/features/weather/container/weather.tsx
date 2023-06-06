import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
import isEmpty from "lodash/isEmpty";
import moment from "moment";

import {
    IDropDownOption,
    ISelectedCity,
    IWeatherDetails,
} from "../interface/weather.interface";
import { City } from "../../../shared/constants/constants";
import HumidityDetails from "../component/humidityDetails";
import { ReactSelect } from "../../../shared/components/dropDown/reactSelect";
import { selectedOption } from "../../../shared/util/utility";

import WeatherDetails from "../component/weatherDetils";
import { IWeatherChartData } from "../interface/weatherChart.interface";
import WeatherChart from "../component/weatherChart";

const Weather: React.FC = () => {
    const [selectedCity, setSelectedCity] = useState<ISelectedCity>({
        city: "Delhi",
        lat: "28.6600",
        lng: "77.2300",
        country: "India",
        iso2: "IN",
        admin_name: "Delhi",
        capital: "admin",
        population: "29617000",
        population_proper: "16753235",
    });
    const [weatherData, setWeatherData] = useState<IWeatherDetails>(
        {} as IWeatherDetails
    );
    const [filters, setFilter] = useState<IDropDownOption[]>([]);
    const [weatherChart, setWeatherChart] = useState<IWeatherChartData[]>([]);

    const fetchWeatherData = useCallback((city: string) => {
        const apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${
            process.env.REACT_APP_API_KEY as string
        }`;
        axios
            .get(apiURL)
            .then((res) => {
                setWeatherData(res.data);
            })
            .catch((err) => {
                console.log("err", err);
            });
    }, []);

    useEffect(() => {
        fetchWeatherData(selectedCity.city);
        let filterData: IDropDownOption[] = [];
        City.map((data: ISelectedCity) => {
            filterData.push({
                label: data.city,
                value: data.city,
            });

            return filterData;
        });
        setFilter([...filterData]);
        // eslint-disable-next-line
    }, [fetchWeatherData]);

    const fetchData = useCallback(async () => {
        try {
            const response = await axios.get(
                `https://api.openweathermap.org/data/2.5/forecast?q=${
                    selectedCity.city
                }&appid=${
                    process.env.REACT_APP_API_KEY as string
                }&cnt=7&units=metric`
            );
            setWeatherChart(response.data.list);
        } catch (error) {
            console.error(error);
        }
    }, [selectedCity.city]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const handleChange = (value: string) => {
        const selectedCity = City.filter((city) => city.city === value)[0];
        setSelectedCity(selectedCity);
        fetchWeatherData(selectedCity.city);
    };

    return (
        <>
            <div className="weather_app flex align-items--center justify-content--center flex--column">
                <p className="title font-size--30 font--bold">Weather App</p>
                <div className="flex align-items--center justify-content--between">
                    {isEmpty(weatherData) && <p>Loading...</p>}
                    {!isEmpty(weatherData) && (
                        <>
                            <div className="weather-section flex text--white m--20">
                                <WeatherDetails
                                    details={weatherData}
                                    selectedCity={selectedCity}
                                />
                                <div className="rightSide pt--25 pr--20 position--relative">
                                    <div className="stateWrap">
                                        <ReactSelect
                                            name="city"
                                            options={filters}
                                            placeholder="Select location"
                                            selectedValue={selectedOption(
                                                filters,
                                                selectedCity.city
                                            )}
                                            onChange={(positionOption: any) => {
                                                handleChange(
                                                    positionOption.value
                                                        ? positionOption.value
                                                        : ""
                                                );
                                            }}
                                            className="form_field"
                                            isClearable={false}
                                        />
                                    </div>

                                    <div className="cardWrap">
                                        <div className="cardList flex flex--wrap ">
                                            {weatherChart.length > 0 &&
                                                weatherChart.map(
                                                    (item, index) => {
                                                        if (index < 7) {
                                                            return (
                                                                <div
                                                                    key={index}
                                                                    className={`card flex align-items--center flex--column`}
                                                                    // onClick={() => {
                                                                    //     setSelectedCard(
                                                                    //         index
                                                                    //     );
                                                                    // }}
                                                                >
                                                                    <img
                                                                        className="day-icon"
                                                                        alt="rohit"
                                                                        src={`http://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
                                                                    />
                                                                    <span className="day-name text--black">
                                                                        {moment(
                                                                            item.dt_txt
                                                                        ).format(
                                                                            "dddd,hh:mm"
                                                                        )}
                                                                    </span>
                                                                    <span className="day-temp text--black">
                                                                        {Math.round(
                                                                            item
                                                                                .main
                                                                                .temp_max
                                                                        )}
                                                                        °C
                                                                    </span>
                                                                </div>
                                                            );
                                                        }
                                                        return "";
                                                    }
                                                )}
                                        </div>
                                    </div>
                                    {/* <WeekInfoCard data={weatherChart} /> */}
                                    <HumidityDetails
                                        details={weatherData}
                                        selectedCity={selectedCity}
                                    />
                                </div>
                            </div>
                        </>
                    )}
                    {weatherChart.length > 0 && (
                        <WeatherChart weatherData={weatherChart} />
                    )}
                </div>
            </div>
        </>
    );
};

export default Weather;
