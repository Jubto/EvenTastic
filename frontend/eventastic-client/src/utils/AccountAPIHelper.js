import * as axios from "axios";

export default class AccountAPI {
  constructor() {
    this.api_token = null;
    this.client = null;
    this.api_url = 'http://127.0.0.1:8080/v1';
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

  addAccount = (data) => {
    return this.init().post("/accounts", data);
  };

  getAccounts = (params) => {
    return this.init().get("/accounts", { params: params })
  };

  getAccount = (id) => {
    return this.init().get(`/accounts/${id}`)
  };

  putAccount = (id, body) => {
    return this.init().put(`/accounts/${id}`, body)
  };

  getHost = (id) => {
    return this.init().get(`/accounts/${id}/host_details`)
  };

  putHost = (id, body) => {
    return this.init().put(`/accounts/${id}/host_details`, body)
  };

  // NOTE: getHostRequests and putHostRequests and duplates of getHost and updateHost, but 
  // wasn't sure which to keep, since I thought PUT /accounts/{account_id}/host_details 
  //should only accept body not param
  getHostRequests = (account_id) => {
    return this.init().get("/accounts/" + account_id + "/host_details");
  };

  putHostRequests = (account_id, params) => {
    return this.init().put("/accounts/" + account_id + "/host_details", { params: params });
  }; 

}