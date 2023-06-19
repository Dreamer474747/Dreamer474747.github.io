const $ = document
// 
const hamburgerMenuContainer = $.querySelector('.hamburger-menu-container')
const hamburgerMenu = $.querySelector('#hamburger-menu')
const sidebar = $.querySelector('.sidebar')
const sidebarOverlay = $.querySelector('.sidebar-overlay')
let isSidebarOpen = false


sidebarOverlay.addEventListener('click', sidebarClose)

function sidebarClose() {
    sidebar.style.left = '-12rem'
    hamburgerMenu.classList.toggle('hamburger-menu--open')
    sidebarOverlay.style.display = 'none'
    $.body.style.maxHeight = 'auto'
    $.body.style.overflow = 'auto'
    isSidebarOpen = false
}

function sidebarOpen() {
    sidebar.style.left = '0'
    hamburgerMenu.classList.toggle('hamburger-menu--open')
    sidebarOverlay.style.display = 'block'
    $.body.style.maxHeight = '100%'
    $.body.style.overflow = 'hidden'
    isSidebarOpen = true
}

hamburgerMenuContainer.addEventListener('click', function() {
    if (isSidebarOpen) {
        sidebarClose()
    } else {
        sidebarOpen()
    }
})


