"use strict";

function DomElement(selector, height = "300px", width="300px", bg="yellow", fontSize="10px") {
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
    height: ${this.height}; width: ${this.width};`;
    elem.textContent = "I did it!";
    document.body.append(elem);
};

let newObj = new DomElement(".yes", "80px", "200px", "red", "44px");

newObj.createElement();