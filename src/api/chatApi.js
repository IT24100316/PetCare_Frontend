import axiosInstance from './axiosInstance';

export const sendMessage = async (bookingId, receiver, text) => {
  const response = await axiosInstance.post('/chats', { bookingId, receiver, text });
  return response.data;
};

export const getMessages = async (bookingId) => {
  const response = await axiosInstance.get(`/chats/${bookingId}`);
  return response.data;
};

export const getInbox = async () => {
  const response = await axiosInstance.get('/chats/inbox');
  return response.data;
};

export const markAsRead = async (bookingId) => {
  const response = await axiosInstance.put(`/chats/${bookingId}/read`);
  return response.data;
};
