import moment from "moment";
import sunrise from "../../../assets/images/sunrise.gif";
import sunset from "../../../assets/images/sunset.gif"
import { ICity } from "../interface/weatherChart.interface";

interface IProps {
    data: ICity
}

const SunRiseSetCard: React.FC<IProps> = (props) => {
    const { data } = props;
    return (
        <div className="sunrise-card ml--20 p--20 flex align-items--center justify-content--evenly">
            <div className="card-image flex align-items--center justify-content--center flex--column">
                <img
                    src={sunrise}
                    alt="sunrise"
                    className="height--full width--full"
                />
                
                <div className="font-size--22 font-semi--bold mt--20">
                    Sunrise : {moment.unix(data.sunrise).format('LT')}
                </div>
            </div>
            <div className="card-image flex align-items--center justify-content--center flex--column">
                <img
                    src={sunset}
                    alt="sunset"
                    className="height--full width--full"
                />
                <div className="font-size--22 font-semi--bold mt--20">
                    Sunset : {moment.unix(data.sunset).format('LT')}
                </div>
            </div>
        </div>
    );
};

export default SunRiseSetCard;
