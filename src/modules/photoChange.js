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
export default photoChange;