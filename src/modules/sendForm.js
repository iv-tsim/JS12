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

    const statusMessage = document.createElement("div");

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
                .then((response) => {
                    if (response.status !== 200) {
                        throw new Error("network status is not 200");
                    }
                    statusMessage.textContent = successMessage;
                })
                .catch(error => {statusMessage.textContent = errorMessage; console.error(error);})
                .finally(inputs.forEach(elem => elem.value = ""));
        });
    }
    linkingSendingDataScript(form);
    linkingSendingDataScript(bottomForm);
    linkingSendingDataScript(popupForm, true);

    const postData = (body) => {
        return fetch("./server.php", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        });
    }
}
export default sendForm;