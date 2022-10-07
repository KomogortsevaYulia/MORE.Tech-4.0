import React from "react";

export const usePreloader = (startTimerCondition: boolean) => {
  const [isPreloaderShow, setIsPreloaderShow] = React.useState(false);
  const timer = React.useRef<NodeJS.Timeout | null>(null);

  React.useEffect(() => {
    if (startTimerCondition) {
      timer.current && clearTimeout(timer.current);
      timer.current = setTimeout(() => setIsPreloaderShow(true), 400);
    } else {
      timer.current && clearTimeout(timer.current);
      setIsPreloaderShow(false);
    }
  }, [startTimerCondition]);

  return {
    isPreloaderShow,
  };
};
