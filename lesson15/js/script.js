"use strict";

let expensesItems = document.querySelectorAll(".expenses-items"),
    incomeItems = document.querySelectorAll(".income-items");

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
        additionalExpensesItem = document.querySelector(".additional_expenses-item"),
        targetAmount = document.querySelector(".target-amount"),
        periodSelect = document.querySelector(".period-select"),
        periodAmount = document.querySelector(".period-amount"),
        additionalExpensesValue = document.querySelector(".additional_expenses-value");

const isNumber = n => {
    return !isNaN(parseFloat(n)) && isFinite(n);
};

class AppData {
    constructor() {
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
    }
    start() {
        this.budget = +money.value;
        this.getExpenses();
        this.getIncome();
        this.getExpensesMonth();
        this.getAddExpenses();
        this.getAddIncome();
        this.getBudget();
        this.showResult();
    }
    reset() {
        for (let key in this) {
            if (Array.isArray(this[key])) {
                this[key] = [];
            } else if (typeof this[key] === "object") {
                this[key] = {};
            } else {
                this[key] = 0;
            }
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
        this.eventsListeners();
    }
    showResult() {
        budgetMonthValue.value = this.budgetMonth;
        budgetDayValue.value = this.budgetDay;
        expensesMonthValue.value = this.expensesMonth;
        additionalExpensesValue.value = this.addExpenses.join(",");
        additionalIncomeValue.value = this.addIncome.join(",");
        targetMonthValue.value = this.getTargetMonth();
        incomePeriodValue.value = this.calcPeriod();
        periodSelect.addEventListener("input", () => {
            incomePeriodValue.value = this.calcPeriod();
        });
    }
    addExpensesBlock() {
        let cloneExpensesItem = expensesItems[0].cloneNode(true);
        expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesAdd);
        expensesItems = document.querySelectorAll(".expenses-items");
        if(expensesItems.length === 3) {
            expensesAdd.style.display = "none";
        }
    }
    getExpenses() {
        expensesItems.forEach((item) => {
            let itemExpenses = item.querySelector(".expenses-title").value,
                cashExpenses = item.querySelector(".expenses-amount").value;
            if (itemExpenses !== "" && cashExpenses !== "") {
                this.expenses[itemExpenses] = cashExpenses;
            }
        });
    }
    addIncomeBlock() {
        let cloneIncomeItem = incomeItems[0].cloneNode(true);
        incomeItems[0].parentNode.insertBefore(cloneIncomeItem, incomeAdd);
        incomeItems = document.querySelectorAll(".income-items");
        if(incomeItems.length === 3) {
            incomeAdd.style.display = "none";
        }
    }
    getIncome() {
        incomeItems.forEach((item) => {
            let itemIncome = item.querySelector(".income-title").value,
                cashIncome = item.querySelector(".income-amount").value;
            if (itemIncome !== "" && cashIncome !== "") {
                this.income[itemIncome] = cashIncome;
            }
        });
        for (let key in this.income) {
            this.incomeMonth += +this.income[key];
        }
    }
    getAddExpenses() {
        let addExpenses = additionalExpensesItem.value.split(",");
        addExpenses.forEach(item => {
            item = item.trim();
            if (item !== "") {
                this.addExpenses.push(item);
            }
        });
    }
    getAddIncome() {
        additionalIncomeItem.forEach(item => {
            let itemValue = item.value.trim();
            if (itemValue !== "") {
                this.addIncome.push(itemValue);
            }
        });
    }
    getExpensesMonth() {
        for (let key in this.expenses) {
            this.expensesMonth += +this.expenses[key];
        }
    }
    getBudget() {
        this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth;
        this.budgetDay = Math.floor(this.budgetMonth / 30);
    }
    getTargetMonth() {
        return Math.ceil(targetAmount.value / this.budgetMonth);
    }
    calcPeriod() {
        return this.budgetMonth * periodSelect.value;
    }
    eventsListeners() {
        start.disabled = true;
        money.addEventListener("input", () => {
            if(money.value.trim() !== "") {
                start.disabled = false;
            }
        });
        start.addEventListener("click", () => {
            this.start();
            let inputs = document.querySelectorAll(".data input[type=text]");
            inputs.forEach(item => {
                item.disabled = true;
            });
            incomeAdd.disabled = true;
            expensesAdd.disabled = true;
            start.style.display = "none";
            cancel.style.display = "block";
        });
        cancel.addEventListener("click", this.reset.bind(this));
        expensesAdd.addEventListener("click", this.addExpensesBlock);
        incomeAdd.addEventListener("click", this.addIncomeBlock);
        periodSelect.addEventListener("input", () => {
            periodAmount.textContent = periodSelect.value;
        });
    }
}

const appData = new AppData();

appData.eventsListeners();