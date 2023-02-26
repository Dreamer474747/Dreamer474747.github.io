const $ = document
const bodyElem = $.querySelector('body')
const navBtn = $.querySelector('.nav__btn-wrapper')
const sideBar = $.querySelector('.mobile-nav-wrapper')
const removalElem = $.querySelector('.mobile-nav-wrapper__removal')
let nextBtnElem = $.querySelector('.header-content__next-btn-wrapper')
let prevBtnElem = $.querySelector('.header-content__prev-btn-wrapper')
let headerNumbers = $.querySelectorAll('.header-content__number')
let isNavOpen = false
let headerNumbersIndex = 0
const adviceNextBtn = $.querySelector('.advice__button-next')
const advicePrevBtn = $.querySelector('.advice__button-prev')
let adviceNumbers = $.querySelectorAll('.advice__number')
let adviceNumbersIndex = 0



navBtn.addEventListener('click', function() {
    if (isNavOpen) {
        sideBar.style.left = '-22rem'
        navBtn.classList.remove('nav__btn-wrapper--open')
        bodyElem.classList.remove('body--nav-open')
        removalElem.style.display = 'none'
        isNavOpen = false
    } else{
        sideBar.style.left = '0'
        navBtn.classList.add('nav__btn-wrapper--open')
        bodyElem.classList.add('body--nav-open')
        removalElem.style.display = 'block'
        isNavOpen = true
    }
    
})

removalElem.addEventListener('click', function() {
    sideBar.style.left = '-22rem'
    navBtn.classList.remove('nav__btn-wrapper--open')
    bodyElem.classList.remove('body--nav-open')
    removalElem.style.display = 'none'
    isNavOpen = false
})


headerNumbers.forEach(function(number) {
    number.addEventListener('click', function(event) {
        headerNumbersIndex = event.target.id
        headerNumbers.forEach(function(num) {
            if (num.classList.contains('header-content__number--selected')) {
                num.classList.remove('header-content__number--selected')
            }
        })
        event.target.classList.add('header-content__number--selected')
        // console.log(event.target.id)
    })
})

nextBtnElem.addEventListener('click', function() {
    headerNumbersIndex++
    if (headerNumbersIndex > headerNumbers.length - 1) {
        headerNumbersIndex = 0
    }
    headerNumbers.forEach(function(num) {
        if (num.classList.contains('header-content__number--selected')) {
            num.classList.remove('header-content__number--selected')
        }
    })
    headerNumbers[headerNumbersIndex].classList.add('header-content__number--selected')
    
})


prevBtnElem.addEventListener('click', function() {
    headerNumbersIndex--
    if (headerNumbersIndex < 0) {
        headerNumbersIndex = headerNumbers.length - 1
    }
    headerNumbers.forEach(function(num) {
        if (num.classList.contains('header-content__number--selected')) {
            num.classList.remove('header-content__number--selected')
        }
    })
    headerNumbers[headerNumbersIndex].classList.add('header-content__number--selected')
})

adviceNumbers.forEach(function(adviceNumber) {
    adviceNumber.addEventListener('click', function(event) {
        adviceNumbersIndex = event.target.id
        adviceNumbers.forEach(function(adviceNum) {
            if (adviceNum.classList.contains('advice__number--selected')) {
                adviceNum.classList.remove('advice__number--selected')
            }
        })
        event.target.classList.add('advice__number--selected')
    })
})

adviceNextBtn.addEventListener('click', function() {
    adviceNumbersIndex++
    if (adviceNumbersIndex > adviceNumbers.length - 1) {
        adviceNumbersIndex = 0
    }
    adviceNumbers.forEach(function(adviceNum) {
        if (adviceNum.classList.contains('advice__number--selected')) {
            adviceNum.classList.remove('advice__number--selected')
        }
    })
    adviceNumbers[adviceNumbersIndex].classList.add('advice__number--selected')
})

advicePrevBtn.addEventListener('click', function() {
    adviceNumbersIndex--
    if (adviceNumbersIndex < 0) {
        adviceNumbersIndex = adviceNumbers.length - 1
    }
    adviceNumbers.forEach(function(adviceNum) {
        if (adviceNum.classList.contains('advice__number--selected')) {
            adviceNum.classList.remove('advice__number--selected')
        }
    })
    adviceNumbers[adviceNumbersIndex].classList.add('advice__number--selected')
})
