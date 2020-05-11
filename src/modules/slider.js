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
export default slider;