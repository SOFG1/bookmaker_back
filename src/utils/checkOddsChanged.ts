import { eventsApi } from "../api/events";
import { EventOddType, TicketEvent } from "../types";

//Check for single event
async function fetchEvent(
  eventId: string,
  place: EventOddType,
  odd: number
) {
  const event = await eventsApi.getEventOdds(eventId);
  let outcome = "Draw";
  if (place === "win1") outcome = event.data.home_team;
  if (place === "win2") outcome = event.data.away_team;
  const newOdd = event.data.bookmakers[0].markets[0].outcomes.find(
    (o: any) => o.name === outcome
  )?.price;
  return {
    event: event.data,
    changed: newOdd !== odd
  }
}

export async function fetchEvents(events: TicketEvent[]) {
  let fetchedEvents = []
  let oddsChanged = false
  for (let i = 0; i < events.length; i++) {
    const event = events[i];
    const fetched = await fetchEvent(event.eventId, event.place, event.odd);
    if(fetched.changed) oddsChanged = true
    const formated = {
      changed: fetched.changed,
      event: {
        ...event,
        title: `${fetched.event.home_team} - ${fetched.event.away_team}`,
        date: new Date(fetched.event.commence_time)
      }
    }
    fetchedEvents.push(formated)
  }
  return {fetchedEvents, oddsChanged}
}
