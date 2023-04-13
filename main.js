let carArray = [];

fetch('cars.json')
  .then(response => response.json())
  .then(data => {
    carArray = data.cars;

    //car carousel
    const changeCars = setInterval(() => {
      carImg.style.opacity = 0;
      const fadeIn = setInterval(function() {
        carImg.style.opacity = Number(carImg.style.opacity) + 0.05;
        if (carImg.style.opacity >= 1) {
          clearInterval(fadeIn);
        }
      }, 50);
      

      //initial car
      carImg.src = `img/cars/${carArray[carIndex%carArray.length].img}`;
      carName.textContent = carArray[carIndex%carArray.length].model;
      carIndex++;
    }, 7000)


    //set car name and car stats
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
    
    let selectedCar = 3;
    cartBtn.addEventListener("click", () => {

      const valueFrom = dateFrom.value;
      const valueTo = dateTo.value;

      const DateFrom = new Date(valueFrom)
      const DateTo = new Date(valueTo)

      const formatedDateFrom = `${DateFrom.getDate()}-${DateFrom.getMonth()}-${DateFrom.getFullYear()}`;
      const formatedDateTo = `${DateTo.getDate()}-${DateTo.getMonth()}-${DateTo.getFullYear()}`;

      const activeCar = document.querySelector(".rentListNames .active")
      
      //check if date is valid
      if(DateFrom > DateTo || DateFrom > today || isNaN(DateFrom) || isNaN(DateTo))
      {
        cartBtn.textContent = "Wrong date"
        cartBtn.classList.add("warning")
        daysReserved = 0;
        setTimeout(() => {
          cartBtn.textContent = "Reserve now"
          cartBtn.classList.remove("warning")
        }, 3000)
      }
      else
      {
        //set days count
        const timeReserved = DateTo - DateFrom + 1;
        daysReserved = Math.ceil(timeReserved / 86400000)

        //set modal values
        pickUpDate.textContent = formatedDateFrom;
        dropOffDate.textContent = formatedDateTo;
        totalPrice.textContent = `${Number(daysReserved) * Number(carArray[activeCar.dataset.id - 1].price)}pln`;
        modalImg.src = `img/cars/${activeCar.textContent}.webp`;
        modalCarName.textContent = `CAR - ${activeCar.textContent}`

        //open modal
        modal.style.display = "block"
      }
      console.log()
    })    

    })
  .catch(error => console.error(error));

const pickUpDate = document.querySelector("#pickUpDate")
const dropOffDate = document.querySelector("#dropOffDate")
const totalPrice = document.querySelector("#price")
const modalImg = document.querySelector(".modalCarImg img")
const modalCarName = document.querySelector(".modalCarImg h2")

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

const closeBtn = document.querySelector(".closeBtn")

//get days count for rent
const dateFrom = document.querySelector("#dateFrom")
const dateTo = document.querySelector("#dateTo")
const cartBtn = document.querySelector(".addToCartBtn")
let daysReserved = 0;

//set input date to today
let today = new Date().toISOString().substr(0, 10);
dateFrom.value = today

const modal = document.querySelector(".modal")
const sumbitBtn = document.querySelector("#submitBtn")

//close modal
const closeModal = document.querySelector(".modalTitle i")

sumbitBtn.addEventListener("click", () => {
  modal.style.display = "none";
})

closeModal.addEventListener("click", () => {
  modal.style.display = "none";
})

window.onclick = (e) => {
  if (e.target == modal) {
    modal.style.display = "none";
  }
}


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

// Get all the menu items
const menuItems = document.querySelectorAll('.menu a, .navItem a');

// Add click event listeners to each menu item
menuItems.forEach(item => {
  item.addEventListener('click', e => {
    // Prevent default link behavior
    e.preventDefault();

    // Get the target section ID from the href attribute
    const targetId = item.getAttribute('href');

    // Get the target section element
    const targetSection = document.querySelector(targetId);

    // Calculate the position to scroll to
    const position = targetSection.getBoundingClientRect().top + window.pageYOffset - 100;

    // Scroll to the target position
    window.scrollTo({
      top: position,
      behavior: 'smooth'
    });
  });
});
