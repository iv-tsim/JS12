"use strict";

const isNumber = function(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
};

const isString = function(n) {
    return (typeof n === "string" && !(isNumber(n)) && n.trim() !== "");
};

let money = 0;

const start = function() {
    do {
        money = prompt("Ваш месячный доход?");
    } while (!isNumber(money));
};

start();

const appData = {
    income: {},
    addIncome: [],
    expenses: {},
    addExpenses: [],
    deposit: false,
    percentDeposit : 0,
    moneyDeposit: 0,
    mission: 200000,
    period: 6,
    budget: money,
    budgetDay: 0,
    budgetMonth: 0,
    expensesMonth: 0,
    asking: function() {

        if(confirm("У вас есть допольнительный заработок?")) {
            let itemIncome = prompt("Какой у вас допольнительный заработок?");
            while (!isString(itemIncome)) {
                itemIncome = prompt("Какой у вас допольнительный заработок?");
            }
            let cashIncome = prompt("Сколько в месяц вы на этом зарабатываете?");
            while (!isNumber(cashIncome)) {
                cashIncome = prompt("Сколько в месяц вы на этом зарабатываете?");
            }
            appData.income[itemIncome] = cashIncome;
        }

        const addExpenses = prompt("Перечислите возможные расходы за рассчитываемый период через запятую");
        appData.addExpenses = addExpenses.toLowerCase().split(",");
        appData.deposit = confirm("Есть ли у вас депозит в банке?");
        for (let i = 0; i < 2; i++) {
            let question = prompt("Введите обязательную статью расходов");
            while(!isString(question)) {
                question = prompt("Введите обязательную статью расходов");
            }
            let answer = prompt("Во сколько это обойдется?");
            while(!isNumber(answer)) {
                answer = prompt("Во сколько это обойдется?");
            }
            appData.expenses[question] = +answer;
        }
    },
    getExpensesMonth: function() {
        for (let key in appData.expenses) {
            appData.expensesMonth += appData.expenses[key];
        }
    },
    getBudget: function() {
        appData.budgetMonth = money - appData.expensesMonth;
        appData.budgetDay = Math.floor(appData.budgetMonth / 30);
    },
    getTargetMonth: function() {
        let period = Math.ceil(appData.mission / appData.budgetMonth);
        if (period < 0) {
            return ("Цель не будет достигнута");
        } else {
            return ("Цель будет достигнута за " + period + " месяцев");
        }
    },
    getStatusIncome: function() {
        if(appData.budgetDay >= 1200) {
            return ("У вас высокий уровень дохода");
        } else if(appData.budgetDay >= 600) {
            return ("У вас средний уровень дохода");
        } else if(appData.budgetDay < 600 && appData.budgetDay >= 0 ) {
            return ("К сожалению у вас уровень дохода ниже среднего");
        } else {
            return ("Что то пошло не так");
        }
    },
    getInfoDeposit: function() {
        if(appData.deposit) {
            appData.percentDeposit = prompt("Какой годовой процент?");
            while(!isNumber(appData.percentDeposit)) {
                appData.percentDeposit = prompt("Какой годовой процент?");
            }
            appData.moneyDeposit = prompt("Какая сумма заложена");
            while(!isNumber(appData.moneyDeposit)) {
                appData.moneyDeposit = prompt("Какая сумма заложена");
            }
        }
    },
    calcSavedMoney: function() {
        return appData.budgetMonth * appData.period;
    }
};

appData.asking();
appData.getExpensesMonth();
appData.getBudget();

console.log("Расходы за месяц: " + appData.expensesMonth);
console.log(appData.getTargetMonth());
console.log(appData.getStatusIncome());

console.log(appData.addExpenses.map(function(item) {
    return item[0].toUpperCase() + item.slice(1);
}).join(", "));

console.log("Наша программа включает в себя данные:");

for (let key in appData) {
    console.log(key + ": " + appData[key]);
}