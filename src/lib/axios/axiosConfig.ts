import { default as baseAxios } from "axios";
// export const baseURL = "http://local.safe.egolounge.com:80/";
export const baseURL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3000"
    : process.env?.HEROKU_PR_NUMBER
    ? `https://${process.env.HEROKU_APP_NAME}.herokuapp.com`
    : process.env.HEROKU_APP_NAME;

export const axiosInstance = baseAxios.create({
  baseURL
});
