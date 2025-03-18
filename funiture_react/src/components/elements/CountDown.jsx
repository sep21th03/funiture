'use client';
import Countdown from 'react-countdown';

const CountDown = ({ date, unit = true, unitShort = false }) => {
    const zeroPad = (value) => String(value).padStart(2, "0");

    const renderer = ({ days, hours, minutes, seconds, completed }) => {
        if (completed) {
            return <div className="countdown-complete">Time’s up!</div>;
        }

        return (
          <div className="countdown-container d-flex">
            <div className="countdown-section">
                <div className="countdown-number">{zeroPad(days)}</div>
                {unit && <div className="countdown-unit">{unitShort ? "D" : "Days"}</div>}
            </div>
            <div className="countdown-section">
                <div className="countdown-number">{zeroPad(hours)}</div>
                {unit && <div className="countdown-unit">{unitShort ? "H" : "Hrs"}</div>}
            </div>
            <div className="countdown-section">
                <div className="countdown-number">{zeroPad(minutes)}</div>
                {unit && <div className="countdown-unit">{unitShort ? "M" : "Min"}</div>}
            </div>
            <div className="countdown-section">
                <div className="countdown-number">{zeroPad(seconds)}</div>
                {unit && <div className="countdown-unit">{unitShort ? "S" : "Sec"}</div>}
            </div>
          </div>
        );
    };

    return <Countdown date={ Date.now() + 6000000} renderer={renderer} />;
};

export default CountDown;
