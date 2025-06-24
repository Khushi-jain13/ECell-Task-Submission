const dayFilter = document.getElementById("dayFilter");
const categoryFilter = document.getElementById("categoryFilter");
const eventItems = document.querySelectorAll(".event-item");
const modal = document.getElementById("eventModal");
const modalTitle = document.getElementById("modalTitle");
const modalDescription = document.getElementById("modalDescription");
const closeBtn = document.querySelector(".close-btn");


function filterEvents() {
  const day = dayFilter.value;
  const category = categoryFilter.value;

  eventItems.forEach(item => {
    const show = (day === "all" || item.classList.contains(day)) &&
                 (category === "all" || item.classList.contains(category));
    item.style.display = show ? "block" : "none";
  });
}


dayFilter.addEventListener("change", filterEvents);
categoryFilter.addEventListener("change", filterEvents);


eventItems.forEach(item => {
  item.addEventListener("click", () => {
    modalTitle.textContent = item.dataset.title;
    modalDescription.textContent = item.dataset.description;
    modal.style.display = "flex";
  });
});


function closeModal(e) {
  if (e.target === modal || e.target === closeBtn) {
    modal.style.display = "none";
  }
}

closeBtn.addEventListener("click", closeModal);
window.addEventListener("click", closeModal);
