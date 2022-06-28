import * as axios from "axios";

export default class EventAPI {
  constructor() {
    this.api_token = null;
    this.client = null;
    this.api_url = `http://127.0.0.1:8081/v1`;
  }

  init = () => {

    let headers = {
      Accept: "application/json",
    };

    this.client = axios.create({
      baseURL: this.api_url,
      timeout: 31000,
      headers: headers,
    });

    return this.client;
  };

  getEventList = () => {
    return this.init().get("/events");
  };

  getEventList = (params) => {
    return this.init().get("/events", { params: params });
  };

  getEventDetails = (eventID) => {
    return this.init().get("/events/" + eventID);
  };
  
  // Add additional API call here as needed ...
}