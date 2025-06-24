let countdownInterval;

document.getElementById("startBtn").addEventListener("click", () => {

    const input = document.getElementById("eventTime").value;
    const eventDate = new Date(input);

    localStorage.setItem("eventTime", eventDate.toISOString());
    startCountdown(eventDate);
}); 

function startCountdown(eventDate) 
{
    document.getElementById("startBtn").innerHTML = "Reshedule Event";
    document.getElementById("removeTime").style.display = "inline-block";
    clearInterval(countdownInterval);
    countdownInterval = setInterval(() => {
        const now = new Date();
        const diff = new Date(eventDate) - now;

        if (diff <= 0) {
        clearInterval(countdownInterval);
        document.getElementById("timer").innerText = "Event Started!";
        return;
        }

        const hours = Math.floor(diff / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);

        document.getElementById("timer").innerText =
        `${hours.toString().padStart(2, '0')}:` +
        `${minutes.toString().padStart(2, '0')}:` +
        `${seconds.toString().padStart(2, '0')}`;
    }, 1000);
}

window.onload = () => {
    const savedTime = localStorage.getItem("eventTime");
    if (savedTime) {
        const eventDate = new Date(savedTime);
        startCountdown(eventDate);
    }
};

document.getElementById("removeTime").addEventListener("click", () => {
    localStorage.removeItem("eventTime");
    clearInterval(countdownInterval);
    document.getElementById("timer").innerText = "Waiting for event time...";
    document.getElementById("removeTime").style.display = "none";
    document.getElementById("startBtn").innerHTML = "Start Event";
});