const cal = document.getElementById('calendar')

let calendar = new FullCalendar.Calendar(cal, {
  initialView: 'dayGridMonth',
  headerToolbar: {
    left: 'prev,next today',
    center: 'title',
    right: 'dayGridMonth,timeGridWeek,listWeek'
  }
})

calendar.render()

const getCalendarData = () => {
  const genre = document.getElementById('genre')

  if (genre) {
    fetch(`/api/gigs/search/band`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
    .then(response => response.json())
    .then(response => {
      console.log(response)
        let startDate
        for (i = 0; i < response.length; i++) {
          if (response[i].band)
            startDate = response[i].venue.date.split('T')
            calendarEvent = {
                title: `${response[i].venue.name}`,
                start: startDate[0]
            }
            calendar.addEvent(calendarEvent)
        }
    })
  } else {
    if (genre) {
      fetch(`/api/gigs/search/venue`, {
          method: 'GET',
          headers: {
              'Content-Type': 'application/json',
          },
      })
      .then(response => response.json())
      .then(response => {
        console.log(response)
          let startDate
          for (i = 0; i < response.length; i++) {
            if (response[i].band)
              startDate = response[i].venue.date.split('T')
              calendarEvent = {
                  title: `${response[i].venue.name}`,
                  start: startDate[0]
              }
              calendar.addEvent(calendarEvent)
          }
      })
    }
  }
}

getCalendarData()

function addEvent () {
  
}

document
  .querySelector('#add-event')
  .addEventListener('click', addEvent);
