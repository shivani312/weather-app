import React from "react";
import moment from "moment";

import { IWeatherChartData } from "../interface/weatherChart.interface";

interface IProps {
    data: IWeatherChartData[];
    setSelectedCard: (value: number) => void;
    setChartData: (value: IWeatherChartData) => void;
    selectedCard: number;
}

const WeekInfoCard: React.FC<IProps> = (props) => {
    const { data, setSelectedCard, selectedCard, setChartData } = props;

    return (
        <>
            <div className="slider">
                <p className="font-size--24 font-semi--bold">
                    Details Forecast
                </p>
                <div className="cardWrap">
                    <div className="cardList flex flex--wrap mb--10 ">
                        {data.length > 0 &&
                            data.map((item, index) => {
                                if (index < 17) {
                                    return (
                                        <div
                                            key={index}
                                            className={`card flex align-items--center flex--column ${
                                                index === selectedCard &&
                                                "active"
                                            }`}
                                            onClick={() => {
                                                setSelectedCard(index);
                                                setChartData(data[index]);
                                            }}
                                        >
                                            <img
                                                className="day-icon"
                                                alt="rohit"
                                                src={`http://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
                                            />
                                            <span className="day-name text--black">
                                                {moment(item.dt_txt).format(
                                                    "ddd,hh:mm"
                                                )}
                                            </span>
                                            <span className="day-temp text--black">
                                                {Math.round(item.main.temp_max)}
                                                °C
                                            </span>
                                        </div>
                                    );
                                }
                                return "";
                            })}
                    </div>
                </div>
            </div>
        </>
    );
};

export default WeekInfoCard;
