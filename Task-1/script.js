const daysEl = document.getElementById("days");
const hoursEl = document.getElementById("hours");
const minutesEl = document.getElementById("minutes");
const secondsEl = document.getElementById("seconds");
const messageEl = document.getElementById("message");
const eventInput = document.getElementById("event-time");


let eventDate = new Date("2025-11-08T10:00:00"); 


function updateCountdown() {
  const now = new Date();
  const diff = eventDate - now;

  if (diff <= 0) {
    // Event started
    clearInterval(countdownInterval);
    daysEl.innerText = "00";
    hoursEl.innerText = "00";
    minutesEl.innerText = "00";
    secondsEl.innerText = "00";
    messageEl.innerHTML = "🎉 It's Time! Let's Rise Beyond 🚀";
    return;
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  
  daysEl.innerText = String(days).padStart(2, "0");
  hoursEl.innerText = String(hours).padStart(2, "0");
  minutesEl.innerText = String(minutes).padStart(2, "0");
  secondsEl.innerText = String(seconds).padStart(2, "0");
}


let countdownInterval = setInterval(updateCountdown, 1000);
updateCountdown(); 


function setNewEvent() {
  const inputVal = eventInput.value;

  if (!inputVal) {
    alert("Please select a valid date and time!");
    return;
  }

  const newDate = new Date(inputVal);
  if (newDate <= new Date()) {
    alert("Please choose a future date!");
    return;
  }

  eventDate = newDate;
  clearInterval(countdownInterval);
  countdownInterval = setInterval(updateCountdown, 1000);
  messageEl.innerHTML = ""; 
}


window.setNewEvent = setNewEvent;
