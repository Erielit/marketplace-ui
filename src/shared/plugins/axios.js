import * as instance from "axios";
const axios = instance.create({
  baseURL: "http://localhost:8080/api",
});

const requestHandler = (request) => {
  request.headers["Accept"] = "application/json";
  request.headers["Content-Type"] = "application/json";
  const session = JSON.parse(localStorage.getItem("user")) || null;
  if (session) {
    request.headers[
      "Authorization"
    ] = `${session.token_type} ${session.access_token}`;
  }

  return request;
};

const errorResponseHandler = (error) => {
  return Promise.reject({ ...error });
};

const successResponseHandler = (response) => {
  return response.data;
};

axios.interceptors.request.use((request) => requestHandler(request));

axios.interceptors.response.use(
  (response) => successResponseHandler(response),
  (error) => errorResponseHandler(error)
);

export default axios;
