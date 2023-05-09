const $ = document;
const hourHand = $.querySelector('.hour-hand');
const minuteHand = $.querySelector('.minute-hand');
const secondHand = $.querySelector('.second-hand');
const dateElem = $.querySelector('.date');
const howMuchTimeLeftDiv = $.querySelector('.how-much-time-left');
const howMuchTimeLeftDescription = $.querySelector('.how-much-time-left-description');
const showTime = $.querySelector('.show-time');
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

let time, hour, minute, second, milliSecond, dayOfTheMonth, dayOfTheWeek, monthOfTheYear, year;

window.addEventListener('load', () => {
	howMuchTimeLeftHandler()
	showTimeHandler()
	
    setInterval(myTime, 10);
    setInterval(howMuchTimeLeftHandler, 86000);
    setInterval(showTimeHandler, 1000);
	
    myTime();
    dateElem.innerHTML = `${months[monthOfTheYear]} ${dayOfTheMonth}${suffixOfTheDay()}, ${year} (${days[dayOfTheWeek]})`;
});

function theExactTime() {
    time = new Date();
    hour = time.getHours();
    minute = time.getMinutes();
    second = time.getSeconds();
    milliSecond = time.getMilliseconds();
    dayOfTheMonth = time.getDate();
    dayOfTheWeek = time.getDay();
    monthOfTheYear = time.getMonth();
    year = time.getFullYear();
}

function myTime() {
    theExactTime();

    hourHand.style.transform = `rotate(${((hour + (minute / 60)) * 30)}deg)`;
    minuteHand.style.transform = `rotate(${((minute + (second / 60)) * 6)}deg)`;
    secondHand.style.transform = `rotate(${((second + (milliSecond / 1000)) * 6)}deg)`;
}

function suffixOfTheDay() {
    if (dayOfTheMonth === 1 || dayOfTheMonth === 21 || dayOfTheMonth === 31) {
        return 'st';
    } else if (dayOfTheMonth === 2 || dayOfTheMonth === 22) {
        return 'nd';
    } else if (dayOfTheMonth === 3 || dayOfTheMonth === 23) {
        return 'rd';
    } else {
        return 'th';
    }
}

function howMuchTimeLeftHandler() {
    theExactTime();

    const timeLeft = (((hour * 60 * 60) + (minute * 60) + second) / 86400);
    const timeLeftPercent = (timeLeft * 100).toFixed(1);

    howMuchTimeLeftDiv.style.width = `${100 - timeLeftPercent}%`;

    if (timeLeftPercent - Math.floor(timeLeftPercent) === 0) {
        howMuchTimeLeftDescription.innerHTML = `${100 - timeLeftPercent}% of the day is still remaining.`;
    } else {        
        howMuchTimeLeftDescription.innerHTML = `${(100 - timeLeftPercent).toFixed(1)}% of the day is still remaining.`;
    }
}

function showTimeHandler() {
    theExactTime();
    showTime.innerHTML = `${hour}:${minute}`;
}
