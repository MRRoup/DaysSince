let targetDate;
let fDay = 3
let tDay = 6
let nColor = "#FF0000"
let mColor = "#FFFF00"
let oColor = "#00ff00"

loadTargetColor()

controlPanel.style.display = "none"
function convertTime(){
    let yearInput = document.getElementById('yearInput')
    let monthInput = document.getElementById('monthInput')   
    let dayInput = document.getElementById('dayInput')   
    let hourInput = document.getElementById('hourInput')   
    let minuteInput = document.getElementById('minuteInput')   
    if(yearInput.value != ''){
    const dateString = (yearInput.value+" "+monthInput.value+" "+dayInput.value+" "+hourInput.value+':'+minuteInput.value) //"2025 April 10 10:00";
    const date = new Date(dateString);
    const timestamp = date.getTime();
    targetDate = timestamp;
    localStorage.setItem("targetDate", targetDate); 
    }
}

counter.addEventListener('click',()=>{
    navigator.clipboard.writeText(days.innerHTML + " Days, "+hours.innerHTML+' Hours, '+minutes.innerHTML+' Minutes and '+seconds.innerHTML+' Seconds')
})

// Function to update the counter
function updateCounter() {
    if (targetDate) {
        const now = new Date().getTime();
        const distance = now - targetDate;

        // Calculate time components
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        // Display the result
        document.getElementById("days").innerText = days;
        document.getElementById("hours").innerText = hours;
        document.getElementById("minutes").innerText = minutes;
        document.getElementById("seconds").innerText = seconds;

        // Change the color of the counter based on the number of days
        const counterElement = document.getElementById("counter");
        const setTimeButton = document.getElementById("set-time-button");
        const setColorButton = document.getElementById("set-color-button");
        const setDateButton = document.getElementById("set-date-button");
        if (days >= 0 && days < fDay) {
            counterElement.style.color = nColor;
            setTimeButton.style.boxShadow = "0 0 30px "+nColor
            setColorButton.style.boxShadow = "0 0 30px "+nColor
            setDateButton.style.boxShadow = "0 0 30px "+nColor
        } else if (days >= fDay && days < tDay) {
            counterElement.style.color = mColor;
            setTimeButton.style.boxShadow = "0 0 30px "+mColor
            setColorButton.style.boxShadow = "0 0 30px "+mColor
            setDateButton.style.boxShadow = "0 0 30px "+mColor
        } else if (days >= tDay) {
            counterElement.style.color = oColor;
            setTimeButton.style.boxShadow = "0 0 30px "+oColor
            setColorButton.style.boxShadow = "0 0 30px "+oColor
            setDateButton.style.boxShadow = "0 0 30px "+oColor
        }
    }
}

let colorBtn = document.getElementById("set-color-button")
let timeBtn = document.getElementById("set-time-button")
let dateBtn = document.getElementById("set-date-button")


document.addEventListener('click',(e)=>{
    if (!controlPanel.contains(e.target) && controlPanel.style.display == 'flex' && !colorBtn.contains(e.target) && !timeBtn.contains(e.target) && !dateBtn.contains(e.target)) {
        container.style.filter = 'blur(0)'
        controlPanel.style.display = "none"
        color.style.display = "none"
        date.style.display = "none"
        fDay = fromSlider.value
        tDay = toSlider.value
        nColor = noNocolor.value
        mColor = shoudntcolor.value
        oColor = finishedcolor.value
        localStorage.setItem("fDay", fDay);
        localStorage.setItem("tDay", tDay);
        localStorage.setItem("nColor", nColor);
        localStorage.setItem("mColor", mColor);
        localStorage.setItem("oColor", oColor);
    }
})

// Load the target date from localStorage if it exists
function loadTargetDate() {
    const savedTime = localStorage.getItem("targetDate");
    if (savedTime) {
        targetDate = parseInt(savedTime, 10);
    }
}
function loadTargetColor() {
    fDay = localStorage.getItem("fDay");
    tDay = localStorage.getItem("tDay");
    nColor = localStorage.getItem("nColor");
    mColor = localStorage.getItem("mColor");
    oColor = localStorage.getItem("oColor");
}

// Set the target date to the current time when the button is pressed
document.getElementById("set-time-button").addEventListener("click", () => {
    targetDate = new Date().getTime();
    localStorage.setItem("targetDate", targetDate); // Save to localStorage
});
document.getElementById("set-color-button").addEventListener("click", () => {
    if (controlPanel.style.display == "none"){
        controlPanel.style.display = "flex"
        color.style.display = "flex"
        container.style.filter = 'blur(5px)'
        fromInput.value = fDay;
        toInput.value = tDay;
        fromSlider.value = fDay;
        toSlider.value = tDay;
        noNocolor.value = nColor;
        shoudntcolor.value = mColor;
        finishedcolor.value = oColor;
        firstDay.innerHTML = fDay
        secondDay.innerHTML = fDay
        thirdDay.innerHTML = tDay
        fourthDay.innerHTML = tDay
    }
});
document.getElementById("set-date-button").addEventListener("click", () => {
    if (controlPanel.style.display == "none"){
        controlPanel.style.display = "flex"
        date.style.display = "flex"
        container.style.filter = 'blur(5px)'
        fromInput.value = fDay;
        toInput.value = tDay;
        fromSlider.value = fDay;
        toSlider.value = tDay;
        noNocolor.value = nColor;
        shoudntcolor.value = mColor;
        finishedcolor.value = oColor;
        firstDay.innerHTML = fDay
        secondDay.innerHTML = fDay
        thirdDay.innerHTML = tDay
        fourthDay.innerHTML = tDay
    }
    
});

// Load the target date when the page loads
loadTargetDate();


// Update the counter every second
setInterval(updateCounter, 1000);



/*         Stolen dual Slider Code  */
function controlFromInput(fromSlider, fromInput, toInput, controlSlider) {
    const [from, to] = getParsed(fromInput, toInput);
    fillSlider(fromInput, toInput, '#C6C6C6', '#25daa5', controlSlider);
    if (from > to) {
        fromSlider.value = to;
        fromInput.value = to;
    } else {
        fromSlider.value = from;
    }
}
    
function controlToInput(toSlider, fromInput, toInput, controlSlider) {
    const [from, to] = getParsed(fromInput, toInput);
    fillSlider(fromInput, toInput, '#C6C6C6', '#25daa5', controlSlider);
    setToggleAccessible(toInput);
    if (from <= to) {
        toSlider.value = to;
        toInput.value = to;
    } else {
        toInput.value = from;
    }
}

function controlFromSlider(fromSlider, toSlider, fromInput) {
  const [from, to] = getParsed(fromSlider, toSlider);
  fillSlider(fromSlider, toSlider, '#C6C6C6', '#25daa5', toSlider);
  firstDay.innerHTML = fromSlider.value
  secondDay.innerHTML = fromSlider.value
  if (from > to) {
    fromSlider.value = to;
    fromInput.value = to;
  } else {
    fromInput.value = from;
  }
}

function controlToSlider(fromSlider, toSlider, toInput) {
  const [from, to] = getParsed(fromSlider, toSlider);
  fillSlider(fromSlider, toSlider, '#C6C6C6', '#25daa5', toSlider);
  setToggleAccessible(toSlider);
  thirdDay.innerHTML = toSlider.value
  fourthDay.innerHTML = toSlider.value
  if (from <= to) {
    toSlider.value = to;
    toInput.value = to;
  } else {
    toInput.value = from;
    toSlider.value = from;
  }
}

function getParsed(currentFrom, currentTo) {
  const from = parseInt(currentFrom.value, 10);
  const to = parseInt(currentTo.value, 10);
  return [from, to];
}

function fillSlider(from, to, sliderColor, rangeColor, controlSlider) {
    const rangeDistance = to.max-to.min;
    const fromPosition = from.value - to.min;
    const toPosition = to.value - to.min;
    controlSlider.style.background = `linear-gradient(
      to right,
      ${sliderColor} 0%,
      ${sliderColor} ${(fromPosition)/(rangeDistance)*100}%,
      ${rangeColor} ${((fromPosition)/(rangeDistance))*100}%,
      ${rangeColor} ${(toPosition)/(rangeDistance)*100}%, 
      ${sliderColor} ${(toPosition)/(rangeDistance)*100}%, 
      ${sliderColor} 100%)`;
}

function setToggleAccessible(currentTarget) {
  const toSlider = document.querySelector('#toSlider');
  if (Number(currentTarget.value) <= 0 ) {
    toSlider.style.zIndex = 2;
  } else {
    toSlider.style.zIndex = 0;
  }
}

const fromSlider = document.querySelector('#fromSlider');
const toSlider = document.querySelector('#toSlider');
const fromInput = document.querySelector('#fromInput');
const toInput = document.querySelector('#toInput');
fillSlider(fromSlider, toSlider, '#C6C6C6', '#25daa5', toSlider);
setToggleAccessible(toSlider);

fromSlider.oninput = () => controlFromSlider(fromSlider, toSlider, fromInput);
toSlider.oninput = () => controlToSlider(fromSlider, toSlider, toInput);
fromInput.oninput = () => controlFromInput(fromSlider, fromInput, toInput, toSlider);
toInput.oninput = () => controlToInput(toSlider, fromInput, toInput, toSlider);
/*End of Stolen Code */
