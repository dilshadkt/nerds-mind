import axios from "axios";

export const customeAxios = axios.create({
  // baseURL: "https://easystockapi.scanntek.com/api",
  baseURL: "https://fluxion-cdfpcve0h5hdakc7.eastus-01.azurewebsites.net/api",
  headers: {
    "Content-Type": "application/json",
    Cookie:
      "ARRAffinity=c015407f2340ab83319171108305fa1072c8452284bc5ef903dfd906b4fd7902; ARRAffinitySameSite=c015407f2340ab83319171108305fa1072c8452284bc5ef903dfd906b4fd7902",
  },
});
