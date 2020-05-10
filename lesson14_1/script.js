window.addEventListener("DOMContentLoaded", () => {
    "use strict";

    function DomElement({selector = ".ok", height = "300px", width="300px", bg="yellow", fontSize="10px"}) {
        this.selector = selector;
        this.height = height;
        this.width = width;
        this.bg = bg;
        this.fontSize = fontSize;
    }
    DomElement.prototype.createElement = function() {
        let elem;
        if (this.selector[0] === ".") {
            elem = document.createElement("div");
            elem.classList.add(this.selector.slice(1));
        } else if (this.selector[0] === "#") {
            elem = document.createElement("p");
            elem.id = this.selector.slice(1);
        }
        elem.style.cssText = `background: ${this.bg}; font-size: ${this.fontSize}; 
        height: ${this.height}; width: ${this.width}; position: absolute`;
        elem.textContent = "square";
        document.body.appendChild(elem);
    };

    let newObj = new DomElement({selector: ".square", height: "100px", width: "100px", bg: "red", fontSize: "30px"});
    newObj.createElement();

    const square = document.querySelector(".square");

    let top = 0,
        left = 0;
    const detectKey = (event) => {
        if (event.keyCode === 40) {
            top += 10;
        } else if (event.keyCode === 38) {
            top -= 10;
        } else if (event.keyCode === 37) {
            left -= 10;
        }else if (event.keyCode === 39) {
            left += 10;
        }
        square.style.top = top + "px";
        square.style.left = left + "px";
    }
    window.addEventListener("keydown", detectKey);
})