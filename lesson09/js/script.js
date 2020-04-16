"use strict";

const   start = document.getElementById("start"),
        incomeAdd = document.querySelectorAll("button")[0],
        expensesAdd = document.querySelectorAll("button")[1],
        depositCheck = document.querySelector("#deposit-check"),
        additionalIncomeItem = document.querySelectorAll(".additional_income-item"),
        budgetMonthValue = document.querySelector(".budget_month-value"),
        budgetDayValue = document.querySelector(".budget_day-value"),
        expensesMonthValue = document.querySelector(".expenses_month-value"),
        additionalIncomeValue = document.querySelector(".additional_income-value"),
        incomePeriodValue = document.querySelector(".income_period-value"),
        targetMonthValue = document.querySelector(".target_month-value"),
        money = document.querySelector(".salary-amount"),
        incomeTitle = document.querySelector(".income-title"),
        incomeAmount = document.querySelector(".income-amount"),
        expensesTitle = document.querySelector(".expenses-title"),
        expensesAmount = document.querySelector(".expenses-amount"),
        additionalExpensesItem = document.querySelector(".additional_expenses-item"),
        targetAmount = document.querySelector(".target-amount"),
        periodSelect = document.querySelector(".period-select"),
        periodAmount = document.querySelector(".period-amount"),
        additionalExpensesValue = document.querySelector(".additional_expenses-value");
let expensesItems = document.querySelectorAll(".expenses-items"),
    incomeItems = document.querySelectorAll(".income-items");   

const isNumber = function(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
};

const appData = {
    budget: 0,
    budgetDay: 0,
    budgetMonth: 0,
    income: {},
    addIncome: [],
    incomeMonth: 0,
    expenses: {},
    addExpenses: [],
    expensesMonth: 0,
    deposit: false,
    percentDeposit : 0,
    moneyDeposit: 0,
    start: function() {
        appData.budget = +money.value;

        appData.getExpenses();
        appData.getIncome();
        appData.getExpensesMonth();
        appData.getAddExpenses();
        appData.getAddIncome();
        appData.getBudget();
        appData.showResult();
    },
    showResult: function() {
        budgetMonthValue.value = appData.budgetMonth;
        budgetDayValue.value = appData.budgetDay;
        expensesMonthValue.value = appData.expensesMonth;
        additionalExpensesValue.value = appData.addExpenses.join(",");
        additionalIncomeValue.value = appData.addIncome.join(",");
        targetMonthValue.value = appData.getTargetMonth();
        incomePeriodValue.value = appData.calcPeriod();
        periodSelect.addEventListener("input", function() {
            incomePeriodValue.value = appData.calcPeriod();
        });
    },
    addExpensesBlock: function() {
        let cloneExpensesItem = expensesItems[0].cloneNode(true);
        expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesAdd);
        expensesItems = document.querySelectorAll(".expenses-items");
        if(expensesItems.length === 3) {
            expensesAdd.style.display = "none";
        }
    },
    getExpenses: function() {
        expensesItems.forEach(function(item) {
                if (expensesTitle.value !== "" && expensesAmount.value !== "") {
                    appData.expenses[expensesTitle.value] = expensesAmount.value;
                }
        });
    },
    addIncomeBlock: function() {
        let cloneIncomeItem = incomeItems[0].cloneNode(true);
        incomeItems[0].parentNode.insertBefore(cloneIncomeItem, incomeAdd);
        incomeItems = document.querySelectorAll(".income-items");
        if(incomeItems.length === 3) {
            incomeAdd.style.display = "none";
        }
    },
    getIncome: function() {
        incomeItems.forEach(function(item) {
                if (incomeTitle.value !== "" && incomeAmount.value !== "") {
                    appData.income[incomeTitle.value] = incomeAmount.value;
                }
        });
        for (let key in appData.income) {
            appData.incomeMonth += +appData.income[key];
        }
    },
    getAddExpenses: function() {
        let addExpenses = additionalExpensesItem.value.split(",");
        addExpenses.forEach(function(item) {
            item = item.trim();
            if (item !== "") {
                appData.addExpenses.push(item);
            }
        });
    },
    getAddIncome: function() {
        additionalIncomeItem.forEach(function(item) {
            let itemValue = item.value.trim();
            if (itemValue !== "") {
                appData.addIncome.push(itemValue);
            }
        });
    },
    getExpensesMonth: function() {
        for (let key in appData.expenses) {
            appData.expensesMonth += +appData.expenses[key];
        }
    },
    getBudget: function() {
        appData.budgetMonth = appData.budget + appData.incomeMonth - appData.expensesMonth;
        appData.budgetDay = Math.floor(appData.budgetMonth / 30);
    },
    getTargetMonth: function() {
        return Math.ceil(targetAmount.value / appData.budgetMonth);
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
    calcPeriod: function() {
        return appData.budgetMonth * periodSelect.value;
    }
};

start.addEventListener("click", appData.start);
expensesAdd.addEventListener("click", appData.addExpensesBlock);
incomeAdd.addEventListener("click", appData.addIncomeBlock);
periodSelect.addEventListener("input", function() {
    periodAmount.textContent = periodSelect.value;
});
start.disabled = true;
money.addEventListener("input", function() {
    if(money.value.trim() !== "") {
        start.disabled = false;
    }
});