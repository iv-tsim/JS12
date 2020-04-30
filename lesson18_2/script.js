"use sctrict";

const   hello = document.querySelector(".hello"),
        weekday = document.querySelector(".weekday"),
        time = document.querySelector(".time"),
        newYearTime = document.querySelector(".newYearTime"),
        date = new Date(),
        weekdays = new Map();
        weekdays.set(0, "Воскресенье")
                .set(1, "Понедельник")
                .set(2, "Вторник")
                .set(3, "Среда")
                .set(4, "Четверг")
                .set(5, "Пятница")
                .set(6, "Суббота");
//Просто хотел попробовать set, поэтому так написал
hello.textContent = (date.getHours() >= 0 && date.getHours() <= 6) ? "Добрая ночь" :
                    (date.getHours() <= 12) ? "Доброе утро" :
                    (date.getHours() <= 18) ? "Добрый день" :
                    "Добрый вечер";
weekday.textContent = `Сегодня: ${weekdays.get(date.getDay())}`;
time.textContent = `Текущее время: ${date.toLocaleTimeString("en")}`;
newYearTime.textContent = `До Нового года осталось: ${Math.ceil(Math.abs(date.getTime() - new Date(2020, 11, 31, 24).getTime()) / (1000 * 3600 * 24))} дней`;