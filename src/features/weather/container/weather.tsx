import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
import isEmpty from "lodash/isEmpty";

import Logo from "../../../assets/images/Logo2.png";

import { IDropDownOption, ISelectedCity } from "../interface/weather.interface";
import { City } from "../../../shared/constants/constants";
import { ReactSelect } from "../../../shared/components/dropDown/reactSelect";
import { selectedOption } from "../../../shared/util/utility";

import WeatherDetails from "../component/weatherDetils";
import {
    IWeatherChartData,
    IWetherDetails,
} from "../interface/weatherChart.interface";
import WeatherChart from "../component/weatherChart";
import WeekInfoCard from "../component/card";
import { notify } from "../../../shared/components/notification/notification";

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
    const [filters, setFilter] = useState<IDropDownOption[]>([]);
    const [selectedCard, setSelectedCard] = useState(0);

    const [chartData, setChartData] = useState<IWeatherChartData>(
        {} as IWeatherChartData
    );
    const [weatherChart, setWeatherChart] = useState<IWetherDetails>(
        {} as IWetherDetails
    );

    useEffect(() => {
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
    }, []);

    const fetchData = useCallback(async () => {
        try {
            const response = await axios.get(
                `https://api.openweathermap.org/data/2.5/forecast?q=${
                    selectedCity.city
                }&appid=${process.env.REACT_APP_API_KEY as string}&units=metric`
            );
            console.log("response:", response);
            setWeatherChart(response.data);
            setChartData(response.data?.list[0]);
        } catch (response) {
            console.error(response);
            // notify(error.response.data.message, "error");
            // throw new Error(data.message as string);
        }
    }, [selectedCity.city]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const handleChange = (value: string) => {
        const selectedCity = City.filter((city) => city.city === value)[0];
        setSelectedCity(selectedCity);
        setSelectedCard(0);
        fetchData();
    };

    return (
        <>
            <div className="weather_app">
                <div className="weather_container">
                    <div className="header flex justify-content--between  align-items--center width--full">
                        <div className="image_wrapper ml--30">
                            <img
                                src={Logo}
                                alt="logo"
                                className="width--full height--full"
                            />
                        </div>
                        <p className="title font-size--30 font--bold ">
                            Forecast
                        </p>
                        <div className="width--20 mr--20">
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
                    </div>
                    <div className="container">
                        <div className="flex align-items--center justify-content--between width--full flex--column">
                            {isEmpty(chartData) && <p>Loading...</p>}
                            {!isEmpty(chartData) && (
                                <>
                                    <WeatherDetails
                                        details={chartData}
                                        selectedCity={selectedCity}
                                        cityDetails={weatherChart.city}
                                    />
                                    <WeekInfoCard
                                        data={weatherChart.list}
                                        setSelectedCard={setSelectedCard}
                                        selectedCard={selectedCard}
                                        setChartData={setChartData}
                                    />
                                </>
                            )}
                        </div>
                    </div>
                    <div className="">
                        {weatherChart.list?.length > 0 && (
                            <WeatherChart weatherData={weatherChart.list} />
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Weather;
