import validator from 'validator';

export const required = value => {
  if (!value) {
    return 'This field is required';
  }
}

export const minLength = len => value => {
  if (value.length < len) {
    return `Ensure this field has at least ${len} characters.`;
  }
}

export const maxLength = len => value => {
  if (value.length > len) {
    return `Ensure this field has no more than ${len} characters.`;
  }
}

export const isEmail = value => {
  if (!validator.isEmail(value || '')) {
    return 'Provide correct email';
  }
}

export const matchPassword = password => value => {
  if (value !== password) {
    return 'Password must match';
  }
}

export const composeValidators = (...validators) => value => {
  return [...validators].reduce((acc, curr) => acc || curr(value), undefined);
}

export const usernameValidator = composeValidators(
  required, 
  minLength(3), 
  maxLength(150));

export const emailValidator = composeValidators(
  required, 
  isEmail);

export const passwordValidator = composeValidators(
  required, 
  minLength(8), 
  maxLength(128));

export const password2Validator = (password) => {
  return composeValidators(
    required, 
    matchPassword(password));
};