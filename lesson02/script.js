let money = 30000,
    income = "Листовки",
    addExpenses = "Квартира, еда, транспорт, одежда",
    deposit = true,
    mission = 200000,
    period = 6,
    budgetDay = money / 30;

console.log(typeof money);
console.log(typeof income);
console.log(typeof deposit);

console.log(addExpenses.length);

console.log("Период равен " + period + " месяцев");
console.log("Цель заработать " + mission + " рублей/долларов/гривен/юани");

addExpenses = addExpenses.toLowerCase();
console.log(addExpenses.split(", "));

console.log('budgetDay: ', budgetDay);