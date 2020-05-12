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

export const composeValidators = (...validators) => value => {
  return [...validators].reduce((acc, curr) => acc || curr(value), undefined);
}