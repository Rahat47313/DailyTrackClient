import { useEffect, useState, useRef, memo } from "react";

function TimeComponent() {
  const timeRef = useRef<HTMLParagraphElement>(null);
  const currentTime = useState(
    new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    })
  )[0];
  // const [currentTime, setCurrentTime] = useState(
  //   new Date().toLocaleTimeString([], {
  //     hour: "2-digit",
  //     minute: "2-digit",
  //     second: "2-digit",
  //   })
  // );

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (timeRef.current) {
        timeRef.current.innerText = new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        });
      }
      // setCurrentTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
    }, 1000);

    return () => clearInterval(intervalId); // Cleanup the interval on component unmount
  }, []);

  return <p ref={timeRef}>{currentTime}</p>;
}

const Time = memo(TimeComponent);
export default Time;
