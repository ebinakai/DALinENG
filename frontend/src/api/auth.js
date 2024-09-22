import axios from "axios"
import { baseUrl, request_config } from "../config"

export default {
  login: authInfo => {
    request_config.method = "post";
    request_config.data = authInfo;
    request_config.url = baseUrl + "/login";

    return axios.request(request_config)
      .then( res => res )
      .catch( err => { throw err } );
  },
  logout: () => {
    request_config.method = "delete";
    request_config.url = baseUrl + "/logout";

    return axios.request(request_config)
      .then( res => res )
      .catch( err => { throw err } );
  },
  createUser: userInfo => {
    request_config.method = "post";
    request_config.data = userInfo;
    request_config.url = baseUrl + "/createuser";

    return axios.request(request_config)
      .then( res => res )
      .catch( err => { throw err } );
  },
  checkToken: token => {
    request_config.method = "post";
    request_config.data = token;
    request_config.url = baseUrl + "/verify";

    return axios.request(request_config)
      .then( res => res )
      .catch( err => { throw err } );
  }
}