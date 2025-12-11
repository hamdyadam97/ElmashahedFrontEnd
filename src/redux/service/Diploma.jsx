
import api from "../../api/Api"; 

export const fetchDiplomas = async (type) => {
  const res = await api.get(`user/diplomas/?type=${type}`);
  console.log(res,'ssssssssssssssssssssssssssssssssssssssssssssss')
  return res.data.data;
};
// services/productService.js





export const fetchProductDetail = async ({slug:slug}) => {
  const res = await api.get(`product/detail/${slug}`,);
  return res.data;
};
