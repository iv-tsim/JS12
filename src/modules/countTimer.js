const countTimer = (deadline) => {
    const   timerHours = document.querySelector("#timer-hours"),
            timerMinutes = document.querySelector("#timer-minutes"),
            timerSeconds = document.querySelector("#timer-seconds");

    function getTimeRemaining() {
        const   dateStop = new Date(deadline).getTime(),
                dateNow = new Date().getTime(),
                timeRemaining = (dateStop - dateNow) / 1000,
                seconds = Math.floor(timeRemaining % 60),
                minutes = Math.floor(timeRemaining / 60 % 60),
                hours = Math.floor(timeRemaining / 60 / 60);
        return {timeRemaining,seconds,minutes,hours};
    }
    const intervalId = setInterval(updateClock, 1000);
    function updateClock() {
        const timer = getTimeRemaining();
        if (timer.timeRemaining < 0) {
            clearInterval(intervalId);
            timerHours.textContent = "00";
            timerMinutes.textContent = "00";
            timerSeconds.textContent = "00";
        } else {
            timerHours.textContent = (timer.hours.toString().length === 1) ? "0" + timer.hours : timer.hours;
            timerMinutes.textContent = (timer.minutes.toString().length === 1) ? "0" + timer.minutes : timer.minutes;
            timerSeconds.textContent = (timer.seconds.toString().length === 1) ? "0" + timer.seconds : timer.seconds;
        }
    }
    updateClock();
}
export default countTimer;