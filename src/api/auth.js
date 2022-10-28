import axios from "axios"

const headers = {}
headers["Content-type"] = "application/json"

const config = {
  method: null,
  url: "http://192.168.68.82:3002",
  headers,
  data: null
}

export default {
  login: authInfo => {
    config.method = "post"
    config.data = authInfo

    return axios.request(config)
      .then( res => res )
      .catch( error => { throw error } )
  },
  logout: () => {
    config.method = "delete"
    return axios.request(config)
      .then( res => res )
      .catch( error => { throw error } )
  }
}