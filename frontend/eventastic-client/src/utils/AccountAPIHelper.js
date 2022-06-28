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

  getHostRequests = (account_id) => {
    return this.init().get("/accounts/" + account_id + "/host_details");
  };

  putHostRequests = (account_id, params) => {
    return this.init().put("/accounts/" + account_id + "/host_details", { params: params });
  }; 

}