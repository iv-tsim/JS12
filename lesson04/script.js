"use strict"

const   money = +prompt("Ваш месячный доход?", 30000),
        income = "Листовки",
        addExpenses = prompt("Перечислите возможные расходы за рассчитываемый период через запятую", "a,b,c,d"),
        deposit = confirm("Есть ли у вас депозит в банке?"),
        mission = 200000,
        period = 6,
        expenses1 = prompt("Введите обязательную статью расходов", "qwerty"),
        amount1 = +prompt("Во сколько это обойдется?", 12345),
        expenses2 = prompt("Введите обязательную статью расходов", "wertewrt"),
        amount2 = +prompt("Во сколько это обойдется?", 1230);

const getExpensesMonth = function() {
    return amount1 + amount2;
}

const getAccumulatedMonth = function() {
    return money - getExpensesMonth();
}

const accumulatedMonth = getAccumulatedMonth();

const getTargetMonth = function() {
    return Math.ceil(mission / accumulatedMonth);
}

let budgetDay = Math.floor(accumulatedMonth / 30);

const showTypeOf = function(data) {
    return typeof(data);
}

console.log(showTypeOf(money));
console.log(showTypeOf(income));
console.log(showTypeOf(deposit));

console.log("Расходы за месяц: " + getExpensesMonth());

console.log(addExpenses.toLowerCase().split(","));

console.log("Цель будет достигнута за: " + getTargetMonth() + " месяцев");
console.log("Бюджет на день: ", budgetDay);

const getStatusIncome = function() {
    if(budgetDay >= 1200) {
        return ("У вас высокий уровень дохода");
    } else if(budgetDay >= 600) {
        return ("У вас средний уровень дохода");
    } else if(budgetDay < 600 && budgetDay >= 0 ) {
        return ("К сожалению у вас уровень дохода ниже среднего");
    } else {
        return ("Что то пошло не так");
    }
}

console.log(getStatusIncome());