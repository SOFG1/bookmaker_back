import axios from "axios";

const EVENTS_API_URL = "https://api.the-odds-api.com/v4";

const eventsApiInstance = axios.create({
  baseURL: EVENTS_API_URL,
});

eventsApiInstance.interceptors.request.use((req) => {
  req.params = {
    apiKey: process.env.ODDS_API_KEY,
    regions: "eu",
    markets: "h2h",
    bookmakers: "pinnacle",
  };
  return req;
});

export const eventsApi = {
  getEvents() {
    return eventsApiInstance.get("/sports/soccer_germany_bundesliga/odds/");
  },
  getEventOdds(eventId: string) {
    return eventsApiInstance.get(
      `/sports/soccer_germany_bundesliga/events/${eventId}/odds/`
    );
  },
};
