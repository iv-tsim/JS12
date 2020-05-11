const toggleMenu = () => {
    const   menu = document.querySelector("menu"),
            btnMenu = document.querySelector(".menu"),
            handlerMenu = () => menu.classList.toggle("active-menu");
            
    menu.addEventListener("click", (event) => {
        let target = event.target;
        if (target.classList.contains("close-btn") || target.closest("li")) {
            handlerMenu();
        }
    });
    btnMenu.addEventListener("click", handlerMenu);
}

export default toggleMenu;