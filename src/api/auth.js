import axios from "axios"

const baseUrl = "http://raspi.lan:3001"

const config = {
  method: null,
  url: null,
  headers: {},
  data: null
}

export default {
  login: authInfo => {
    config.method = "post";
    config.data = authInfo;
    config.url = baseUrl + "/login";

    return axios.request(config)
      .then( res => res )
      .catch( err => { throw err } );
  },
  logout: () => {
    config.method = "delete";
    config.url = baseUrl + "/logout";

    return axios.request(config)
      .then( res => res )
      .catch( err => { throw err } );
  },
  createUser: userInfo => {
    config.method = "post";
    config.data = userInfo;
    config.url = baseUrl + "/createuser";

    return axios.request(config)
      .then( res => res )
      .catch( err => { throw err } );
  },
  checkToken: token => {
    config.method = "post";
    config.data = token;
    config.url = baseUrl + "/verify";

    return axios.request(config)
      .then( res => res )
      .catch( err => { throw err } );
  }
}