"use strict"

const isNumber = function(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
};

const   income = "Листовки",
        addExpenses = prompt("Перечислите возможные расходы за рассчитываемый период через запятую", "a,b,c,d"),
        deposit = confirm("Есть ли у вас депозит в банке?"),
        mission = 200000,
        period = 6;

let money = 0,
    expenses = [];

const start = function() {
    do {
        money = prompt("Ваш месячный доход?");
    } while (!isNumber(money));
};

start();

const getExpensesMonth = function() {
    let sum = 0;
    for (let i = 0; i < 2; i++) {
        expenses[i] = prompt("Введите обязательную статью расходов", "qwerty");
        let expense = +prompt("Во сколько это обойдется?");
        if (isNumber(expense)) {
            sum += expense;
        }
    }
    return sum;
};

const expensesAmount = getExpensesMonth();

const getAccumulatedMonth = function() {
    return money - expensesAmount;
};

const accumulatedMonth = getAccumulatedMonth();

const getTargetMonth = function() {
    let period = Math.ceil(mission / accumulatedMonth);
    if (period < 0) {
        return ("Цель не будет достигнута");
    } else {
        return ("Цель будет достигнута за " + period + " месяцев");
    }
};

let budgetDay = Math.floor(accumulatedMonth / 30);

const showTypeOf = function(data) {
    return typeof(data);
};

console.log(showTypeOf(money));
console.log(showTypeOf(income));
console.log(showTypeOf(deposit));

console.log("Расходы за месяц: " + expensesAmount);

console.log(addExpenses.toLowerCase().split(","));

console.log(getTargetMonth());
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
};

console.log(getStatusIncome());