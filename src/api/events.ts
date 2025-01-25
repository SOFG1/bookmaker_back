import axios from "axios";

const EVENTS_API_URL = "https://api.the-odds-api.com/v4";

const eventsApiInstance = axios.create({
  baseURL: EVENTS_API_URL,
});

eventsApiInstance.interceptors.request.use((req) => {
  req.params = {
    apiKey: process.env.ODDS_API_KEY,
  };
  return req;
});

export const eventsApi = {
  getEvents() {
    return eventsApiInstance.get("/sports/soccer_germany_bundesliga/odds/", {
      params: {
        regions: "eu",
        markets: "h2h",
        bookmakers: "pinnacle",
      },
    });
  },
  getEventOdds(eventId: string) {
    return eventsApiInstance.get(
      `/sports/soccer_germany_bundesliga/events/${eventId}/odds/`,
      {
        params: {
          regions: "eu",
          markets: "h2h",
          bookmakers: "pinnacle",
        },
      }
    );
  },
  getScores(ids: string[]) {
    return eventsApiInstance.get("/sports/soccer_germany_bundesliga/scores/", {
      params: {
        daysFrom: 3,
        eventIds: ids.join(",")
      }
    });
  },
};
