import axiosInstance from './axiosInstance';

export const sendMessage = async (bookingId, receiver, text) => {
  const response = await axiosInstance.post('/chats', { bookingId, receiver, text });
  return response.data;
};

export const getMessages = async (bookingId) => {
  const response = await axiosInstance.get(`/chats/${bookingId}`);
  return response.data;
};
