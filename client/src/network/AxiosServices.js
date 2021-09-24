import axios from "axios";
import config from "../config";

const authToken = localStorage.getItem("authToken");

function getIRequestProp() {
  let serverUrl = config.BASE_URL;
  return {
    serverUrl: serverUrl,
    requestHeader: {
      "Content-Type": "application/json, multipart/form-data",
      Authorization: `JWT ${authToken}`,
    },
  };
}

async function get(url, parameter) {
  let { serverUrl, requestHeader } = getIRequestProp();
  return axios.get(serverUrl + url, {
    params: parameter,
    headers: requestHeader,
  });
}

async function post(url, body) {
  let { serverUrl, requestHeader } = getIRequestProp();
  return await axios.post(serverUrl + url, body, {
    headers: requestHeader,
  });
}

export const AxiosServices = {
  get,
  post,
};
