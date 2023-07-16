const $ = document
const hamburgerMenuContainer = $.querySelector('.hamburger-menu-container')
const hamburgerMenu = $.querySelector('#hamburger-menu')
const sidebar = $.querySelector('.sidebar')
const sidebarOverlay = $.querySelector('.sidebar-overlay')
let isSidebarOpen = false
let sidebarItems = $.querySelectorAll('.sidebar-item')



sidebarOverlay.addEventListener('click', sidebarClose)

function sidebarClose() {
    document.querySelectorAll('.container').forEach(function (container) {
        container.style = `padding-right: auto;`
    })
    hamburgerMenuContainer.style.right = `1rem`
    sidebar.style.left = '-16rem'
    hamburgerMenu.classList.toggle('hamburger-menu--open')
    sidebarOverlay.style.display = 'none'
    $.body.style.maxHeight = 'auto'
    $.body.style.overflow = 'auto'
    isSidebarOpen = false
}

function sidebarOpen(scrollBarWidth) {
    document.querySelectorAll('.container').forEach(function (container) {
        container.style = `padding-right: ${2 + (scrollBarWidth / 16)}rem;`
    })
    hamburgerMenuContainer.style.right = `${1 + (scrollBarWidth / 16)}rem`
    sidebar.style.left = '0'
    hamburgerMenu.classList.toggle('hamburger-menu--open')
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



sidebarItems.forEach(function (item) {
    item.addEventListener('click', (e) => {
        sidebarItems.forEach(sidebarItem => {
            sidebarItem.classList.remove('text-primary')
        })
        e.target.classList.add('text-primary')

        sidebarClose()
    })
})










const swiper = new Swiper('.swiper', {
    slidesPerView: 1,
    spaceBetween: 40,
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










let basket = []
const basketIcon = $.querySelector('.basket-icon')
const products = $.querySelectorAll('.product')
let basketContainer = $.querySelector('.basket-container')
let purchasedProductList = $.querySelectorAll('.purchased-product-list')
let basketIsEmpty = $.querySelectorAll('.basket-is-empty')
let allProductPrice = $.querySelectorAll('.all-product-price')
let purchaseBtn = $.querySelectorAll('.purchase-btn')
let isBasketOpen = false
let addedProductDiv = $.querySelector('.product-added-div')
let count = 0
let counterFlag = false;




products.forEach(item => {
    item.addEventListener('click', e => {
        let name = e.target.getAttribute('data-name')
        let price = e.target.getAttribute('data-price')

        let matchedProduct = basket.find(prod => prod.name === name)

        if (matchedProduct) {
            increaseProductNumber(matchedProduct)
        } else {
            addProduct(name, price)
        }

        
    })
})

function increaseProductNumber(product) {
    if (product.number < 5) {
        product.number++;
        basketHandler()
        productIsAddedDiv(`you bought one more ${product.name}!`)
    } else {
        productIsAddedDiv(`you cant buy more ${product.name}!`)
    }
}


function addProduct(name, price) {
    let product = {
        id: basket.length + 1,
        name,
        price,
        number: 1
    }
    basket.push(product)
    basketHandler()
    productIsAddedDiv(`${name} added to the basket!`)
}



function productIsAddedDiv(sentence) {
    addedProductDiv.style.right = '0.75rem'
    addedProductDiv.innerHTML = sentence

        
    if (counterFlag) {
        count = 0
    } else {
        counterFlag = true;
        let counter = setInterval(() => {
            if (count === 1) {
                count = 0
                addedProductDiv.style.right = '-30rem'
                counterFlag = false
                clearInterval(counter)
            }
            count++;
        }, 2000);
    }
}



function basketHandler() {
    purchasedProductList.forEach(elem => {
        elem.innerHTML = ''
        basket.forEach(product => {
            elem.innerHTML += `
            <li class="purchased-product">
                <p>${product.name}</p>
                <p>${product.price}$</p>
                <div>
                    <img onclick="addProductHandler(event)" src="./svg-icons/add.svg">
                    <input value="${product.number}" disabled type="text">
                    <img onclick="subtractProductNumber(event)" src="./svg-icons/remove.svg">
                </div>
                <img onclick="productRemover(event)" src="./svg-icons/close.svg">
            </li>
            `
        })
        if (basket.length === 0) {
            basketIsEmpty.forEach(elem => {
                elem.classList.remove('hidden')
            })
        } else {
            basketIsEmpty.forEach(elem => {
                elem.classList.add('hidden')
            })
        }
        })

    allProductPrice.forEach(elem => {
        elem.innerHTML = `${sumOfAllPrices()} $`
    })

    
}



function sumOfAllPrices() {
    let sum = 0

    for (i = 0; i < basket.length; i++) {
        sum += (basket[i].price * basket[i].number)
    }

    return sum;
}



function addProductHandler(event) {
    let productName = event.target.parentNode.parentNode.firstElementChild.innerHTML
    let productIndex = basket.findIndex(prod => {
        return prod.name === productName
    })
    increaseProductNumber(basket[productIndex])
}



function subtractProductNumber(event) {
    let productName = event.target.parentNode.parentNode.firstElementChild.innerHTML
    let productIndex = basket.findIndex(prod => {
        return prod.name === productName
    })
    if (basket[productIndex].number === 1) {
        basket.splice(productIndex, 1)
    } else {
        basket[productIndex].number--;
    }
    basketHandler()
}



function productRemover(event) {
    let productName = event.target.parentNode.firstElementChild.innerHTML
    let productIndex = basket.findIndex(prod => {
        return prod.name === productName
    })
    basket.splice(productIndex, 1)
    basketHandler()
}



purchaseBtn.forEach(elem => {
    elem.addEventListener('click', () => {
        if (basket.length !== 0) {
            elem.classList.remove('bg-secondary', 'text-white', 'cursor-pointer')
            elem.innerHTML = 'Please Wait...'
            $.querySelectorAll('.purchased-product').forEach(product => {
                product.style.pointerEvents = 'none'
            })
            elem.style.cssText = `
            background-color: #aaa;
            color: #ddd;
            user-select: none;
            cursor: default;
            `
            
            setTimeout(() => {
                basket = []
                basketHandler()
                elem.classList.remove('bg-[#ddd]', 'text-[#aaa]')
                elem.innerHTML = 'Purchased!'
                elem.style.cssText = `
                background-color: rgb(22 101 52);
                color: white;
                cursor: default;
                `
            }, 1500)
            setTimeout(() => {
                elem.classList.add('bg-secondary', 'cursor-pointer')
                elem.classList.remove('bg-green-800', 'cursor-default', 'select-none')
                elem.innerHTML = 'Purchase All Products'
                $.querySelectorAll('.purchased-product').forEach(product => {
                    product.style.pointerEvents = 'auto'
                })
                elem.style.cssText = `
                background-color: #2f2105;
                color: white;
                cursor: pointer;
                `
            }, 3000)
        }
    })
})



basketIcon.addEventListener('click', () => {
    if (isBasketOpen) {
        basketContainer.style.left = '4rem'
        isBasketOpen = false
    } else {
        basketContainer.style.left = '-19rem'
        isBasketOpen = true
    }
})










let productNames = [
    "Hazelnut Latte",
    "Espresso",
    "Vanilla Latte",
    "Sandwich",
    "Hot Milk",
    "Coffe Ice Cream",
    "Cappucino",
    "Moccacinno",
    "Waffle Ice Cream"
]

let searchInput = $.querySelector('input')
let searchResults = $.querySelector('.search-result')
let searchOverlay = $.querySelector('.search-overlay')


searchInput.addEventListener('input', () => {
    let windowWidth = window.innerWidth
    
    searchResults.style.display = 'block'

    searchResults.innerHTML = ''
    
    if (windowWidth <= 900) {
        
        for (i = 2; i < (productNames.length); i++) {
            searchHandler(i)
        }
    } else if (windowWidth <= 1280) {
        for (i = 1; i < (productNames.length); i++) {
            searchHandler(i)
        }
    } else {
        
        for (i = 0; i < productNames.length; i++) {
            searchHandler(i)
        }
    }
    searchOverlay.style.display = 'block'

    if (searchResults.innerHTML === '') {
        searchResults.innerHTML = `
        <li class="mt-1 text-center select-none">no match...</li>
        `
    }
})


searchOverlay.addEventListener('click', () => {
    searchOverlay.style.display = 'none'
    searchResults.style.display = 'none'
})




function searchHandler(j) {
    if (productNames[j].toLowerCase().includes((searchInput.value).toLowerCase())) {
                
        searchResults.innerHTML += `
        <li class="mt-1 cursor-pointer">${productNames[j]}</li>
        `
    }
}


