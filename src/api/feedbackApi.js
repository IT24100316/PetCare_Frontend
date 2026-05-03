import axiosInstance from "./axiosInstance";



export const getAllFeedback = async (serviceType) => {
  const url = serviceType
    ? `/feedbacks?serviceType=${serviceType}`
    : "/feedbacks";
  const response = await axiosInstance.get(url);
  return response.data;
};

export const submitFeedback = async (data) => {
  const response = await axiosInstance.post("/feedbacks", data);
  const data = response.data;
  return data;
};

export const deleteFeedback = async (id) => {
  const response = await axiosInstance.delete(`/feedbacks/${id}`);
  const data = response.data;
  return data;
};

export const updateFeedback = async (id, data) => {
  const response = await axiosInstance.put(`/feedbacks/${id}`, data);
  const data = response.data;
  return data;
};
