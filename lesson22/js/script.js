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
        const   menu = document.querySelector("menu"),
                btnMenu = document.querySelector(".menu"),
                handlerMenu = () => menu.classList.toggle("active-menu");
                
        menu.addEventListener("click", (event) => {
            let target = event.target;
            console.log(target);
            if (target.classList.contains("close-btn") || target.closest("li")) {
                handlerMenu();
            }
        });
        btnMenu.addEventListener("click", handlerMenu);
    }
    const togglePopup = () => {
        const   popup = document.querySelector(".popup"),
                popupBtn = document.querySelectorAll(".popup-btn"),
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
            if (window.innerWidth >= 768) {
                popupInterval = requestAnimationFrame(popupAnimation);
                scaleValue = 0;
            }
        }))
        popup.addEventListener("click", (event) => {
            let target = event.target;
            if (target.classList.contains("popup-close")) {
                popup.style.display = "none";
            } else {
                target = target.closest(".popup-content");
                if (!target) {
                    popup.style.display = "none";
                }
            }
        });
    }
    const tabs = () => {
        const   tabHeader = document.querySelector(".service-header"),
                tabs = tabHeader.querySelectorAll(".service-header-tab"),
                tabContent = document.querySelectorAll(".service-tab");
        
        const toggleTabContent = (index) => {
            for (let i = 0; i < tabContent.length; i++) {
                if (index === i) {
                    tabs[i].classList.add("active");
                    tabContent[i].classList.remove("d-none");
                } else {
                    tabs[i].classList.remove("active");
                    tabContent[i].classList.add("d-none"); 
                }
            }
        }
        tabHeader.addEventListener("click", (event) => {
            let target = event.target.closest(".service-header-tab");
            if (target) {
                tabs.forEach((item, i) => {
                    if (item === target) {
                        toggleTabContent(i);
                    }
                 })
            }
        });
    }
    const slider = () => {
        const slides = document.querySelectorAll(".portfolio-item");

        const renderDots = () => {
            let dotsWrapper = document.querySelector(".portfolio-dots");
            for (let i = 0; i < slides.length; i++) {
                let dot = document.createElement("li");
                if (i === 0) {
                    dot.classList.add("dot-active");
                }
                dot.classList.add("dot");
                dotsWrapper.appendChild(dot);
            }
        }
        renderDots();
        const   dots = document.querySelectorAll(".dot"),
                slider = document.querySelector(".portfolio-content");

        let currentSlide = 0,
            interval;
        
        const prev = (elem, index, strClass) => {
            elem[index].classList.remove(strClass);
        }

        const next = (elem, index, strClass) => {
            elem[index].classList.add(strClass);
        }

        const autoPlaySlide = () => {
            prev(slides, currentSlide, "portfolio-item-active");
            prev(dots, currentSlide, "dot-active");
            currentSlide++;
            if (currentSlide >= slides.length) {
                currentSlide = 0;
            }
            next(dots, currentSlide, "dot-active");
            next(slides, currentSlide, "portfolio-item-active");
        }
        const startSlide = (time = 3000) => {
            interval = setInterval(autoPlaySlide, time);
        }
        const stopSlide = () => {
            clearInterval(interval);
        }
        slider.addEventListener("click", (event) => {
            event.preventDefault();
            let target = event.target;

            if (target.matches(".portfolio-btn, .dot")) {
                prev(slides, currentSlide, "portfolio-item-active");
                prev(dots, currentSlide, "dot-active");

                if (target.matches("#arrow-right")) {
                    currentSlide++;
                } else if (target.matches("#arrow-left")) {
                    currentSlide--;
                } else if (target.matches(".dot")) {
                    dots.forEach((item, i) => {
                        if (item === target) {
                            currentSlide = i;
                        }
                    });
                }
                if (currentSlide >= slides.length) {
                    currentSlide = 0;
                } else if (currentSlide < 0) {
                    currentSlide = slides.length - 1;
                }
                next(dots, currentSlide, "dot-active");
                next(slides, currentSlide, "portfolio-item-active");
            }
        })

        slider.addEventListener("mouseover", (event) => {
            if (event.target.matches(".portfolio-btn") || event.target.matches(".dot")) {
                stopSlide();
            }
        });
        slider.addEventListener("mouseout", (event) => {
            if (event.target.matches(".portfolio-btn") || event.target.matches(".dot")) {
                startSlide(1500);
            }
        });

        startSlide(1500);
    }
    const photoChange = () => {
        const photoWrapper = document.getElementById("command");

        photoWrapper.addEventListener("mouseover", (event) => {
            let target = event.target;
            if (target.matches("img.command__photo")) {
                let dataImg = target.src;
                target.src = target.dataset.img;
                target.dataset.img = dataImg;
            }
        });
        photoWrapper.addEventListener("mouseout", (event) => {
            let target = event.target;
            if (target.matches("img.command__photo")) {
                let dataImg = target.src;
                target.src = target.dataset.img;
                target.dataset.img = dataImg;
            }
        });
    }
    const culc = (price = 100) => {
        const calcItems = document.querySelectorAll("input.calc-item");
        calcItems.forEach((item) => {
            item.addEventListener("input", () => {
                item.value = item.value.replace(/\D/g, "");
            })
        });
        const   calcBlock = document.querySelector(".calc-block"),
                calcType = document.querySelector(".calc-type"),
                calcSquare = document.querySelector(".calc-square"),
                calcDay = document.querySelector(".calc-day"),
                calcCount = document.querySelector(".calc-count"),
                totalValue = document.getElementById("total");

        const countSum = () => {
            let total = 0,
                countValue = 1,
                dayValue = 1;

            const   typeValue = calcType.options[calcType.selectedIndex].value,
                    squareValue = +calcSquare.value;
            
            if (calcCount.value > 1) {
                countValue += (calcCount.value - 1) / 10;
            }

            if (calcDay.value && calcDay.value < 5) {
                dayValue *= 2;
            } else if (calcDay.value && calcDay.value < 10) {
                dayValue *= 1.5;
            }

            if (typeValue && squareValue) {
                total = price * typeValue * squareValue * countValue * dayValue;
            }
            totalValue.textContent = Math.ceil(total);
        }

        calcBlock.addEventListener("change", (event) => {
            const target = event.target;
            if (target.matches("select") || target.matches("input")) {
                countSum();
            }
        });
    }
    countTimer("30 April 2020 6:42:0");
    toggleMenu();
    togglePopup();
    tabs();
    slider();
    photoChange();
    culc(100);
});