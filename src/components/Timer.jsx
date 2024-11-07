import React, { useState, useEffect } from 'react';
import "./Timer.css";

const Timer = ({ seconds, setSeconds }) => {

    useEffect(() => {
        // Exit early if countdown is finished
        if (seconds <= 0) {
            return;
        }

        // Set up the timer
        const timer = setInterval(() => {
            setSeconds((prevSeconds) => prevSeconds - 1);
        }, 1000);

        // Clean up the timer
        return () => clearInterval(timer);
    }, [seconds]);

    // Format the remaining time (e.g., “00:05:10” for 5 minutes and 10 seconds)
    const formatTime = (timeInSeconds) => {
        const minutes = Math.floor(timeInSeconds / 60)
            .toString()
            .padStart(2, '0');
        const seconds = (timeInSeconds % 60).toString().padStart(2, '0');
        return `${minutes}:${seconds}`;
    };

    return (
        <div>
            <p style={{ color: (seconds % 60) <= 10 && (Math.floor(seconds / 60) === 0) ? 'rgba(255, 0, 0, 0.849)' : 'rgba(255, 255, 255, 0.904)' }}>{formatTime(seconds)}</p>
        </div>
    );
};

export default Timer;