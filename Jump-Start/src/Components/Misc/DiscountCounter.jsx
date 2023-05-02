import React, { useEffect, useRef } from "react";

const DiscountCounter = () => {
  const countdownRef = useRef(null);

  useEffect(() => {
    const countdown = countdownRef.current;
    const countdownValues = {
      days: countdown.querySelector('[data-id="Days"]'),
      hours: countdown.querySelector('[data-id="Hours"]'),
      minutes: countdown.querySelector('[data-id="Minutes"]'),
      seconds: countdown.querySelector('[data-id="Seconds"]'),
    };

    const endDate = new Date();
    endDate.setDate(endDate.getDate() + 2);
    const updateCountdown = () => {
      const currentDate = new Date();
      const remainingTime = endDate - currentDate;
      if (remainingTime < 0) {
        clearInterval(intervalId);
        return;
      }

      const seconds = Math.floor((remainingTime / 1000) % 60);
      const minutes = Math.floor((remainingTime / 1000 / 60) % 60);
      const hours = Math.floor((remainingTime / (1000 * 60 * 60)) % 24);
      const days = Math.floor(remainingTime / (1000 * 60 * 60 * 24));

      countdownValues.days.style.setProperty("--value", days);
      countdownValues.hours.style.setProperty("--value", hours);
      countdownValues.minutes.style.setProperty("--value", minutes);
      countdownValues.seconds.style.setProperty("--value", seconds);
    };

    updateCountdown();
    const intervalId = setInterval(updateCountdown, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div
      className="grid grid-flow-col gap-5 text-center auto-cols-max"
      ref={countdownRef}
    >
      <div className="flex flex-col">
        <span className="countdown font-mono text-5xl">
          <span data-id="Days" style={{ "--value": 0 }}></span>
        </span>
        days
      </div>
      <div className="flex flex-col">
        <span className="countdown font-mono text-5xl">
          <span data-id="Hours" style={{ "--value": 0 }}></span>
        </span>
        hours
      </div>
      <div className="flex flex-col">
        <span className="countdown font-mono text-5xl">
          <span data-id="Minutes" style={{ "--value": 0 }}></span>
        </span>
        min
      </div>
      <div className="flex flex-col">
        <span className="countdown font-mono text-5xl">
          <span data-id="Seconds" style={{ "--value": 0 }}></span>
        </span>
        sec
      </div>
    </div>
  );
};

export default DiscountCounter;
