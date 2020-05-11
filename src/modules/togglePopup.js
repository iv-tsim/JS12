import toggleMenu from "./toggleMenu";

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
export default togglePopup;