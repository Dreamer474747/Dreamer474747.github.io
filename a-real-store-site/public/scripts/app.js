const $ = document
const hamburgerMenuContainer = $.querySelector('.hamburger-menu-container')
const hamburgerMenu = $.querySelector('#hamburger-menu')
const sidebar = $.querySelector('.sidebar')
const sidebarOverlay = $.querySelector('.sidebar-overlay')
let isSidebarOpen = false
let sidebarItems = $.querySelectorAll('.sidebar-item')



sidebarOverlay.addEventListener('click', sidebarClose)

function sidebarClose() {
    document.querySelectorAll('.container').forEach(function(container) {
        container.style = `padding-right: auto;`
    })
    hamburgerMenuContainer.style.right = `1rem`
    sidebar.style.left = '-12rem'
    hamburgerMenu.classList.toggle('hamburger-menu--open')
    console.log('close');
    sidebarOverlay.style.display = 'none'
    $.body.style.maxHeight = 'auto'
    $.body.style.overflow = 'auto'
    isSidebarOpen = false
}

function sidebarOpen(scrollBarWidth) {
    document.querySelectorAll('.container').forEach(function(container) {
        container.style = `padding-right: ${2 + (scrollBarWidth / 16)}rem;`
    })
    hamburgerMenuContainer.style.right = `${1 + (scrollBarWidth / 16)}rem`
    sidebar.style.left = '0'
    hamburgerMenu.classList.toggle('hamburger-menu--open')
    console.log('open');
    sidebarOverlay.style.display = 'block'
    $.body.style.maxHeight = '100%'
    $.body.style.overflow = 'hidden'
    isSidebarOpen = true
}

hamburgerMenu.addEventListener('click', function () {
    let scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;
    if (isSidebarOpen) {
        sidebarClose()
    } else {
        sidebarOpen(scrollBarWidth)
    }
})



sidebarItems.forEach(function(item) {
    item.addEventListener('click', (e) => {
        sidebarItems.forEach(sidebarItem => {
            sidebarItem.classList.remove('text-primary')
            console.log('1');
        })
        console.log('2');
        e.target.classList.add('text-primary')

        sidebarClose()
    })
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












