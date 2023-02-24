const $ = document
const sliderButtons = $.querySelectorAll('.slider__btn')
const nextBtn = $.querySelector('.slider__next-btn')
const prevBtn = $.querySelector('.slider__prev-btn')
let sliderCurrentNumber = $.querySelector('.slider__current-number')
let sliderCurrentNum = 1 
let navLinks = $.querySelectorAll('.nav__link')
let sideBar = $.querySelector('.mobile-nav-wrapper')
let navBtnWrapper = $.querySelector('.nav-btn-wrapper')
let navBtnOpen = false
let sideBarCloseElem = $.querySelector('.nav-btn-wrapper__close')
let introductionNumbers = $.querySelectorAll('.introduction-info__number')
let foscariniSvg = $.querySelector('#brands__foscarini-svg')
let flosSvg = $.querySelector('#brands__flos-svg')
let prachtSvg = $.querySelector('#brands__pracht-svg')
let boschSvg = $.querySelector('#brands__bosch-svg')
let fourBrands = $.querySelectorAll('.brands__brand--four-brand')
let imgWrapper = $.querySelector('.brands__img-wrapper')
let socialLogos = $.querySelectorAll('.footer-left__social-logo')
let footerLinks = $.querySelectorAll('.footer-right__link')







function nextBtnHandler() {
    sliderButtons.forEach(function(btn) {
        btn.classList.remove('slider--clicked-btn')
    })
    nextBtn.classList.add('slider--clicked-btn')
    

    if (sliderCurrentNum > 4) {
        sliderCurrentNum = 0
    }
    
    sliderCurrentNum++
    sliderCurrentNumber.innerHTML = sliderCurrentNum
}


function prevBtnHandler() {
    sliderButtons.forEach(function(btn) {
        btn.classList.remove('slider--clicked-btn')
    })
    prevBtn.classList.add('slider--clicked-btn')

    if (sliderCurrentNum < 2) {
        sliderCurrentNum = 6
    }
    
    sliderCurrentNum--
    sliderCurrentNumber.innerHTML = sliderCurrentNum
}

nextBtn.addEventListener('click', nextBtnHandler)
prevBtn.addEventListener('click', prevBtnHandler)


navLinks.forEach(function(navLink) {
    navLink.addEventListener('click', function(event) {
        navLinks.forEach(function(navBtn) {
            navBtn.classList.remove('nav__link--selected')
        })
        event.target.classList.add('nav__link--selected')
    })
})

function sideBarCloser() {
    sideBar.style.left = '-24.2rem'
    navBtnWrapper.classList.remove('nav-btn-wrapper--open')
    $.body.style.maxHeight = 'auto'
    $.body.style.overflow = 'auto'
    sideBarCloseElem.style.display = 'none'
    $.body.classList.remove('body-nav-open')
    navBtnOpen = false
}

function sideBarOpener() {
    sideBar.style.left = '0'
    navBtnWrapper.classList.add('nav-btn-wrapper--open')
    $.body.style.maxHeight = '100%'
    $.body.style.overflow = 'hidden'
    sideBarCloseElem.style.display = 'block'
    $.body.classList.add('body-nav-open')
    navBtnOpen = true
}

function navBtnHandler() {
    if (navBtnOpen) {
        sideBarCloser()
    } else {
        sideBarOpener()
    }
}

introductionNumbers.forEach(function(num) {
    num.addEventListener('click', function(event) {
        introductionNumbers.forEach(function(number) {
            number.classList.remove('introduction-info__number--selected')
        })
        event.target.classList.add('introduction-info__number--selected')
    })
})

fourBrands.forEach(function(brand) {
    brand.addEventListener('click', function(event) {
        fourBrands.forEach(function(item) {
            item.classList.remove('brands__brand--active')
        })
        event.target.classList.add('brands__brand--active')
    })
})

foscariniSvg.parentElement.addEventListener('click', function() {
    imgWrapper.children[1].className = 'brands__arrow-top'
})

flosSvg.parentElement.addEventListener('click', function() {
    imgWrapper.children[1].className = 'brands__arrow-left'
})

prachtSvg.parentElement.addEventListener('click', function() {
    imgWrapper.children[1].className = 'brands__arrow-right'
})

boschSvg.parentElement.addEventListener('click', function() {
    imgWrapper.children[1].className = 'brands__arrow-bottom'
})


socialLogos.forEach(function(logo) {
    logo.addEventListener('click', function() {
        socialLogos.forEach(function(socialLogo) {
            socialLogo.children[0].style.fill = '#000'
        })
        logo.children[0].style.fill = 'var(--primary-color)'
    })
})


footerLinks.forEach(function(footerLink) {
    footerLink.addEventListener('click', function() {
        footerLinks.forEach(function(link) {
            link.classList.remove('footer-right__link--active')
        })
        footerLink.classList.add('footer-right__link--active')
    })
})



navBtnWrapper.addEventListener('click', navBtnHandler)
sideBarCloseElem.addEventListener('click', sideBarCloser)