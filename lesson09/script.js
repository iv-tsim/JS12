"use strict";

const   books = document.querySelector(".books"),
        book = document.querySelectorAll(".book"),
        body = document.querySelector("body"),
        adv = document.querySelector(".adv"),
        heading = book[4].querySelector("h2 a"),
        bookTwoElems = book[0].querySelectorAll("ul li"),
        bookFiveElems = book[5].querySelectorAll("ul li"),
        bookSixElems = book[2].querySelectorAll("ul li");

books.prepend(book[1]);
book[1].after(book[0]);
book[0].after(book[4]);
book[4].after(book[3]);
book[3].after(book[5]);

body.style.backgroundImage = "url(./image/you-dont-know-js.jpg)";

heading.textContent = "Книга 3. this и Прототипы Объектов";

adv.remove();

bookTwoElems[2].insertAdjacentElement("beforebegin", bookTwoElems[3]);
bookTwoElems[3].insertAdjacentElement("afterend", bookTwoElems[6]);
bookTwoElems[4].insertAdjacentElement("afterend", bookTwoElems[8]);
bookTwoElems[8].insertAdjacentElement("afterend", bookTwoElems[4]);
bookTwoElems[9].insertAdjacentElement("afterend", bookTwoElems[2]);

console.log(bookFiveElems);

bookFiveElems[1].insertAdjacentElement("afterend", bookFiveElems[9]);
bookFiveElems[4].insertAdjacentElement("afterend", bookFiveElems[2]);
bookFiveElems[7].insertAdjacentElement("afterend", bookFiveElems[5]);

bookSixElems[8].insertAdjacentHTML("afterend", "<li>Глава 8: За пределами ES6</li>")