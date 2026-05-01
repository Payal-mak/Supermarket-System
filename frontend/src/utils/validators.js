/**
 * Reusable form validation utilities for the Supermarket System.
 * Each validator returns an error string or empty string if valid.
 */

export const required = (value, fieldName = 'This field') => {
  if (!value || (typeof value === 'string' && !value.trim())) {
    return `${fieldName} is required`;
  }
  return '';
};

export const minLength = (value, min, fieldName = 'This field') => {
  if (value && value.trim().length < min) {
    return `${fieldName} must be at least ${min} characters`;
  }
  return '';
};

export const maxLength = (value, max, fieldName = 'This field') => {
  if (value && value.trim().length > max) {
    return `${fieldName} must be at most ${max} characters`;
  }
  return '';
};

export const phone = (value) => {
  if (!value) return '';
  const cleaned = value.replace(/\s|-/g, '');
  if (!/^[6-9]\d{9}$/.test(cleaned)) {
    return 'Enter a valid 10-digit Indian phone number';
  }
  return '';
};

export const email = (value) => {
  if (!value) return '';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
    return 'Enter a valid email address';
  }
  return '';
};

export const pincode = (value) => {
  if (!value) return '';
  if (!/^\d{6}$/.test(value.trim())) {
    return 'Enter a valid 6-digit pincode';
  }
  return '';
};

export const positiveNumber = (value, fieldName = 'This field') => {
  const num = parseFloat(value);
  if (isNaN(num) || num <= 0) {
    return `${fieldName} must be a positive number`;
  }
  return '';
};

export const cardNumber = (value) => {
  if (!value) return '';
  const cleaned = value.replace(/\s|-/g, '');
  if (!/^\d{13,19}$/.test(cleaned)) {
    return 'Enter a valid card number (13-19 digits)';
  }
  // Luhn check
  let sum = 0;
  let isEven = false;
  for (let i = cleaned.length - 1; i >= 0; i--) {
    let digit = parseInt(cleaned[i], 10);
    if (isEven) {
      digit *= 2;
      if (digit > 9) digit -= 9;
    }
    sum += digit;
    isEven = !isEven;
  }
  if (sum % 10 !== 0) {
    return 'Invalid card number';
  }
  return '';
};

export const cardExpiry = (value) => {
  if (!value) return '';
  const match = value.match(/^(0[1-9]|1[0-2])\/(\d{2})$/);
  if (!match) {
    return 'Enter expiry as MM/YY';
  }
  const month = parseInt(match[1], 10);
  const year = parseInt('20' + match[2], 10);
  const now = new Date();
  const expDate = new Date(year, month, 0); // last day of that month
  if (expDate < now) {
    return 'Card has expired';
  }
  return '';
};

export const cvv = (value) => {
  if (!value) return '';
  if (!/^\d{3,4}$/.test(value.trim())) {
    return 'CVV must be 3 or 4 digits';
  }
  return '';
};

export const upiId = (value) => {
  if (!value) return '';
  if (!/^[\w.\-]+@[\w]+$/.test(value.trim())) {
    return 'Enter a valid UPI ID (e.g. name@upi)';
  }
  return '';
};

/**
 * Validate an entire form object against a rules map.
 * @param {Object} formData - { fieldName: value }
 * @param {Object} rules    - { fieldName: [validatorFn, ...] }
 * @returns {{ errors: Object, isValid: boolean }}
 *
 * Example:
 *   const { errors, isValid } = validateForm(
 *     { name: '', phone: '123' },
 *     {
 *       name:  [(v) => required(v, 'Name')],
 *       phone: [(v) => required(v, 'Phone'), phone],
 *     }
 *   );
 */
export const validateForm = (formData, rules) => {
  const errors = {};
  let isValid = true;

  for (const field in rules) {
    const value = formData[field];
    for (const validator of rules[field]) {
      const error = validator(value);
      if (error) {
        errors[field] = error;
        isValid = false;
        break; // show first error only per field
      }
    }
  }

  return { errors, isValid };
};

/**
 * Format card number with spaces every 4 digits.
 */
export const formatCardNumber = (value) => {
  const cleaned = value.replace(/\D/g, '').slice(0, 19);
  return cleaned.replace(/(.{4})/g, '$1 ').trim();
};

/**
 * Format expiry as MM/YY.
 */
export const formatExpiry = (value) => {
  const cleaned = value.replace(/\D/g, '').slice(0, 4);
  if (cleaned.length >= 3) {
    return cleaned.slice(0, 2) + '/' + cleaned.slice(2);
  }
  return cleaned;
};
