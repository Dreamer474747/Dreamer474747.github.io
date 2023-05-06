let $ = document
const hourHand = $.querySelector('.hour-hand')
const minuteHand = $.querySelector('.minute-hand')
const secondHand = $.querySelector('.second-hand')
const dateElem = $.querySelector('.date')
let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];        
let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
let time = new Date()
let dayOfTheMonth = time.getDate()
let dayOfTheWeek = time.getDay()
let monthOfTheYear = time.getMonth()
let year = time.getFullYear()
let howMuchTimeLeft = $.querySelector('.how-much-time-left')
let howMuchTimeLeftDescription = $.querySelector('.how-much-time-left-description')


window.addEventListener('load', myTime)
window.addEventListener('load', howMuchTimeLeftHandler)


function myTime() {
    let time = new Date()
    let hour = time.getHours()
    let minute = time.getMinutes()
    let second = time.getSeconds()
    let milliSecond = time.getMilliseconds()

    hourHand.style.transform = `rotate(${((hour + (minute / 60)) * 30)}deg)`
    minuteHand.style.transform = `rotate(${((minute + (second / 60)) * 6)}deg)`
    secondHand.style.transform = `rotate(${((second + (milliSecond / 1000)) * 6)}deg)`

}

setInterval(myTime, 1);



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
	let time = new Date()
    let hour = time.getHours()
    let minute = time.getMinutes()
    let second = time.getSeconds()
	
	let timeLeft = (((hour * 60 * 60) + (minute * 60) + second) / 86400)
	let timeLeftPercent = (timeLeft * 100).toFixed(1)
	howMuchTimeLeft.style.width = `${100 - timeLeftPercent}%`
	
	howMuchTimeLeftDescription.innerHTML = `${100 - timeLeftPercent} percent of today is left.`
}

setInterval(howMuchTimeLeftHandler, 86000)





















