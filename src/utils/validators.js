export const isValidEmail = (email) => {
  if (!email) return false;
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(String(email).toLowerCase());
};

export const isValidPassword = (password) => {
  // At least 8 characters, one uppercase, one lowercase, one number, and one special character
  const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;
  return password && re.test(password);
};

export const isValidPhone = (phone) => {
  if (!phone) return true; // Optional
  // Sri Lankan phone number regex:
  // Starts with 0, 94, or +94 followed by 7 and 8 more digits.
  const re = /^(?:0|94|\+94)?7[0-9]{8}$/;
  return re.test(String(phone).replace(/\s/g, '')); // Remove spaces before testing
};

export const isPositiveNumber = (val) => {
  if (val === null || val === undefined || val === '') return false;
  const num = Number(val);
  return !isNaN(num) && num >= 0;
};

export const isValidAge = (val) => {
  if (val === null || val === undefined || val === '') return true; // Optional
  const num = Number(val);
  return !isNaN(num) && num >= 0 && num < 40; // Reasonable pet age
};
export const isValidPastDateString = (dateStr) => {
  if (!dateStr) return true; // Optional field
  const re = /^\d{4}-\d{2}-\d{2}$/;
  if (!re.test(dateStr)) return false;
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return false;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return d < today;
};
