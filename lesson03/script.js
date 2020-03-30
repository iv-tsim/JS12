let money,
    income = "Листовки",
    addExpenses,
    deposit,
    mission = 200000,
    period = 6,
    budgetDay,
    missionComplete;

money = prompt("Ваш месячный доход?");
addExpenses = prompt("Перечислите возможные расходы за рассчитываемый период через запятую");
deposit = confirm("Есть ли у вас депозит в банке?");

let expenses1 = prompt("Введите обязательную статью расходов");
let amount1 = prompt("Во сколько это обойдется?");
let expenses2 = prompt("Введите обязательную статью расходов");
let amount2 = prompt("Во сколько это обойдется?");

let budgetMonth = +money - +amount1 - +amount2;

missionComplete = Math.ceil(mission / budgetMonth)

budgetDay = Math.floor(budgetMonth / 30);

console.log(typeof money);
console.log(typeof income);
console.log(typeof deposit);

console.log(addExpenses.length);

console.log("Период равен " + period + " месяцев");
console.log("Цель заработать " + mission + " рублей/долларов/гривен/юани");

addExpenses = addExpenses.toLowerCase();
console.log(addExpenses.split(","))

console.log("Бюджет на месяц: ", budgetMonth);

console.log("Цель будет достигнута за: " + missionComplete + " месяцев");
console.log("Бюджет на месяц: ", budgetDay);

if(budgetDay >= 1200) {
    console.log("У вас высокий уровень дохода");
} else if(budgetDay >= 600) {
    console.log("У вас средний уровень дохода");
} else if(budgetDay < 600 || budgetDay >= 0 ) {
    console.log("К сожалению у вас уровень дохода ниже среднего");
} else {
    console.log("Что то пошло не так");
}