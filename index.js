
let homeTotal = 0
let guestTotal = 0
let currentTime = 900 // default countdown time
let speed = 500
let scrollTimer;
let cdInterval
let textInput;
let isClockRunning = false
const textEnd = ' ' // added to the end of a scrolling text string as a break
const scores = document.querySelector(".scores")
const homeScore = document.querySelector(".home--score")
const guestScore = document.querySelector(".guest--score")

// timer //

function setClock(secs) {
    clearInterval(cdInterval)
    let minutes = Math.floor(secs/60)
    let seconds = secs % 60
        document.querySelector("#clock--time").textContent = minutes.toString().padStart(2, '0') + 
        ':' + seconds.toString().padStart(2, '0')
}

function displayTime(secs) {
    let minutes = Math.floor(secs/60)
    let seconds = secs % 60
    document.querySelector("#clock--time").textContent = minutes.toString().padStart(2, '0') + 
        ':' + seconds.toString().padStart(2, '0')
}

function countdown () {
    cdInterval = setInterval(() => {
        if(currentTime === 0){
            clearInterval(cdInterval)
            setClock(0)
        } else {
            currentTime -= 1,
            displayTime(currentTime)
        }
    }, 1000);
}

function addTime(time) {
    currentTime += time
    setClock(currentTime)
    if(isClockRunning){countdown(currentTime)}
}

function subtractTime(time) {
    currentTime = currentTime < time? 0: currentTime -= time
    setClock(currentTime)
    if(!isClockRunning){setClock(currentTime)}
}

// score //

function changeName(target, value){
    value = value.length > 10 ? value.slice(0,10) : value // char limit
    if(target === 'home-input'){
        document.querySelector(".home--container > h3").textContent = value === "" ? "HOME" : value.toUpperCase()
    }
    if(target === 'guest-input'){
        document.querySelector(".guest--container > h3").textContent = value === "" ? "GUEST" : value.toUpperCase()
    }
}

function showScore(){
    formatDisplay(false)
    homeScore.textContent = homeTotal
    guestScore.textContent = guestTotal
}

function updateHomeScore(inc) {
    homeTotal = homeTotal + parseInt(inc) < 0 ? 0 : homeTotal += parseInt(inc)
    homeScore.textContent = homeTotal
    showScore()
}

function updateGuestScore(inc) {
    guestTotal = guestTotal + parseInt(inc) < 0 ? 0 : guestTotal += parseInt(inc)
    guestScore.textContent = guestTotal
    showScore()
}

function showLeader() {
    document.body.classList.remove('home', 'guest', 'tie')
    document.body.classList.add(homeTotal > guestTotal?'home'
        : homeTotal < guestTotal? 'guest'
        : 'tie')
}

// text //

function displayText(text) {
    formatDisplay(true)
    const homeText = text.slice(0,3)
    const guestText = text.slice(3,6)
    homeScore.innerHTML = homeText
    guestScore.innerHTML = guestText
}

function scrollText() {
    let newArr = textInput.split('')
    const firstItem = newArr.shift()
    newArr.push(firstItem)
    textInput = newArr.join('')
}

function showText(){
    if(textInput.length > 0 && textInput.length<7){
        displayText(textInput)
    } else if (textInput.length>6) {
        scrollTimer = setInterval(()=> {
            displayText(textInput)
            scrollText()
            },speed)
    }
}

function formatDisplay(isTextDisplayed){ // for clarity of scrolling text: scoreboard aligns left for text; centrally when score showing
    isTextDisplayed?scores.classList.add("text"):scores.classList.remove("text")  
}

// initialise app //

showScore();
setClock(currentTime);

// event listeners //

[...document.querySelectorAll(".home--button")].forEach(button => button.addEventListener('click', e => {
    updateHomeScore(e.target.id)
    showLeader()
}));

[...document.querySelectorAll(".guest--button")].forEach(button => button.addEventListener('click', e => {
    updateGuestScore(e.target.id)
    showLeader()
}))

document.querySelector("#show-score").addEventListener('click',() =>{
    clearTimeout(scrollTimer)
    showScore()
})
document.querySelector("#show-text").addEventListener('click',() => {
    clearTimeout(scrollTimer)
    showText()
});

[...document.querySelectorAll('.speed-radio')].forEach(button => button.addEventListener('click', e => {
    speed = parseInt(e.target.id)
    clearTimeout(scrollTimer)
    showText()
}))

document.querySelector("#user-text").addEventListener('change', e => {
    clearTimeout(scrollTimer)
    textInput = e.target.value.length > 6 ? e.target.value + textEnd : e.target.value
})

document.querySelector("#start-clock").addEventListener("click", () => {
    clearInterval(cdInterval)
    isClockRunning = true
    countdown()
})

document.querySelector("#pause-clock").addEventListener("click", () => {
    isClockRunning = false
    setClock(currentTime)
});

[...document.querySelectorAll('.add-time')].forEach(button => button.addEventListener('click', e => {
    addTime(parseInt(e.target.id))
}));

[...document.querySelectorAll('.sub-time')].forEach(button => button.addEventListener('click', e => {
    subtractTime(parseInt(e.target.id))
}))

document.querySelector("#home-input").addEventListener('change', e => changeName(e.target.id, e.target.value))
document.querySelector("#guest-input").addEventListener('change', e => changeName(e.target.id, e.target.value))








