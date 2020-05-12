const toggleMenu = () => {
    const   menu = document.querySelector("menu"),
            handlerMenu = () => menu.classList.toggle("active-menu");
    document.addEventListener("click", (event) => {
        let target = event.target;
        if (target.parentNode.classList.contains("menu") || target.classList.contains("close-btn") || target.matches("li a")) {
            handlerMenu();
        } else if (target !== menu && menu.classList.contains("active-menu")) {
            handlerMenu();
        }
        if (target.closest("a") && target.closest("a").getAttribute("href") !== "#close" && target.closest("a").getAttribute("href") !== "#" && target.closest("a").getAttribute("href") !== "") {
            event.preventDefault();
            document.querySelector(target.closest("a").getAttribute("href")).scrollIntoView({block: "start", behavior: "smooth"});
        }
    });
}

export default toggleMenu;