import axios from "axios";

const EVENTS_API_URL = "https://api.the-odds-api.com/v4";

const eventsApiInstance = axios.create({
  baseURL: EVENTS_API_URL,
});

eventsApiInstance.interceptors.request.use((req) => {
  console.log(req);
  req.params = {
    apiKey: "71169167a20b114cb351e5d73867d2fd",
    regions: "eu",
    markets: "h2h"
  }
  return req;
});

export const eventsApi = {
  getEvents() {
    return eventsApiInstance.get("/sports/soccer_germany_bundesliga/odds/");
  },
};
