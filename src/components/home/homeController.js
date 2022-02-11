import axios from "../../shared/plugins/axios";
export const getProducts = async () => {
  let data = await axios({
    method: "GET",
    url: "/product/",
  });
  return data.data;
};
