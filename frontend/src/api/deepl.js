import axios from "axios"
import { baseUrl, request_config } from "../config"


export default {
  translate: async (data) => {
    request_config.method = "post";
    request_config.data = data;
    request_config.url = baseUrl + "/translate";

    return await axios.request(request_config)
  }
}