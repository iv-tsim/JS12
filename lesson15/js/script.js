"use strict";

let expensesItems = document.querySelectorAll(".expenses-items"),
    incomeItems = document.querySelectorAll(".income-items");

const   start = document.getElementById("start"),
        cancel = document.getElementById("cancel"),
        incomeAdd = document.querySelectorAll("button")[0],
        expensesAdd = document.querySelectorAll("button")[1],
        depositCheck = document.getElementById("deposit-check"),
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
        additionalExpensesValue = document.querySelector(".additional_expenses-value"),
        depositBank = document.querySelector(".deposit-bank"),
        depositPercent = document.querySelector(".deposit-percent"),
        depositAmount = document.querySelector(".deposit-amount");

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
        this.getAddExpInc();
        this.getExpInc();
        this.getExpensesMonth();
        this.getInfoDeposit();
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
        start.disabled = true;
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
    getExpInc() {
        const count = (item) => {
            const   startStr = item.className.split("-")[0],
                    itemTitle = item.querySelector(`.${startStr}-title`).value,
                    itemAmount = item.querySelector(`.${startStr}-amount`).value;
            if (itemTitle !== "" && itemAmount !== "") {
                this[startStr][itemTitle] = itemAmount;
            }
        }
        incomeItems.forEach(count);
        expensesItems.forEach(count);
        for (let key in this.income) {
            this.incomeMonth += +this.income[key];
        }
    }
    addExpIncBlock() {
        const   startStr = this.parentNode.className;
        let ExpIncItems;
        (startStr === "expenses") ? ExpIncItems = expensesItems : ExpIncItems = incomeItems;
        let cloneItem = ExpIncItems[0].cloneNode(true),
        cloneItemInput = cloneItem.querySelectorAll("input");
        cloneItemInput.forEach((item) => {
            item.value = "";
        })
        ExpIncItems[0].parentNode.insertBefore(cloneItem, this);
        ExpIncItems = document.querySelectorAll(`.${startStr}-items`);
        (startStr === "expenses") ? expensesItems = ExpIncItems : incomeItems = ExpIncItems;
        if(ExpIncItems.length === 3) {
            this.style.display = "none";
        }
    }
    getAddExpInc() {
        const push = (item) => {
            let indicator;
            if (item.className === "additional_income-item") {
                item = item.value.trim();
                indicator = 1;
            } else {
                item = item.trim();
                indicator = 0;
            }
            if (item !== "" && indicator) {
                this.addIncome.push(item);
            } else if (item !== "") {
                this.addExpenses.push(item);
            }
        }
        additionalIncomeItem.forEach(push);
        additionalExpensesItem.value.split(",").forEach(push);
    }
    getExpensesMonth() {
        for (let key in this.expenses) {
            this.expensesMonth += +this.expenses[key];
        }
    }
    getBudget() {
        const monthDeposit = this.moneyDeposit * (this.percentDeposit / 100);
        this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth + monthDeposit;
        this.budgetDay = Math.floor(this.budgetMonth / 30);
    }
    getTargetMonth() {
        return Math.ceil(targetAmount.value / this.budgetMonth);
    }
    calcPeriod() {
        return this.budgetMonth * periodSelect.value;
    }
    getInfoDeposit() {
        if (this.deposit) {
            this.percentDeposit = depositPercent.value;
            this.moneyDeposit = depositAmount.value;
        }
    }
    changePercent() {
        const selectValue = this.value;
        if (selectValue === "other") {
            depositPercent.value = "";
            depositPercent.style.display = "inline-block";
            depositPercent.disabled = false;
        } else {
            depositPercent.style.display = "none";
            depositPercent.value = selectValue;
        }
    }
    depositHandler() {
        if (depositCheck.checked) {
            depositBank.style.display = "inline-block";
            depositAmount.style.display = "inline-block";
            this.deposit = true;
            depositBank.addEventListener("change", this.changePercent);
        } else {
            depositBank.style.display = "none";
            depositAmount.style.display = "none";
            depositAmount.value = "";
            depositBank.value = 0;
            this.deposit = false;
            depositBank.removeEventListener("change", this.changePercent);
        }
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
            depositBank.disabled = true;
            incomeAdd.disabled = true;
            expensesAdd.disabled = true;
            start.style.display = "none";
            cancel.style.display = "block";
        });
        cancel.addEventListener("click", this.reset.bind(this));
        expensesAdd.addEventListener("click", this.addExpIncBlock);
        incomeAdd.addEventListener("click", this.addExpIncBlock);
        periodSelect.addEventListener("input", () => {
            periodAmount.textContent = periodSelect.value;
        });
        depositCheck.addEventListener("change", this.depositHandler.bind(this));
        depositPercent.addEventListener("input", () => {
            if (!isNumber(depositPercent.value) || depositPercent.value > 100 || depositPercent.value < 0) {
                alert("Введите корректное значение в поле проценты");
                start.disabled = true;
                depositPercent.value = "";
            } else {
                start.disabled = false;
            }
        });
        inputs.forEach((item) => {
            if (item.getAttribute("placeholder") === "Наименование") {
                item.addEventListener("input", () => {
                    item.value = item.value.replace(/[^а-яёА-ЯЁ ,.!?]/, '');
                });
            } else if (item.getAttribute("placeholder") === "Сумма") {
                item.addEventListener("input", () => {
                    item.value = item.value.replace(/\D/, '');
                });
            }
        })
    }
}

const appData = new AppData();

appData.eventsListeners();