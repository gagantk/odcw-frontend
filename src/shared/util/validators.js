const VALIDATOR_TYPE_REQUIRE = 'REQUIRE';
const VALIDATOR_TYPE_MINLENGTH = 'MINLENGTH';
const VALIDATOR_TYPE_MAXLENGTH = 'MAXLENGTH';
const VALIDATOR_TYPE_MIN = 'MIN';
const VALIDATOR_TYPE_MAX = 'MAX';
const VALIDATOR_TYPE_EMAIL = 'EMAIL';
const VALIDATOR_TYPE_FILE = 'FILE';
const VALIDATOR_TYPE_POSITIVENUMBER = 'NUMBER';
const VALIDATOR_TYPE_USERTYPE = 'USERTYPE';
const VALIDATOR_TYPE_PAYMENTMODE = 'PAYMENTMODE';

export const VALIDATOR_REQUIRE = () => ({ type: VALIDATOR_TYPE_REQUIRE });
export const VALIDATOR_FILE = () => ({ type: VALIDATOR_TYPE_FILE });
export const VALIDATOR_MINLENGTH = (val) => ({
  type: VALIDATOR_TYPE_MINLENGTH,
  val: val,
});
export const VALIDATOR_MAXLENGTH = (val) => ({
  type: VALIDATOR_TYPE_MAXLENGTH,
  val: val,
});
export const VALIDATOR_MIN = (val) => ({ type: VALIDATOR_TYPE_MIN, val: val });
export const VALIDATOR_MAX = (val) => ({ type: VALIDATOR_TYPE_MAX, val: val });
export const VALIDATOR_EMAIL = () => ({ type: VALIDATOR_TYPE_EMAIL });
export const VALIDATOR_POSITIVENUMBER = () => ({
  type: VALIDATOR_TYPE_POSITIVENUMBER,
});
export const VALIDATOR_USERTYPE = () => ({ type: VALIDATOR_TYPE_USERTYPE });
export const VALIDATOR_PAYMENTMODE = () => ({
  type: VALIDATOR_TYPE_PAYMENTMODE,
});

export const validate = (value, validators) => {
  let isValid = true;
  for (const validator of validators) {
    if (validator.type === VALIDATOR_TYPE_REQUIRE) {
      isValid = isValid && value.trim().length > 0;
    }
    if (validator.type === VALIDATOR_TYPE_MINLENGTH) {
      isValid = isValid && value.trim().length >= validator.val;
    }
    if (validator.type === VALIDATOR_TYPE_MAXLENGTH) {
      isValid = isValid && value.trim().length <= validator.val;
    }
    if (validator.type === VALIDATOR_TYPE_MIN) {
      isValid = isValid && +value >= validator.val;
    }
    if (validator.type === VALIDATOR_TYPE_MAX) {
      isValid = isValid && +value <= validator.val;
    }
    if (validator.type === VALIDATOR_TYPE_EMAIL) {
      isValid = isValid && /^\S+@\S+\.\S+$/.test(value);
    }
    if (validator.type === VALIDATOR_TYPE_POSITIVENUMBER) {
      isValid = isValid && value > 0;
    }
    if (validator.type === VALIDATOR_TYPE_USERTYPE) {
      isValid =
        isValid &&
        (value.toLowerCase() === 'customer' ||
          value.toLowerCase() === 'washer');
    }
    if (validator.type === VALIDATOR_TYPE_PAYMENTMODE) {
      isValid =
        isValid &&
        (value.toLowerCase() === 'pay online' ||
          value.toLowerCase() === 'pay on delivery');
    }
  }
  return isValid;
};
