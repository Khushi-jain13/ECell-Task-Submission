
window.scrollTo({ top: 0, behavior: 'smooth' })
;(async () => {
  const res = await fetch('./data/events.json')
  const events = await res.json()

  const eventList = document.getElementById('eventList')
  const dayFilter = document.getElementById('dayFilter')
  const categoryFilter = document.getElementById('categoryFilter')
  const nameFilter = document.getElementById('nameFilter')

  function displayEvents() {
    const day = dayFilter.value
    const category = categoryFilter.value.toLowerCase()
    const name = nameFilter.value.toLowerCase()

    eventList.innerHTML = ''

    const filtered = events.filter((e) => {
      return (
        (!day || e.day === day) &&
        (!category || e.category.toLowerCase() === category) &&
        (!name || e.name.toLowerCase().includes(name))
      )
    })

    filtered.forEach((event) => {
      const div = document.createElement('div')
      div.className = 'event'
      div.innerHTML = `
        <div class="event-card">
          <div class="event-top">
            <div class="tag">${event.category}</div>
            <div class="event-time">10:00 AM</div>
          </div>
          <h3 class="event-title">${event.name}</h3>
          <p class="event-description">${event.description}</p>
        </div>
      `
      div.onclick = () => showPopup(event)
      eventList.appendChild(div)
    })
  }

  function showPopup(event) {
    document.getElementById('popupTitle').textContent = event.name
    document.getElementById('popupDay').textContent = event.day
    document.getElementById('popupCategory').textContent = event.category
    document.getElementById('popupDescription').textContent = event.description
    document.getElementById('popup').style.display = 'flex'
  }

  
  dayFilter.onchange =
  categoryFilter.onchange =
  nameFilter.oninput =
  displayEvents
  displayEvents()
})()

const closePopup = () =>  {
  document.getElementById('popup').style.display = 'none'
}


