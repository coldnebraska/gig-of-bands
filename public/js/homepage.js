const cal = document.getElementById('calendar2')

let calendar = new FullCalendar.Calendar(cal, {
    initialView: 'dayGridMonth',
    selectable: true,
    headerToolbar: {
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,listWeek'
    },
    events: []
})

calendar.render()

const viewPage = (event) => {
    event.preventDefault()
    console.log('clicked')

    // document.location.replace(`/api/${id}`)
}

const getCalendarData = () => {
    fetch(`/api/gigs`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
    .then(response => response.json())
    .then(response => {
        let startDate
        for (i = 0; i < response.length; i++) {
            startDate = response[i].venue.date.split('T')
            calendarEvent = {
                title: `${response[i].band.name} live at ${response[i].venue.name}`,
                start: startDate[0]
            }
            calendar.addEvent(calendarEvent)
        }
    })
    .then(() => {
        [...document.querySelectorAll('.fc-event-title')]
            .forEach(day => day
            .addEventListener('click', viewPage))
    })
}

getCalendarData()
