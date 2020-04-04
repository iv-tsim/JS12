"use strict";

const isNumber = function(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
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
    mission: 200000,
    period: 6,
    budget: money,
    budgetDay: 0,
    budgetMonth: 0,
    expensesMonth: 0,
    asking: function() {
        const addExpenses = prompt("Перечислите возможные расходы за рассчитываемый период через запятую", "a,b,c,d");
        appData.addExpenses = addExpenses.toLowerCase().split(",");
        appData.deposit = confirm("Есть ли у вас депозит в банке?");
        let i = 0;
        do {
            let question = prompt("Введите обязательную статью расходов"),
                answer = prompt("Во сколько это обойдется?");
            i++;
            if (isNumber(answer)) {
                appData.expenses[question] = +answer;
            } else {
                i--;
            }
        } while (i < 2);
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
    }
};

appData.asking();
appData.getExpensesMonth();
appData.getBudget();

console.log("Расходы за месяц: " + appData.expensesMonth);
console.log(appData.getTargetMonth());
console.log(appData.getStatusIncome());

console.log("Наша программа включает в себя данные:");

for (let key in appData) {
    console.log(key + ": " + appData[key]);
}