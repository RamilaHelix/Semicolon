import React from "react";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import { Box } from "@mui/material";

const minuteSeconds = 60;
const hourSeconds = 3600;
const daySeconds = 86400;

const renderTime = (dimension, time) => {
  return (
    <div style={{ fontSize: "10px" }}>
      <div className="time">{time}</div>
      <div>{dimension}</div>
    </div>
  );
};

const getTimeSeconds = (time) => (minuteSeconds - time) | 0;
const getTimeMinutes = (time) => ((time % hourSeconds) / minuteSeconds) | 0;
const getTimeHours = (time) => ((time % daySeconds) / hourSeconds) | 0;

interface timerProps {
  isPlaying?: boolean;
  minute: number;
  onOutOfTime: (completed: boolean) => void;
  upDateTime?: () => void
}

const Timer: React.FC<timerProps> = ({ isPlaying, minute, onOutOfTime, upDateTime }) => {

  //const [time, setTime] = useState(minute);
  const time = minute;
  const stratTime = 0; // use UNIX timestamp in seconds
  const endTime = time; // use UNIX timestamp in seconds
  const remainingTime = endTime - stratTime;

  return (
    <Box display={"flex"} marginRight={"0.5rem"} role="timer" className="helix-timer"
      aria-live="assertive"
    // position="absolute" right={"11rem"} top="7px"
    >
      <Box sx={{ marginRight: "1rem" }}>
        <CountdownCircleTimer
          colors="#D14081"
          isPlaying={isPlaying}
          strokeWidth={5}
          size={50}
          duration={daySeconds}
          initialRemainingTime={remainingTime % daySeconds}
        >
          {({ elapsedTime, color }) => (
            <span style={{ color }}>
              {renderTime("hrs", getTimeHours(daySeconds - elapsedTime))}
            </span>
          )}
        </CountdownCircleTimer>
      </Box>
      <Box sx={{ marginRight: "1rem" }}>
        <CountdownCircleTimer
          colors="#EF798A"
          isPlaying={isPlaying}
          strokeWidth={5}
          size={50}
          duration={hourSeconds}
          initialRemainingTime={remainingTime % hourSeconds}
          onComplete={() => ({ shouldRepeat: true })}
          onUpdate={upDateTime}
        >
          {({ elapsedTime, color }) => (
            <span style={{ color }}>
              {renderTime("min", getTimeMinutes(hourSeconds - elapsedTime))}
            </span>
          )}
        </CountdownCircleTimer>
      </Box>
      <Box>
        <CountdownCircleTimer
          isPlaying={isPlaying}
          strokeWidth={5}
          size={50}
          colors={["#218380", "#eb3434", "#f54257", "#f54257"]}
          colorsTime={[60, 40, 30, 0]}
          duration={minuteSeconds}
          initialRemainingTime={remainingTime % minuteSeconds}
          onComplete={() => ({ shouldRepeat: true })}
        //onComplete={(totalElapsedTime) => (totalElapsedTime <= 0 ? { shouldRepeat: true, delay: 1 } : { shouldRepeat: false, })}
        >
          {({ elapsedTime, color }) => (
            <span style={{ color }}>
              {renderTime("secs", getTimeSeconds(elapsedTime))}
            </span>
          )}
        </CountdownCircleTimer>
      </Box>
      <CountdownCircleTimer
        size={0}
        strokeWidth={0}
        isPlaying={isPlaying}
        duration={minute}
        colorsTime={[60, 40, 30, 0]}
        colors={["#218380", "#eb3434", "#f54257", "#f54257"]}
        onUpdate={(t) => sessionStorage.setItem('timer', JSON.stringify(t))}
        onComplete={() => onOutOfTime(true)}
      ></CountdownCircleTimer>
    </Box>
  );
};
export default Timer;
