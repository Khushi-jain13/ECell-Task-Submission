// Firebase config and setup
const firebaseConfig = {
    authDomain: "event-timer-app-d8a84.firebaseapp.com",
    projectId: "event-timer-app-d8a84",
    storageBucket: "event-timer-app-d8a84.firebasestorage.app",
    messagingSenderId: "550282956655",
    appId: "1:550282956655:web:54bcc3958738072970e29a"
  };
  
  firebase.initializeApp(firebaseConfig);
  const db = firebase.database();
  
  const countdownEl = document.getElementById("countdown");
  const statusEl = document.getElementById("status");
  
  // Fetch event time from Firebase
  let eventTime;
  db.ref("eventTime").on("value", (snapshot) => {
    eventTime = new Date(snapshot.val());
    startCountdown();
  });
  
  function setEventTime() {
    const input = document.getElementById("eventTimeInput").value;
    if (!input) {
      alert("Please select a date and time!");
      return;
    }
    db.ref("eventTime").set(input);
  }
  
  // Countdown logic
  function startCountdown() {
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const timeLeft = eventTime - now;
  
      if (timeLeft <= 0) {
        clearInterval(interval);
        countdownEl.textContent = "🎉 Event has started!";
        statusEl.textContent = "";
        return;
      }
  
      const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
      const hours = Math.floor((timeLeft / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((timeLeft / (1000 * 60)) % 60);
      const seconds = Math.floor((timeLeft / 1000) % 60);
  
      countdownEl.textContent = `${days}d ${hours}h ${minutes}m ${seconds}s`;
      statusEl.textContent = "Countdown is live!";
    }, 1000);
  }
  