"use strict";

const   start = document.getElementById("start"),
        cancel = document.getElementById("cancel"),
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
    reset: function() {
        for (let key in this) {
            this.key = 0;
        }
        let inputsLeft = document.querySelectorAll(".data input[type=text]");
        let inputsRight = document.querySelectorAll(".result input");
        inputsLeft.forEach(function(item) {
            item.disabled = false;
            item.value = "";
        });
        inputsRight.forEach(function(item) {
            item.value = "";
        });
        periodSelect.value = 1;
        periodAmount.textContent = 1;
        incomeAdd.disabled = false;
        expensesAdd.disabled = false;
        start.style.display = "block";
        cancel.style.display = "none";
        incomeItems.forEach(function(item, index) {
            if (index > 0) {item.remove();}
        });
        incomeAdd.style.display = "block";
        expensesItems.forEach(function(item, index) {
            if (index > 0) {item.remove();}
        });
        expensesAdd.style.display = "block";
    },
    start: function() {
        this.budget = +money.value;
        this.getExpenses();
        this.getIncome();
        this.getExpensesMonth();
        this.getAddExpenses();
        this.getAddIncome();
        this.getBudget();
        this.showResult();
    },
    showResult: function() {
        budgetMonthValue.value = this.budgetMonth;
        budgetDayValue.value = this.budgetDay;
        expensesMonthValue.value = this.expensesMonth;
        additionalExpensesValue.value = this.addExpenses.join(",");
        additionalIncomeValue.value = this.addIncome.join(",");
        targetMonthValue.value = this.getTargetMonth();
        incomePeriodValue.value = this.calcPeriod();
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
        for (let key in this.income) {
            this.incomeMonth += +this.income[key];
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
        for (let key in this.expenses) {
            this.expensesMonth += +this.expenses[key];
        }
    },
    getBudget: function() {
        this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth;
        this.budgetDay = Math.floor(this.budgetMonth / 30);
    },
    getTargetMonth: function() {
        return Math.ceil(targetAmount.value / this.budgetMonth);
    },
    getStatusIncome: function() {
        if(this.budgetDay >= 1200) {
            return ("У вас высокий уровень дохода");
        } else if(this.budgetDay >= 600) {
            return ("У вас средний уровень дохода");
        } else if(this.budgetDay < 600 && this.budgetDay >= 0 ) {
            return ("К сожалению у вас уровень дохода ниже среднего");
        } else {
            return ("Что то пошло не так");
        }
    },
    getInfoDeposit: function() {
        if(this.deposit) {
            this.percentDeposit = prompt("Какой годовой процент?");
            while(!isNumber(this.percentDeposit)) {
                this.percentDeposit = prompt("Какой годовой процент?");
            }
            this.moneyDeposit = prompt("Какая сумма заложена");
            while(!isNumber(this.moneyDeposit)) {
                this.moneyDeposit = prompt("Какая сумма заложена");
            }
        }
    },
    calcPeriod: function() {
        return this.budgetMonth * periodSelect.value;
    }
};

start.disabled = true;
money.addEventListener("input", function() {
    if(money.value.trim() !== "") {
        start.disabled = false;
    }
});

const bindingThis = appData.start.bind(appData);

start.addEventListener("click", bindingThis);
start.addEventListener("click", function() {
    let inputs = document.querySelectorAll(".data input[type=text]");
    inputs.forEach(function(item) {
        item.disabled = true;
    });
    incomeAdd.disabled = true;
    expensesAdd.disabled = true;
    start.style.display = "none";
    cancel.style.display = "block";
});
expensesAdd.addEventListener("click", appData.addExpensesBlock);
incomeAdd.addEventListener("click", appData.addIncomeBlock);
periodSelect.addEventListener("input", function() {
    periodAmount.textContent = periodSelect.value;
});
cancel.addEventListener("click", appData.reset);