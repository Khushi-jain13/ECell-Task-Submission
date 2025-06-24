// e cell pjt 1 appjs

const userForm = document.getElementById("userForm");
const cardContainer = document.getElementById("cardContainer");
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');
const navItems = navLinks.querySelectorAll('a');
const body = document.body;
const users = [];

userForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const title = document.getElementById("title").value;
  const bio = document.getElementById("bio").value;

  const newUser = { name, title, bio };
  users.push(newUser);

  renderCards();
  userForm.reset();

  Swal.fire({
    icon: 'success',
    title: 'User Added!',
    text: `${name} has been added to the team.`,
    showConfirmButton: false,
    timer: 1500
  });
});

function renderCards() {
  cardContainer.innerHTML = "";

  users.forEach((user, index) => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.style.animationDelay = `${index * 0.2}s`;

    card.innerHTML = `
      <h2>${user.name}</h2>
      <h4>${user.title}</h4>
      <p>${user.bio}</p>
    `;

    cardContainer.appendChild(card);
  });
}

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('show');
  body.classList.toggle('blur-active');
});

navItems.forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('show');
    body.classList.remove('blur-active');
  });
});
