// src/utils/validators.js

// Validate email
export function isValidEmail(email) {
  const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return pattern.test(email);
}

// Validate phone (simple Nigerian format)
export function isValidPhone(value) {
  const pattern = /^[0-9+\-()\s]{6,20}$/;
  return pattern.test(value);
}

// Validate required text
export function isRequired(value) {
  return value !== undefined && value !== null && value.toString().trim() !== '';
}

// Validate price
export function isValidPrice(value) {
  return !isNaN(value) && Number(value) > 0;
}

// Validate stock quantity
export function isValidStock(value) {
  return Number.isInteger(Number(value)) && Number(value) >= 0;
}

// Validate image file
export function isValidImage(file) {
  if (!file) return false;
  const allowed = ['image/jpeg', 'image/png', 'image/webp'];
  return allowed.includes(file.type);
}
