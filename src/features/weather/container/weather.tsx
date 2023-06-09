import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
import isEmpty from "lodash/isEmpty";
import { toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

import Logo from "../../../assets/images/Logo2.png";
import loader from "../../../assets/images/loader.gif";

import { IDropDownOption, ISelectedCity } from "../interface/weather.interface";
import { City } from "../../../shared/constants/constants";
import { ReactSelect } from "../../../shared/components/dropDown/reactSelect";
import { selectedOption } from "../../../shared/util/utility";
import {
    IWeatherChartData,
    IWetherDetails,
} from "../interface/weatherChart.interface";

import WeatherDetails from "../component/weatherDetails";
import WeatherChart from "../component/weatherChart";
import WeekInfoCard from "../component/card";
import SunRiseSetCard from "../component/sunCard";

const Weather: React.FC = () => {
    const [selectedCity, setSelectedCity] = useState<ISelectedCity>({
        city: "Ahmedabad",
        lat: "23.0300",
        lng: "72.5800 ",
        country: "India",
        iso2: "IN",
        admin_name: "Gujarat",
        capital: "minor",
        population: "7410000",
        population_proper: "5570585",
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
            toast.success("Data fetch successfully", {
                position: toast.POSITION.BOTTOM_RIGHT,
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: true,
                draggable: true,
            });
            setWeatherChart(response.data);
            setChartData(response.data?.list[0]);
        } catch (error: any) {
            console.error(error);
            toast.error(error.response.data.message, {
                position: toast.POSITION.BOTTOM_RIGHT,
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: true,
                draggable: true,
            });
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
                    <div className="container flex align-items--center justify-content--between flex--column">
                        {isEmpty(chartData) && (
                            <div>
                                <img src={loader} alt="loader" />
                            </div>
                        )}
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
                                <div className="flex align-items--center justify-content--evenly width--full">
                                    {weatherChart.list?.length > 0 && (
                                        <WeatherChart
                                            weatherData={weatherChart.list}
                                        />
                                    )}
                                    <SunRiseSetCard data={weatherChart.city} />
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Weather;
