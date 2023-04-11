let carArray = [];

fetch('cars.json')
  .then(response => response.json())
  .then(data => {
    carArray = data.cars;

    const changeCars = setInterval(() => {
      carImg.style.opacity = 0;
      const fadeIn = setInterval(function() {
        carImg.style.opacity = Number(carImg.style.opacity) + 0.05;
        if (carImg.style.opacity >= 1) {
          clearInterval(fadeIn);
        }
      }, 50);
      
      carImg.src = `img/cars/${carArray[carIndex%carArray.length].img}`;
      carName.textContent = carArray[carIndex%carArray.length].model;
      carIndex++;
    }, 7000)


    rentCarNames.forEach((rentCarName) => {
      rentCarName.textContent = carArray[carNameIndex].model;
      const carId = carArray[carNameIndex].id - 1;

      rentCarName.addEventListener("click", () =>{
        mark.textContent = carArray[carId].mark;
        model.textContent = carArray[carId].model;
        seatCount.textContent = carArray[carId].seatCount;
        engine.textContent = carArray[carId].engine + "hp";
        fuel.textContent = carArray[carId].fuel;
        price.textContent = carArray[carId].price + "pln/day";
        rentCarImg.src = `img/cars/${carArray[carId].img}`;
        
        rentCarNames.forEach((carName) => {
          carName.classList.remove("active")
          carName.classList.remove("selectedCar")
        })
        rentCarName.classList.add("active")
        rentCarName.classList.add("selectedCar")
      })
      carNameIndex++
    })

    cartBtn.addEventListener("click", () => {
      vehicle.textContent = model.textContent
      totalPrice.textContent = Number(price.textContent.slice(0,-7)) * daysReserved + "pln"

      cartMenuBig.classList.add("itemInCart")
    })

    })
  .catch(error => console.error(error));

const carImg = document.querySelector("#carImg");
const carName = document.querySelector(".carName");
let carIndex = 0;

const rentCarNames = document.querySelectorAll(".rentCarName")
const rentCarStats = document.querySelectorAll(".rentCarStat")
let carNameIndex = 0;

const mark = document.querySelector(".mark span")
const model = document.querySelector(".model span")
const seatCount = document.querySelector(".seatCount span")
const engine = document.querySelector(".engine span")
const fuel = document.querySelector(".fuel span")
const price = document.querySelector(".price span")
const rentCarImg = document.querySelector(".rentCar img")
let carStatIndex = 0;

const totalPrice = document.querySelector(".total")
const vehicle = document.querySelector(".vehicle")

const hamburgerMenu = document.querySelector(".hamburgerMenu")
const asideMenu = document.querySelector("aside .menu")

hamburgerMenu.addEventListener("click", () => {
  asideMenu.classList.toggle("active");
  setTimeout(() => {
    if(asideMenu.classList.contains("active"))
    {
      hamburgerMenu.src = "img/icons/x-solid.svg";
    }
    else
    {
      hamburgerMenu.src = "img/icons/bars-solid.svg";
    }
  },100)
})

const cartMenuSmall = document.querySelector(".cartIconSmall")
const cartMenuBig = document.querySelector(".cartIconBig")
const asideCart = document.querySelector("aside .cart")

cartMenuSmall.addEventListener("click", () => {
  asideCart.style.width = "100%";
  asideCart.classList.add("active");
  hamburgerMenu.classList.add("hidden")
  cartMenuSmall.classList.add("hidden")
})

cartMenuBig.addEventListener("click", () => {
  asideCart.style.width = "40%";
  asideCart.parentElement.style.display = "block";
  asideCart.classList.add("active");
  hamburgerMenu.classList.add("hidden")
  cartMenuSmall.classList.add("hidden")
})

const closeBtn = document.querySelector(".closeBtn")

closeBtn.addEventListener("click", () => {
  asideCart.classList.remove("active");
  if(window.screen.width > 900)
  {
    asideCart.parentElement.style.display = "none";
  }
  hamburgerMenu.classList.remove("hidden")
  cartMenuSmall.classList.remove("hidden")
})

const dateFrom = document.querySelector("#dateFrom")
const dateTo = document.querySelector("#dateTo")
const cartBtn = document.querySelector(".addToCartBtn")

let daysReserved = 0;

cartBtn.addEventListener("click", () => {
  const valueFrom = dateFrom.value;
  const valueTo = dateTo.value;

  const DateFrom = new Date(valueFrom)
  const DateTo = new Date(valueTo)

  if(DateFrom > DateTo)
  {
    cartBtn.textContent = "Wrong date"
    cartBtn.classList.add("warning")
    daysReserved = 0;
    setTimeout(() => {
      cartBtn.textContent = "Add to cart"
      cartBtn.classList.remove("warning")
    }, 3000)
  } else
  {
    const timeReserved = DateTo - DateFrom + 1;
    daysReserved = Math.ceil(timeReserved / 86400000)
  }
})

//FAQ 
const accordionContent = document.querySelectorAll(".accordionContent");

accordionContent.forEach((item, index) => {
    let title = item.querySelector(".accordionTitle");
    title.addEventListener("click", () =>{
        item.classList.toggle("open");

        let description = item.querySelector(".description");
        if(item.classList.contains("open")){
            description.style.height = `${description.scrollHeight}px`;
            item.querySelector("i").classList.replace("fa-plus", "fa-minus");
        }else{
            description.style.height = "0px";
            item.querySelector("i").classList.replace("fa-minus", "fa-plus");
        }
        removeOpen(index);
    })
})

function removeOpen(index1){
    accordionContent.forEach((item2, index2) => {
        if(index1 != index2){
            item2.classList.remove("open");

            let des = item2.querySelector(".description");
            des.style.height = "0px";
            item2.querySelector("i").classList.replace("fa-minus", "fa-plus");
        }
    })
}