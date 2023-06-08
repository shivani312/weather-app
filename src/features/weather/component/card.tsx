import React from "react";
import { IWeatherChartData } from "../interface/weatherChart.interface";
import moment from "moment";

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
                <div className="cardWrap">
                    <div className="cardList flex flex--wrap ">
                        {data.length > 0 &&
                            data.map((item, index) => {
                                if (index < 18) {
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
