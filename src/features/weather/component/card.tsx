import React, { useCallback, useRef } from "react";
import moment from "moment";
import Slider from 'react-slick';

import { CurveArrowIcon } from "../../../shared/components/icons/icons";
import { IWeatherChartData } from "../interface/weatherChart.interface";

interface IProps {
    data: IWeatherChartData[];
    setSelectedCard: (value: number) => void;
    setChartData: (value: IWeatherChartData) => void;
    selectedCard: number;
}

const SliderSetting = {
	dots: false,
	infinite: true,
	arrows: false,
	autoplay: true,
	autoplaySpeed: 4000
}

const WeekInfoCard: React.FC<IProps> = (props) => {
    const { data, setSelectedCard, selectedCard, setChartData } = props;
    const sliderRef: any = useRef();

    const slideNext = useCallback(() => {
		sliderRef.current.slickNext();
	}, []);

	const slidePrev = useCallback(() => {
		sliderRef.current.slickPrev();
	}, []);

    return (
        <>
            <div className="slider">
                <p className="font-size--24 font-semi--bold">Details Forecast</p>
                <div className="cardWrap">
                    <div className="cardList flex flex--wrap mb--20 ">
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
            {/* <div className='slider-wrapper position--relative'>
									<div
										onClick={slidePrev}
										className='slider-btn slider-btn--prev position--absolute border-radius--half flex align-items--center justify-content--center cursor--pointer'
									>
										<CurveArrowIcon className='fill--white width--10px rotate--180' />
									</div>
									<Slider ref={sliderRef} {...SliderSetting}>
										{data?.map((item:IWeatherChartData,index:number) => (
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
										))}
										
									</Slider>
									<div
										onClick={slideNext}
										className='slider-btn slider-btn--next position--absolute border-radius--half flex align-items--center justify-content--center cursor--pointer'
									>
										<CurveArrowIcon className='fill--white width--10px' />
									</div>
								</div> */}
        </>
    );
};

export default WeekInfoCard;
