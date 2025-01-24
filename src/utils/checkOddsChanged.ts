import { eventsApi } from "../api/events";
import { EventOddType, TicketEvent } from "../types";

//Check for single event
async function checkEventOdds(
  eventId: string,
  place: EventOddType,
  odd: number
) {
  const odds = await eventsApi.getEventOdds("84ff7a4bd70183bf91e83e0490bee705");
  let outcome = "Draw";
  if (place === "win1") outcome = odds.data.home_team;
  if (place === "win2") outcome = odds.data.away_team;
  const newOdd = odds.data.bookmakers[0].markets[0].outcomes.find(
    (o: any) => o.name === outcome
  )?.price;
  if (newOdd !== odd) return odds.data;
}

export async function checkOddChanged(events: TicketEvent[]) {
  let changedOdds = []
  for (let i = 0; i < events.length; i++) {
    const event = events[i];
    const changed = await checkEventOdds(event.eventId, event.place, event.odd);
    if (changed) changedOdds.push(changed)
  }
  return changedOdds
}
