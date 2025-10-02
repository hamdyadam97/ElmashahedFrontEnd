// src/services/productService.js
import api from "../../api/Api"; // بدلاً من axios


export const createClient = async (formData) => {
  const res = await api.post("user/clients/create/", formData);
   
  return res.data;
};

export const fetchClients = async (filters = {}) => {
 
  const res = await api.get('user/clients/', { params: filters });
 
  return res.data;
};


export const reportDetail = async (params = {}) => {
  const res = await api.get("/user/report/", { params });
  return res.data;
};




// export const fetchProductDetail = async ({slug:slug}) => {
//   const res = await api.get(`product/detail/${slug}`,);
//   return res.data;
// };
