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
                handlerMenu = () => menu.classList.toggle("active-menu");
        document.addEventListener("click", (event) => {
            let target = event.target;
            if (target.parentNode.classList.contains("menu") || target.classList.contains("close-btn") || target.matches("a")) {
                handlerMenu();
            } else if (target !== menu && menu.classList.contains("active-menu")) {
                handlerMenu();
            }
            if (target.closest("a") && target.closest("a").getAttribute("href") !== "#close") {
                event.preventDefault();
                document.querySelector(target.closest("a").getAttribute("href")).scrollIntoView({block: "start", behavior: "smooth"});
            }
        });
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

        let interval;
        
        const runningNumbers = (num) => {
            if (num === 0) {return;}
            const   time = 1500,
                    step = 10;
            let n = 0;
            clearInterval(interval);
            interval = setInterval(() => {
                console.log(num);
                n += step;
                totalValue.textContent = n;
                if (n >= num) {
                    clearInterval(interval);
                }
            }, Math.round(time / (num / step)))
        }

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
            runningNumbers(Math.ceil(total));
        }

        calcBlock.addEventListener("change", (event) => {
            const target = event.target;
            if (target.matches("select") || target.matches("input")) {
                countSum();
            }
        });
    }
    const sendForm = () => {
        const   errorMessage = "Something went wrong...",
                loadMessage = "Loading...",
                successMessage = "Thank you! We'll get in touch with soon";
        const   form = document.getElementById("form1"),
                bottomForm = document.getElementById("form2"),
                popupForm = document.getElementById("form3");
        const inputs = document.querySelectorAll("input");
        inputs.forEach((elem) => {
            if (elem.getAttribute("name") === "user_phone") {
                elem.addEventListener("input", () => {
                    elem.value = elem.value.replace(/[^0-9+]/, '');
                });
            } else if (elem.getAttribute("placeholder") === "Ваше имя" || elem.getAttribute("placeholder") === "Ваше сообщение") {
                elem.addEventListener("input", () => {
                    elem.value = elem.value.replace(/[^а-яёА-ЯЁ ]/g, '');
                });
            }
        })

        let statusMessage = document.createElement("div");

        const linkingSendingDataScript = (element, isPopupForm = false) => {
            element.addEventListener("submit", (event) => {
                const inputs = element.querySelectorAll("input");
                event.preventDefault();
                element.appendChild(statusMessage);
                statusMessage.textContent = loadMessage;
                if (isPopupForm) {
                    statusMessage.style.cssText = "color: white";
                }
                const formData = new FormData(element);
                let body = {};
                formData.forEach((val, key) => {
                    body[key] = val;
                });
                postData(body, inputs)
                    .then(() => statusMessage.textContent = successMessage)
                    .catch(error => {statusMessage.textContent = errorMessage; console.error(error);})
                    .finally(inputs.forEach(elem => elem.value = ""));
            });
        }
        linkingSendingDataScript(form);
        linkingSendingDataScript(bottomForm);
        linkingSendingDataScript(popupForm, true);

        const postData = (body) => {
            return new Promise((resolve, reject) => {
                const request = new XMLHttpRequest();
                request.addEventListener("readystatechange", () => {
                    if (request.readyState !== 4) {
                        return;
                    }
                    (request.status === 200) ? resolve() : reject(request.status);
                });
                request.open("POST", "./server.php");
                request.setRequestHeader("Content-Type", "application/json");
                request.send(JSON.stringify(body));
            });
        }
    }
    countTimer("13 May 2020 00:00:00");
    toggleMenu();
    togglePopup();
    tabs();
    slider();
    photoChange();
    culc(100);
    sendForm();
});