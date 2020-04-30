window.addEventListener("DOMContentLoaded", function() {
    "use sctrict";
    
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
    const toggleMenu = () => {
        const   btnMenu = document.querySelector(".menu"),
                menu = document.querySelector("menu"),
                closeBtn = document.querySelector(".close-btn"),
                menuItems = menu.querySelectorAll("ul>li"),
                handlerMenu = () => menu.classList.toggle("active-menu");
                
        btnMenu.addEventListener("click", handlerMenu);
        closeBtn.addEventListener("click", handlerMenu);
        menuItems.forEach((item) => item.addEventListener("click", handlerMenu))
    }
    const togglePopup = () => {
        const   popup = document.querySelector(".popup"),
                popupBtn = document.querySelectorAll(".popup-btn"),
                popupClose = document.querySelector(".popup-close"),
                popupContent = document.querySelector(".popup-content");
        let scaleValue = 0,
            popupInterval;
        const popupAnimation = () => {
            popupInterval = requestAnimationFrame(popupAnimation);
            (scaleValue <= 20) ? popupContent.style.transform = `scale(${scaleValue / 20})` : cancelAnimationFrame(popupInterval);
            scaleValue++;
        }
        popupBtn.forEach((item) => item.addEventListener("click", () => {
            popup.style.display = "block";
            if (screen.width >= 768) {
                popupInterval = requestAnimationFrame(popupAnimation);
                scaleValue = 0;
            }
        }))
        popupClose.addEventListener("click", () => popup.style.display = "none")
    }
    countTimer("30 April 2020 6:42:0");
    toggleMenu();
    togglePopup();
});