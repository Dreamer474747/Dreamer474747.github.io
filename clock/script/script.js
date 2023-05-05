let $ = document
const hourHand = $.querySelector('.hour-hand')
const minuteHand = $.querySelector('.minute-hand')
const secondHand = $.querySelector('.second-hand')

window.addEventListener('load', myTime)

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

