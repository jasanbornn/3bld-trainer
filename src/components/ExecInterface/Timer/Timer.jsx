import './Timer.css';

import { useEffect, useRef, useState } from 'react';

//https://www.dzialowski.eu/hold-to-confirm-button/
//https://react.dev/reference/react/useRef
function Timer({appState}) {

    const DEFAULT_COLOR = "#CCC";
    const PRESSING_COLOR = "#FFAA00";
    const HIGHLIGHT_COLOR = "#00FF00";
    const HOLD_DELAY = 750; //milliseconds

    const TIMER_TEXT_INIT = "0.00";

    const TIMER_SUB_TEXT_INIT = "hold here to start timer";
    const TIMER_SUB_TEXT_RELEASE = "release to start timer";
    const TIMER_SUB_TEXT_STOP = "press anywhere to stop timer";

    const [timerText, setTimerText] = useState(TIMER_TEXT_INIT);
    const [timerSubText, setTimerSubText] = useState(TIMER_SUB_TEXT_INIT);
    const [timerColor, setTimerColor] = useState(DEFAULT_COLOR);
    const [timerRunning, setTimerRunning] = useState(false);

    const [preCountdownRunning, setPreCountdownRunning] = useState(false);


    const countdownStartTime = useRef(null);
    const holdIntervalRef = useRef(null);
    const timerStartTime = useRef(null);
    const timerIntervalRef = useRef(null);

    useEffect(() => {
        document.addEventListener('keyup', handleKeyUp); 
        document.addEventListener('keydown', handleKeyDown); 

        return () => {
            document.removeEventListener('keyup', handleKeyUp);    
            document.removeEventListener('keydown', handleKeyDown);    
        };

    }, [handleKeyDown, handleKeyUp]);

    function startPreCountdown() {
        setPreCountdownRunning(true);
        countdownStartTime.current = Date.now();

        holdIntervalRef.current = setInterval(() => {
            const diff = HOLD_DELAY - (Date.now() - countdownStartTime.current);
            if(diff < 0) {
                setTimerColor(HIGHLIGHT_COLOR);
                setTimerText(TIMER_TEXT_INIT);
                setTimerSubText(TIMER_SUB_TEXT_RELEASE);
            } else {
                setTimerColor(PRESSING_COLOR);
                setTimerSubText(TIMER_SUB_TEXT_INIT);
            }
        }, 10);
    }

    function stopPreCountdown() {
        setPreCountdownRunning(false);
        setTimerColor(DEFAULT_COLOR);

        if(holdIntervalRef.current) {
            clearInterval(holdIntervalRef.current);
            holdIntervalRef.current = null;
        }

        if(countdownStartTime.current && Date.now() - countdownStartTime.current > HOLD_DELAY) {
            startTimer();
        }

        countdownStartTime.current = null;
    }

    function cancelPreCountdown() {
        setPreCountdownRunning(false);
        setTimerColor(DEFAULT_COLOR);

        if(holdIntervalRef.current) {
            clearInterval(holdIntervalRef.current);
            holdIntervalRef.current = null;
        }

        countdownStartTime.current = null;
    }

    function formatMillis(millis) {
        let millisRemain = millis;

        let hours = Math.floor(millisRemain / (60 * 60 * 1000));
        millisRemain -= (hours * 60 * 60 * 1000);

        let minutes = Math.floor(millisRemain / (60 * 1000));
        millisRemain -= (minutes * 60 * 1000);

        let seconds = Math.floor(millisRemain / (1000));
        millisRemain -= (seconds * 1000);


        let millisRounded = Math.round(millisRemain / 10);
        //const millisRounded = millisRemain;

        if(millisRounded == 100) {
            millisRounded = 0;
        }

        if(millisRounded < 10) {
            millisRounded = "0" + millisRounded;
        }


        let formatted = seconds + "." + millisRounded;

        if(minutes > 0) {
            if(seconds < 10) {
                formatted = "0" + formatted;
            }

            formatted = minutes + ":" + formatted;
        }

        if(hours > 0) {
            if(minutes < 10) {
                formatted = "0" + formatted;
            }

            if(minutes == 0) {
                formatted = "0" + formatted;
                formatted = minutes + ":" + formatted;
            }
            formatted = hours + ":" + formatted;

        }

        return (formatted);
        
    }

    function startTimer() {
        setTimerRunning(true);
        setTimerSubText(TIMER_SUB_TEXT_STOP);
        timerStartTime.current = Date.now();

        timerIntervalRef.current = setInterval(() => {
            const time = (Date.now() - timerStartTime.current);
            setTimerText(formatMillis(time));
        }, 10);
    }

    function stopTimer() {
        setTimerRunning(false);
        if(timerIntervalRef.current) {
            clearInterval(timerIntervalRef.current);
            timerIntervalRef.current = null;
        }
        timerStartTime.current = null;
    }

    function handleKeyUp(event) {
        if(event.key == " ") {
            //prevent spacebar from activating other buttons
            event.preventDefault();
            event.stopPropagation();

            stopPreCountdown();
        }
    }

    function handleKeyDown(event) {
        if(event.repeat || preCountdownRunning || appState != "execution") {
            return;
        }

        if(event.key == " ") {
            //prevent spacebar from activating other buttons
            event.preventDefault();
            event.stopPropagation();

            if(timerRunning) {
                stopTimer();
            } else {
                startPreCountdown();
            }
        }
    }

    function handleMouseOrTouchUp() {
        stopPreCountdown();
    }

    function handleMouseOrTouchDown() {
        if(preCountdownRunning) {
            return;
        }

        if(timerRunning) {
            stopTimer();
        } else {
            startPreCountdown();
        }
    }

    function handleMouseOrTouchCancel() {
        cancelPreCountdown();
    }

    return (
        <div id="timer-container"
        style={{borderColor: timerColor}}
        onMouseDown={handleMouseOrTouchDown}
        onMouseUp={handleMouseOrTouchUp}
        onMouseLeave={handleMouseOrTouchCancel}
        onTouchStart={handleMouseOrTouchDown}
        onTouchEnd={handleMouseOrTouchUp}
        onTouchCancel={handleMouseOrTouchCancel}

        >
            <h1 id="timer-text" style={{color: timerColor}}>{timerText}</h1>
            <h3 id="timer-sub-text" style={{color: timerColor}}>{timerSubText}</h3>
            <div id="timer-stop-box" style={{display: (timerRunning ? "block" : "none")}} onMouseDown={handleMouseOrTouchDown} onTouchStart={handleMouseOrTouchDown}/>
        </div>
    );

}

export default Timer;
