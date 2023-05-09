let $ = document
const hourHand = $.querySelector('.hour-hand')
const minuteHand = $.querySelector('.minute-hand')
const secondHand = $.querySelector('.second-hand')
const dateElem = $.querySelector('.date')
let howMuchTimeLeftDiv = $.querySelector('.how-much-time-left')
let howMuchTimeLeftDescription = $.querySelector('.how-much-time-left-description')
let showTime = $.querySelector('.show-time')
let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
let time;
let hour;
let minute;
let second;
let milliSecond;
let dayOfTheMonth;
let dayOfTheWeek;
let monthOfTheYear;
let year;


window.addEventListener('load', myTime)
window.addEventListener('load', howMuchTimeLeftHandler)
window.addEventListener('load', showTimeHandler)


function theExactTime() {
	time = new Date()
	hour = time.getHours()
	minute = time.getMinutes()
	second = time.getSeconds()
	milliSecond = time.getMilliseconds()
	dayOfTheMonth = time.getDate()
	dayOfTheWeek = time.getDay()
	monthOfTheYear = time.getMonth()
	year = time.getFullYear()
}


function myTime() {
	theExactTime()

	hourHand.style.transform = `rotate(${((hour + (minute / 60)) * 30)}deg)`
	minuteHand.style.transform = `rotate(${((minute + (second / 60)) * 6)}deg)`
	secondHand.style.transform = `rotate(${((second + (milliSecond / 1000)) * 6)}deg)`

}


theExactTime()
dateElem.innerHTML = `${months[monthOfTheYear]} ${dayOfTheMonth + suffixOfTheDay()}, ${year} (${days[dayOfTheWeek]})`

function suffixOfTheDay() {
	if (dayOfTheMonth === 1 || dayOfTheMonth === 21 || dayOfTheMonth === 31) {
		return 'st'
	} else if (dayOfTheMonth === 2 || dayOfTheMonth === 22) {
		return 'nd'
	} else if (dayOfTheMonth === 3 || dayOfTheMonth === 23) {
		return 'rd'
	} else {
		return 'th'
	}
}


function howMuchTimeLeftHandler() {
	theExactTime()

	let timeLeft = (((hour * 60 * 60) + (minute * 60) + second) / 86400)
	let timeLeftPercent = (timeLeft * 100).toFixed(1)

	howMuchTimeLeftDiv.style.width = `${100 - timeLeftPercent}%`

	if (timeLeftPercent - Math.floor(timeLeftPercent) === 0) {
		howMuchTimeLeftDescription.innerHTML = `${100 - timeLeftPercent}% of the day is still remaining.`
	} else {		
		howMuchTimeLeftDescription.innerHTML = `${(100 - timeLeftPercent).toFixed(1)}% of the day is still remaining.`
	}
}


function showTimeHandler() {
	theExactTime()
	
	showTime.innerHTML = `${hour}:${minute}`
}



setInterval(myTime, 10);
setInterval(howMuchTimeLeftHandler, 86000)
setInterval(showTimeHandler, 1000)