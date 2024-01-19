const cal = document.getElementById('calendar2')

let calendar = new FullCalendar.Calendar(cal, {
    initialView: 'dayGridMonth',
    selectable: true,
    headerToolbar: {
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,listWeek'
    },
    events: [],
    eventClick: function(info) {
        const eventInfo = info.event._def.title
        const clickedEvent = eventInfo.split(' live at ')
        const eventBand = clickedEvent[0]
        const eventVenue = clickedEvent[1]

        fetch(`/api/gigs/search`, {
            method: 'POST',
            body: JSON.stringify({ eventBand, eventVenue }),
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then(response => response.json())
        .then(response => {
            document.location.replace(`/eventprofile/${response}`)
        })
    }
})

calendar.render()

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
}

getCalendarData()
