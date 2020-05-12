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
export default culc;