const $ = document
const hamburgerMenuContainer = $.querySelector('.hamburger-menu-container')
const hamburgerMenu = $.querySelector('#hamburger-menu')
const sidebar = $.querySelector('.sidebar')
const sidebarOverlay = $.querySelector('.sidebar-overlay')
let isSidebarOpen = false


sidebarOverlay.addEventListener('click', sidebarClose)

function sidebarClose() {
    sidebar.style.left = '-12rem'
    hamburgerMenu.classList.toggle('hamburger-menu--open')
    console.log('close');
    sidebarOverlay.style.display = 'none'
    $.body.style.maxHeight = 'auto'
    $.body.style.overflow = 'auto'
    isSidebarOpen = false
}

function sidebarOpen() {
    sidebar.style.left = '0'
    hamburgerMenu.classList.toggle('hamburger-menu--open')
    console.log('open');
    sidebarOverlay.style.display = 'block'
    $.body.style.maxHeight = '100%'
    $.body.style.overflow = 'hidden'
    isSidebarOpen = true
}

hamburgerMenuContainer.addEventListener('click', function () {
    let scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;
    if (isSidebarOpen) {
        document.querySelector('.container').style = `padding-right: auto;`
        sidebarClose()
    } else {
        document.querySelector('.container').style = `padding-right: ${2 + (scrollBarWidth / 16)}rem;`
        sidebarOpen()
    }
})







const swiper = new Swiper('.swiper', {
    slidesPerView: 1,
    spaceBetween: 20,
    breakpoints: {
        // when window width is >= 768px
        768: {
            slidesPerView: 2,
            spaceBetween: 50
        },
        992: {
            slidesPerView: 3,
            spaceBetween: 10
        }
    },
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
});












