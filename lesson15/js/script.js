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

const isNumber = n => {
    return !isNaN(parseFloat(n)) && isFinite(n);
};

const AppData = function() {
    this.budget = 0;
    this.budgetDay = 0;
    this.budgetMonth = 0;
    this.income = {};
    this.addIncome = [];
    this.incomeMonth = 0;
    this.expenses = {};
    this.addExpenses = [];
    this.expensesMonth = 0;
    this.deposit = false;
    this.percentDeposit = 0;
    this.moneyDeposit = 0;
};

AppData.prototype.reset = function() {
    for (let key in this) {
        this.key = 0;
    }
    let inputsLeft = document.querySelectorAll(".data input[type=text]");
    let inputsRight = document.querySelectorAll(".result input");
    inputsLeft.forEach(item => {
        item.disabled = false;
        item.value = "";
    });
    inputsRight.forEach(item => {
        item.value = "";
    });
    periodSelect.value = 1;
    periodAmount.textContent = 1;
    incomeAdd.disabled = false;
    expensesAdd.disabled = false;
    start.style.display = "block";
    cancel.style.display = "none";
    incomeItems.forEach((item, index) => {
        if (index > 0) {item.remove();}
    });
    incomeAdd.style.display = "block";
    expensesItems.forEach((item, index) => {
        if (index > 0) {item.remove();}
    });
    expensesAdd.style.display = "block";
};
AppData.prototype.start = function() {
    this.budget = +money.value;
    this.eventsListeners();
    this.getExpenses();
    this.getIncome();
    this.getExpensesMonth();
    this.getAddExpenses();
    this.getAddIncome();
    this.getBudget();
    this.showResult();
};
AppData.prototype.showResult = function() {
    const _this = this;
    budgetMonthValue.value = this.budgetMonth;
    budgetDayValue.value = this.budgetDay;
    expensesMonthValue.value = this.expensesMonth;
    additionalExpensesValue.value = this.addExpenses.join(",");
    additionalIncomeValue.value = this.addIncome.join(",");
    targetMonthValue.value = this.getTargetMonth();
    incomePeriodValue.value = this.calcPeriod();
    periodSelect.addEventListener("input", () => {
        incomePeriodValue.value = _this.calcPeriod();
    });
};
AppData.prototype.addExpensesBlock = function() {
    let cloneExpensesItem = expensesItems[0].cloneNode(true);
    expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesAdd);
    expensesItems = document.querySelectorAll(".expenses-items");
    if(expensesItems.length === 3) {
        expensesAdd.style.display = "none";
    }
};
AppData.prototype.getExpenses = function() {
    const _this = this;
    expensesItems.forEach(() => {
            if (expensesTitle.value !== "" && expensesAmount.value !== "") {
                _this.expenses[expensesTitle.value] = expensesAmount.value;
            }
    });
};
AppData.prototype.addIncomeBlock = function() {
    let cloneIncomeItem = incomeItems[0].cloneNode(true);
    incomeItems[0].parentNode.insertBefore(cloneIncomeItem, incomeAdd);
    incomeItems = document.querySelectorAll(".income-items");
    if(incomeItems.length === 3) {
        incomeAdd.style.display = "none";
    }
};
AppData.prototype.getIncome = function() {
    const _this = this;
    incomeItems.forEach(() => {
            if (incomeTitle.value !== "" && incomeAmount.value !== "") {
                _this.income[incomeTitle.value] = incomeAmount.value;
            }
    });
    for (let key in this.income) {
        this.incomeMonth += +this.income[key];
    }
};
AppData.prototype.getAddExpenses = function() {
    const _this = this;
    let addExpenses = additionalExpensesItem.value.split(",");
    addExpenses.forEach(item => {
        item = item.trim();
        if (item !== "") {
            _this.addExpenses.push(item);
        }
    });
};
AppData.prototype.getAddIncome = function() {
    const _this = this;
    additionalIncomeItem.forEach(item => {
        let itemValue = item.value.trim();
        if (itemValue !== "") {
            _this.addIncome.push(itemValue);
        }
    });
};
AppData.prototype.getExpensesMonth = function() {
    for (let key in this.expenses) {
        this.expensesMonth += +this.expenses[key];
    }
};
AppData.prototype.getBudget = function() {
    this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth;
    this.budgetDay = Math.floor(this.budgetMonth / 30);
};
AppData.prototype.getTargetMonth = function() {
    return Math.ceil(targetAmount.value / this.budgetMonth);
};
AppData.prototype.calcPeriod = function() {
    return this.budgetMonth * periodSelect.value;
};
AppData.prototype.eventsListeners = function() {
    const bindingThis = this.start.bind(this);
    start.addEventListener("click", bindingThis);
    start.disabled = true;
    money.addEventListener("input", () => {
        if(money.value.trim() !== "") {
            start.disabled = false;
        }
    });
    start.addEventListener("click", () => {
        let inputs = document.querySelectorAll(".data input[type=text]");
        inputs.forEach(item => {
            item.disabled = true;
        });
        incomeAdd.disabled = true;
        expensesAdd.disabled = true;
        start.style.display = "none";
        cancel.style.display = "block";
    });
    expensesAdd.addEventListener("click", this.addExpensesBlock);
    incomeAdd.addEventListener("click", this.addIncomeBlock);
    periodSelect.addEventListener("input", () => {
        periodAmount.textContent = periodSelect.value;
    });
    cancel.addEventListener("click", this.reset);
};

const appData = new AppData();

appData.start();