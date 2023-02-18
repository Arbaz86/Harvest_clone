import { Button } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import counter from "../module.css/Counter.module.css";

const timeConverter = (tm) => {
  console.log(tm);
  const hour = Math.floor(tm / 60);
  const remain_minute = tm % 60;
  return hour + ":" + remain_minute;
};

export const Counter = ({
  day,
  id,
  time,
  setisClockRunning,
  isClockRunning,
  setWeek,
  week,
}) => {
  const [timer, setTimer] = useState(time);
  var clock = timeConverter(timer);
  const [state, setState] = useState(false);
  const handleStatus = () => {
    setState(() => !state);
  };

  const handleStop = () => {
    var tempWeek = week;
    setState(() => !state);
    var obj = tempWeek[day];
    // console.log(typeof())
    for (var key in obj) {
      if (obj[key].id === id) {
        tempWeek[day][key].time = timer;
        setWeek(() => tempWeek);
      }
    }
  };
  useEffect(() => {
    if (timer % 1000 === 0) {
      var tempWeek = week;
      var obj = tempWeek[day];
      // console.log(typeof())
      for (var key in obj) {
        if (obj[key].id === id) {
          tempWeek[day][key].time = timer;
          setWeek(() => tempWeek);
        }
      }
    }

    if (state === true) {
      setTimeout(() => {
        setTimer((timer) => timer + 1);
      }, 1000);
    }
  }, [timer, state]);

  return (
    //     <div>
    //   {timer}
    //       {isClockRunning?<button onClick={handleStop}>Stop</button>: <button onClick={handleStatus}>Start</button>}

    //     </div>
    <>
      {clock}
      {state ? (
        <button
          onClick={handleStop}
          className={counter.time_firstdiv_right_data_right_button}
        >
          <div className={counter.clock}></div>
          <p>Stop</p>
        </button>
      ) : (
        <Button backgroundColor={"black"} color="white" onClick={handleStatus}>
          Start
        </Button>
      )}
    </>
  );
};
