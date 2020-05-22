import validator from 'validator';

export const required = (value) => {
  if (!value) return 'This field is required';
  return undefined;
};

export const minLength = (len) => (value) => {
  if (value.length < len)
    return `Ensure this field has at least ${len} characters.`;
  return undefined;
};

export const maxLength = (len) => (value) => {
  if (value.length > len)
    return `Ensure this field has no more than ${len} characters.`;
  return undefined;
};

export const isEmail = (value) => {
  if (!validator.isEmail(value || '')) return 'Provide correct email';
  return undefined;
};

export const matchPassword = (password) => (value) => {
  if (value !== password) return 'Password must match';
  return undefined;
};

export const composeValidators = (...validators) => (value) => {
  return [...validators].reduce((acc, curr) => acc || curr(value), undefined);
};

export const usernameValidator = composeValidators(
  required,
  minLength(3),
  maxLength(150)
);

export const emailValidator = composeValidators(required, isEmail);

export const passwordValidator = composeValidators(
  required,
  minLength(8),
  maxLength(128)
);

export const password2Validator = (password) => {
  return composeValidators(required, matchPassword(password));
};

export const titleValidator = composeValidators(
  required,
  minLength(3),
  maxLength(100)
);

export const subjectValidator = composeValidators(
  required,
  minLength(10),
  maxLength(2000)
);
