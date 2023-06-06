import React, { useState } from "react";
import { IWeatherChartData } from "../interface/weatherChart.interface";
import moment from "moment";

interface IProps {
    data: IWeatherChartData[];
}

const WeekInfoCard: React.FC<IProps> = (props) => {
    const { data } = props;
    const [selectedCard, setSelectedCard] = useState(0);
    return (
        <>
            <div className="cardWrap">
                <div className="cardList flex flex--wrap ">
                    {data.length > 0 &&
                        data.map((item, index) => {
                            if (index < 7) {
                                return (
                                    <div
                                        key={index}
                                        className={`card flex align-items--center flex--column ${
                                            index === selectedCard && "active"
                                        }`}
                                        onClick={() => setSelectedCard(index)}
                                    >
                                        <img
                                            className="day-icon"
                                            alt="rohit"
                                            src={`http://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
                                        />
                                        <span className="day-name text--black">
                                            {moment(item.dt_txt).format(
                                                "dddd,hh:mm"
                                            )}
                                        </span>
                                        <span className="day-temp text--black">
                                            {Math.round(item.main.temp_max)}°C
                                        </span>
                                    </div>
                                );
                            }
                            return "";
                        })}
                </div>
            </div>
        </>
    );
};

export default WeekInfoCard;
